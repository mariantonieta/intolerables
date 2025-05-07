package anto.es.intolerables.controllers;

import anto.es.intolerables.dto.RecetaDTO;
import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.repositories.RecetaRepository;
import anto.es.intolerables.services.RecetaService;
import anto.es.intolerables.services.SpooncularService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping
    public ResponseEntity<RecetaDTO> crearReceta(@RequestBody RecetaDTO recetaDTO) {
        RecetaDTO nuevaReceta = recetaService.crearReceta(recetaDTO);
        return ResponseEntity.ok(nuevaReceta);
    }

    @GetMapping("/todas")
    public ResponseEntity<List<RecetaDTO>> obtenerRecetas() {
        return ResponseEntity.ok(recetaService.obtenerTodasLasRecetas());
    }
    @PostMapping("/guardar")
    public ResponseEntity<?> guardarRecetaDesdeSpoonacular(@RequestBody Map<String, Object> datosReceta) {
        try {
            Receta receta = recetaService.convertirDesdeSpoonacular(datosReceta);

            Receta recetaGuardada = recetaRepository.findByTitle(receta.getTitle())
                    .orElseGet(() -> recetaRepository.save(receta));

            return ResponseEntity.ok(Map.of("id", recetaGuardada.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
