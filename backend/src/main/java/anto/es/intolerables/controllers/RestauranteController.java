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

   }
