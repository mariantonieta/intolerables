package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.FavoritoRestaurante;
import anto.es.intolerables.services.FavoritoRestauranteService;
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
@RequestMapping("/api/favoritos-restaurantes")
public class FavoritoRestauranteController { private final FavoritoRestauranteService favoritoRestauranteService;

    @GetMapping
    public ResponseEntity<List<FavoritoRestaurante>> listarFavoritos() {
        try {
            return ResponseEntity.ok(favoritoRestauranteService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<FavoritoRestaurante> obtenerFavorito(@PathVariable Integer id) {
        try {
            return favoritoRestauranteService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearFavorito(@Valid @RequestBody FavoritoRestaurante favorito) {
        try {
            FavoritoRestaurante f = favoritoRestauranteService.save(favorito);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", f.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarFavorito(@PathVariable Integer id) {
        try {
            if (favoritoRestauranteService.findById(id).isPresent()) {
                favoritoRestauranteService.deleteById(id);
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
                                                @Valid @RequestBody FavoritoRestaurante favorito) {
        try {
            if (favoritoRestauranteService.findById(id).isPresent()) {
                favoritoRestauranteService.save(favorito);
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
                                                @Valid @RequestBody FavoritoRestaurante favorito) {
        try {
            Optional<FavoritoRestaurante> favoritoDB = favoritoRestauranteService.findById(id);
            if (favoritoDB.isPresent()) {
                BeanCopyUtils.copyNonNullProperties(favorito, favoritoDB.get());
                favoritoRestauranteService.save(favoritoDB.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
