package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.repositories.RecetaRepository;
import anto.es.intolerables.services.RecetaService;
import anto.es.intolerables.services.SpooncularService;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/recetas")
public class RecetaController {

    private final RecetaService recetaService;
    private final SpooncularService recetaSpooncularService;
    private final RecetaRepository recetaRepository;

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarRecetasPorIntoleranciaYNombre(
            @RequestParam String intolerancia,
            @RequestParam(required = false) String query) {
        List<Map<String, Object>> recetas = recetaSpooncularService.buscarRecetasPorIntolerancia(intolerancia, query);

        return ResponseEntity.ok(Map.of("results", recetas));
    }

    @GetMapping
    @Transactional
    public List<Receta> obtenerTodasLasRecetas() {
        List<Receta> recetas = recetaService.obtenerTodasLasRecetas();
        for (Receta receta : recetas) {
            Hibernate.initialize(receta.getIntolerancias());
            Hibernate.initialize(receta.getIngredientes());
            Hibernate.initialize(receta.getAnalyzedInstructions());
        }

        return recetas;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearReceta(@RequestBody Receta receta, Authentication authentication) {
        if (authentication != null) {
            String username = authentication.getName();
            System.out.println("Usuario autenticado: " + username);
            Receta recetaCreada = recetaService.crearReceta(receta);
            return ResponseEntity.ok(recetaCreada);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No se ha encontrado un usuario autenticado.");
        }
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarRecetaDesdeSpoonacular(@RequestBody Map<String, Object> datosReceta) {
        try {
            Receta receta = recetaService.convertirDesdeSpoonacular(datosReceta);

            Receta recetaGuardada = recetaRepository.findByTitulo(receta.getTitulo())
                    .orElseGet(() -> recetaRepository.save(receta)); // Si no existe, se guarda

            return ResponseEntity.ok(Map.of("id", recetaGuardada.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
