package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.FavoritoReceta;
import anto.es.intolerables.services.FavoritoRecetaService;
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
@RequestMapping("/api/favoritos-recetas")
public class FavoritoRecetaController {
    private final FavoritoRecetaService favoritoRecetaService;

    @GetMapping
    public ResponseEntity<List<FavoritoReceta>> listarFavoritos() {
        try {
            return ResponseEntity.ok(favoritoRecetaService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<FavoritoReceta> obtenerFavorito(@PathVariable Integer id) {
        try {
            return favoritoRecetaService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearFavorito(@Valid @RequestBody FavoritoReceta favorito) {
        try {
            FavoritoReceta f = favoritoRecetaService.save(favorito);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", f.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarFavorito(@PathVariable Integer id) {
        try {
            if (favoritoRecetaService.findById(id).isPresent()) {
                favoritoRecetaService.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> reemplazarFavorito(@PathVariable Integer id,
                                                @Valid @RequestBody FavoritoReceta favorito) {
        try {
            if (favoritoRecetaService.findById(id).isPresent()) {
                favoritoRecetaService.save(favorito);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> actualizarFavorito(@PathVariable Integer id,
                                                @Valid @RequestBody FavoritoReceta favorito) {
        try {
            Optional<FavoritoReceta> favoritoDB = favoritoRecetaService.findById(id);
            if (favoritoDB.isPresent()) {
                BeanCopyUtils.copyNonNullProperties(favorito, favoritoDB.get());
                favoritoRecetaService.save(favoritoDB.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
