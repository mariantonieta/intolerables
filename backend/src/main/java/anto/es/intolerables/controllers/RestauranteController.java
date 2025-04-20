package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
import anto.es.intolerables.services.RestauranteService;
import anto.es.intolerables.services.YelpService;
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
    public List<Restaurante> buscarPorIntolerancia(
            @RequestParam String intolerancia,
            @RequestParam String ubicacion,
            @RequestParam String comida) {
        List<Restaurante> restaurantes = yelpService.buscarPorIntolerancia(intolerancia, ubicacion, comida);

        //gUARDA LOS RESULTADOS DE LA BUSQUEDA EN LA BBDD
        for (Restaurante restaurante : restaurantes) {
            restauranteRepository.save(restaurante);
        }

        return restaurantes;
    }

   }
