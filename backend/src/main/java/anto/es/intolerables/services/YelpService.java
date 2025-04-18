package anto.es.intolerables.services;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
import anto.es.intolerables.dto.YelpDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class YelpService {

    private final RestauranteRepository restauranteRepository;

    private static final String YELP_API_URL = "https://api.yelp.com/v3/businesses/search";

    @Value("${yelp.api.key}")
    private String yelpApiKey;
    public List<Restaurante> buscarPorIntolerancia(String intolerancia, String ubicacion, String comida) {
        String categoriaYelp = getYelpCategoryForIntolerancia(intolerancia);

        return buscarRestaurantes(categoriaYelp, ubicacion, comida);
    }

    public List<Restaurante> buscarRestaurantes(String termino, String ubicacion, String comida) {
        // URL para los parámetros de búsqueda (incluyendo comida como categoría)
        String url = String.format("%s?term=%s&location=%s&category=%s", YELP_API_URL, termino, ubicacion, comida);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + yelpApiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<YelpDto> response = restTemplate.exchange(url, HttpMethod.GET, entity, YelpDto.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            List<YelpDto.Business> businesses = response.getBody().getBusinesses();

            return businesses.stream()
                    .map(business -> {
                        Restaurante restaurante = new Restaurante();
                        restaurante.setNombre(business.getName());
                        restaurante.setDireccion(business.getLocation().getAddress1());
                        restaurante.setCategoria(business.getCategories().get(0).getTitle());
                        restaurante.setLatitud(business.getCoordinates().getLatitude());
                        restaurante.setLongitud(business.getCoordinates().getLongitude());
                        restaurante.setImagen(business.getImage_url());
                        restaurante.setUrl(business.getUrl());
                        return restaurante;
                    })
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Error al consultar la API de Yelp");
        }
    }

    // Método que mapea la intolerancia a la categoría correspondiente de Yelp
    private String getYelpCategoryForIntolerancia(String intolerancia) {
        switch (intolerancia.toLowerCase()) {
            case "gluten":
            case "sin gluten":
                return "gluten_free";
            case "vegano":
                return "vegan";
            case "vegetariano":
                return "vegetarian";
            case "kosher":
                return "kosher";
            case "halal":
                return "halal";
            default:
                return "restaurants";  // Default para cuando no hay una intolerancia específica
        }
    }
}
