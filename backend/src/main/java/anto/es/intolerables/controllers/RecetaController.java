package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.services.RecetaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utils.BeanCopyUtils;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/recetas")
public class RecetaController {
    private final RecetaService recetaService;

    @GetMapping
    public ResponseEntity<List<Receta>> listarRecetas() {
        try {
            List<Receta> recetas = recetaService.findAll();
            return ResponseEntity.ok(recetas);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receta> obtenerReceta(@PathVariable Integer id) {
        try {
            Optional<Receta> receta = recetaService.findById(id);
            return receta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearReceta(@Valid @RequestBody Receta receta) {
        if (receta == null)
            return ResponseEntity.badRequest().build();
        try {
            Receta r = recetaService.save(receta);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", r.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminarReceta(@PathVariable Integer id) {
        try {
            Optional<Receta> receta = recetaService.findById(id);
            if (receta.isPresent()) {
                recetaService.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> reemplazarReceta(@PathVariable Integer id,
                                                                @Valid @RequestBody Receta receta) {
        if (receta == null)
            return ResponseEntity.noContent().build();
        try {
            Optional<Receta> r = recetaService.findById(id);
            if (r.isPresent()) {
                recetaService.save(receta);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizarReceta(@PathVariable Integer id,
                                                                @Valid @RequestBody Receta receta) {
        if (receta == null)
            return ResponseEntity.noContent().build();
        try {
            Optional<Receta> recetaDB = recetaService.findById(id);
            if (recetaDB.isPresent()) {
                BeanCopyUtils.copyNonNullProperties(receta, recetaDB.get());
                recetaService.save(recetaDB.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
