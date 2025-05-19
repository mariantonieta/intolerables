package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
import anto.es.intolerables.services.RestauranteService;
import anto.es.intolerables.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/restaurantes")
public class RestauranteController {

    private final RestauranteRepository restauranteRepository;
    private final RestauranteService restauranteService;
    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Restaurante>> listarRestaurantes() {
        try {
            return ResponseEntity.ok(restauranteService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping("/buscar")
    public ResponseEntity<List<Map<String, String>>> buscarRestaurantes(
            @RequestParam String intolerancia,
            @RequestParam String comida,
            @RequestParam String ubicacion) {

        List<Map<String, String>> resultado = restauranteService.buscarRestaurantesConIA(intolerancia, comida, ubicacion);

        // 🚨 Debugging: Verifica si la lista tiene datos antes de enviarla a Postman
        System.out.println("📢 JSON final a enviar:");
        System.out.println(resultado);

        if (resultado.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(resultado);
    }

}
