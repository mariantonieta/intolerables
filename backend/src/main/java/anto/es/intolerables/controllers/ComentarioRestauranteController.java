package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.ComentarioRestaurante;
import anto.es.intolerables.services.ComentarioRestauranteService;
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
@RequestMapping("/api/comentarios-restaurantes")

public class ComentarioRestauranteController {
    private final ComentarioRestauranteService comentarioRestauranteService;

    @GetMapping
    public ResponseEntity<List<ComentarioRestaurante>> listarComentarios() {
        try {
            return ResponseEntity.ok(comentarioRestauranteService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioRestaurante> obtenerComentario(@PathVariable Integer id) {
        try {
            return comentarioRestauranteService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearComentario(@Valid @RequestBody ComentarioRestaurante comentario) {
        try {
            ComentarioRestaurante c = comentarioRestauranteService.save(comentario);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", c.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarComentario(@PathVariable Integer id) {
        try {
            if (comentarioRestauranteService.findById(id).isPresent()) {
                comentarioRestauranteService.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> reemplazarComentario(@PathVariable Integer id,
                                                  @Valid @RequestBody ComentarioRestaurante comentario) {
        try {
            if (comentarioRestauranteService.findById(id).isPresent()) {
                comentarioRestauranteService.save(comentario);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> actualizarComentario(@PathVariable Integer id,
                                                  @Valid @RequestBody ComentarioRestaurante comentario) {
        try {
            Optional<ComentarioRestaurante> comentarioDB = comentarioRestauranteService.findById(id);
            if (comentarioDB.isPresent()) {
                BeanCopyUtils.copyNonNullProperties(comentario, comentarioDB.get());
                comentarioRestauranteService.save(comentarioDB.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
