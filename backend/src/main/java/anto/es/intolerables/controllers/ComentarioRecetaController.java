package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.ComentarioReceta;
import anto.es.intolerables.services.ComentarioRecetaService;
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
@RequestMapping("/api/comentarios-recetas")
public class ComentarioRecetaController {
    private final ComentarioRecetaService comentarioRecetaService;

    @GetMapping
    public ResponseEntity<List<ComentarioReceta>> listarComentarios() {
        try {
            return ResponseEntity.ok(comentarioRecetaService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioReceta> obtenerComentario(@PathVariable Integer id) {
        try {
            return comentarioRecetaService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearComentario(@Valid @RequestBody ComentarioReceta comentario) {
        try {
            ComentarioReceta c = comentarioRecetaService.save(comentario);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", c.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarComentario(@PathVariable Integer id) {
        try {
            if (comentarioRecetaService.findById(id).isPresent()) {
                comentarioRecetaService.deleteById(id);
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
                                                  @Valid @RequestBody ComentarioReceta comentario) {
        try {
            if (comentarioRecetaService.findById(id).isPresent()) {
                comentarioRecetaService.save(comentario);
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
                                                  @Valid @RequestBody ComentarioReceta comentario) {
        try {
            Optional<ComentarioReceta> comentarioDB = comentarioRecetaService.findById(id);
            if (comentarioDB.isPresent()) {
                BeanCopyUtils.copyNonNullProperties(comentario, comentarioDB.get());
                comentarioRecetaService.save(comentarioDB.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

}
