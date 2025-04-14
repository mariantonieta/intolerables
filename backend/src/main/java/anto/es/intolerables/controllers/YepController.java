package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.services.YelpService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/yelp")
public class YepController {
    private final YelpService yelpService;

    @GetMapping("/buscar")
    public List<Restaurante> buscarPorIntolerancia(
            @RequestParam String intolerancia,
            @RequestParam String ubicacion,
            @RequestParam String comida) {
        return yelpService.buscarPorIntolerancia(intolerancia, ubicacion, comida);
    }
}
