package anto.es.intolerables.services;

import anto.es.intolerables.entities.Intolerancia;
import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.IntoleranciaRepository;
import anto.es.intolerables.repositories.RestauranteIntolerancia;
import anto.es.intolerables.repositories.RestauranteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpooncularApiService {
    private final RestauranteRepository restauranteRepositorio;
    private final IntoleranciaRepository intoleranciaRepositorio;
    private final RestauranteIntolerancia restauranteIntoleranciaRepo;
    private final RestTemplate restTemplate = new RestTemplate();
    private final RestauranteRepository restauranteRepository;

    public List<Restaurante> buscarPorIntolerancia(String intoleranciaNombre, String ubicacion) {
        String categoriaYelp = mapearCategoriaYelp(intoleranciaNombre);

        // Llamar a Yelp con la categoría correspondiente
        List<Restaurante> yelpRestaurantes = obtenerRestaurantesDeYelp(categoriaYelp, ubicacion);

        // Buscar la entidad Intolerancia en tu DB
        Intolerancia intolerancia = intoleranciaRepositorio.findByNombreContainingIgnoreCase(intoleranciaNombre)
                .orElseThrow(() -> new RuntimeException("No se encontró la intolerancia"));

        // Guardar en la tabla intermedia RestauranteIntolerancia
        List<Restaurante> guardados = new ArrayList<>();
        for (Restaurante restaurante : yelpRestaurantes) {
            // Guarda si no existe ya en la base de datos
            Restaurante restauranteExistente = restauranteRepository.findByNombre(restaurante.getNombre())
                    .orElseGet(() -> restauranteRepository.save(restaurante));

            RestauranteIntolerancia relacion = new RestauranteIntolerancia();
            relacion.setIntolerancia(intolerancia);
            relacion.setRestaurante(restauranteExistente);
            restauranteIntoleranciaRepo.save(relacion);

            guardados.add(restauranteExistente);
        }

        return guardados;
    }

    private String mapearCategoriaYelp(String intolerancia) {
        switch (intolerancia.toLowerCase()) {
            case "gluten":
            case "sin gluten": return "gluten_free";
            case "vegano": return "vegan";
            case "vegetariano": return "vegetarian";
            case "kosher": return "kosher";
            case "halal": return "halal";
            default: return "restaurants";
        }
    }

    private List<Restaurante> obtenerRestaurantesDeYelp(String categoria, String ubicacion) {
        // Simulación de llamada a Yelp
        // Aquí puedes implementar una llamada real con headers y API Key
        // Por simplicidad, retorna lista de prueba o mock
        List<Restaurante> mock = new ArrayList<>();

        Restaurante r1 = new Restaurante();
        r1.setNombre("Mock Restaurante Gluten Free");
        r1.setDireccion("Calle Falsa 123");
        r1.setCategoria(categoria);
        r1.setLatitud(41.390205);
        r1.setLongitud(2.154007);
        r1.setImageN("https://via.placeholder.com/150");
        r1.setUrl("https://mockrestaurant.com");
        mock.add(r1);

        return mock;
    }
}
