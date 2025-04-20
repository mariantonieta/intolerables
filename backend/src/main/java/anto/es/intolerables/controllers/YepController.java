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

        // Asignar un ID y guardar los restaurantes
        for (Restaurante restaurante : restaurantes) {
            // Asignar un ID único (puedes usar un generador o lo que necesites)
            restauranteRepository.save(restaurante);
        }



        return restaurantes;
     }
    private Integer generateUniqueId() {
        // Generar un ID único, aquí puedes utilizar algún generador o base de datos
        return (int) (System.currentTimeMillis() % Integer.MAX_VALUE);      }

    private List<Restaurante> obtenerRestaurantesDesdeYelp(String intolerancia, String ubicacion, String comida) {
        // Implementación de la API de Yelp (ya la tienes en el servicio)
        return List.of(); // Simulación de datos
    }
}
