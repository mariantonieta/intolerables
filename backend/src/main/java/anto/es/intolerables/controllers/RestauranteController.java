package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.services.RestauranteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utils.BeanCopyUtils;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/restaurantes")
public class RestauranteController {

    private final RestauranteService restauranteService;
@GetMapping
    public ResponseEntity<List<Restaurante>> listarRestaurantes() {
        try {
            return ResponseEntity.ok(restauranteService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> obtenerRestaurante(@PathVariable Integer id) {
        try {
            return restauranteService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearRestaurante(@Valid @RequestBody Restaurante restaurante) {
        try {
            Restaurante r = restauranteService.save(restaurante);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", r.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarRestaurante(@PathVariable Integer id) {
        try {
            if (restauranteService.findById(id).isPresent()) {
                restauranteService.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> reemplazarRestaurante(@PathVariable Integer id,
                                                   @Valid @RequestBody Restaurante restaurante) {
        try {
            if (restauranteService.findById(id).isPresent()) {
                restauranteService.save(restaurante);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> actualizarRestaurante(@PathVariable Integer id,
                                                   @Valid @RequestBody Restaurante restaurante) {
        try {
            Optional<Restaurante> restauranteDB = restauranteService.findById(id);
            if (restauranteDB.isPresent()) {
                BeanCopyUtils.copyNonNullProperties(restaurante, restauranteDB.get());
                restauranteService.save(restauranteDB.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
