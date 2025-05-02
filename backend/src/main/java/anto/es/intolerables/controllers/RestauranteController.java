package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
import anto.es.intolerables.services.RestauranteService;
import anto.es.intolerables.services.YelpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/restaurantes")

public class RestauranteController {
    private final YelpService yelpService;
    private final RestauranteRepository restauranteRepository;
    private final RestauranteService restauranteService;


    @GetMapping
    public ResponseEntity<List<Restaurante>> listarRestaurantes() {
        try {
            return ResponseEntity.ok(restauranteService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorIntolerancia(
            @RequestParam String intolerancia,
            @RequestParam String ubicacion,
            @RequestParam String comida) {

        try {
            if (intolerancia.isBlank() || ubicacion.isBlank()) {
                return ResponseEntity.badRequest().body("Intolerancia y ubicación son obligatorios");
            }

            List<Restaurante> restaurantes = yelpService.buscarPorIntolerancia(intolerancia, ubicacion, comida);

            // Guarda los resultados en la BBDD, evitando duplicados
            for (Restaurante restaurante : restaurantes) {
                if (!restauranteRepository.existsByNombreAndDireccion(restaurante.getNombre(), restaurante.getDireccion())) {
                    restauranteRepository.save(restaurante);
                }
            }

            return ResponseEntity.ok(restaurantes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al buscar restaurantes: " + e.getMessage());
        }
    }}
