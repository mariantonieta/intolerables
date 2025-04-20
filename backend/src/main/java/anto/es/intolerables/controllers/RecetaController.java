package anto.es.intolerables.controllers;
import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.repositories.IngredienteRepository;
import anto.es.intolerables.security.jwt.JwtTokenProvider;
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
    private final IngredienteRepository ingredienteRepository;
    private final SpooncularService recetaSpooncularService;
    private final JwtTokenProvider tokenProvider;

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarRecetasPorIntoleranciaYNombre(
            @RequestParam String intolerancia,
            @RequestParam(required = false) String query) {
        List<Map<String, Object>> recetas = recetaSpooncularService.buscarRecetasPorIntolerancia(intolerancia, query);

        return ResponseEntity.ok(Map.of("results", recetas));
    }
    @GetMapping
    public List<Receta> obtenerTodasLasRecetas() {
        List<Receta> recetas = recetaService.findAll();

        // Inicializar las colecciones de manera explícita
        for (Receta receta : recetas) {
            Hibernate.initialize(receta.getIntolerancias());
            Hibernate.initialize(receta.getIngredientes());
            Hibernate.initialize(receta.getAnalyzedInstructions());
        }

        return recetas;
    }
    @PostMapping("/crear")
    public ResponseEntity<?> crearReceta(@RequestBody Receta receta, Authentication authentication) {
        // Obtener el nombre de usuario del token JWT
        if (authentication != null) {
            String username = authentication.getName();
            System.out.println("Usuario autenticado: " + username);

            // Lógica para crear la receta sin necesidad de validación de token
            Receta recetaCreada = recetaService.crearReceta(receta);
            return ResponseEntity.ok(recetaCreada);
        } else {
            // Si no hay autenticación, devolver error
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No se ha encontrado un usuario autenticado.");
        }
    }


}