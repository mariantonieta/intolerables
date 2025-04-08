package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.services.RestauranteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/restaurantes")
public class RestauranteController {

    private final RestauranteService restauranteService;
    @GetMapping
    public List<Restaurante> listarRestaurantes() {
        return restauranteService.findAll();
    }

    @PostMapping
    public Restaurante crearRestaurante(@RequestBody Restaurante restaurante) {
        return restauranteService.save(restaurante);
    }
}
