package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
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
    private final RestauranteRepository restauranteRepository;


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
