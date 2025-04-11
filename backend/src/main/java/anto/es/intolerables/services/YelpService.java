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

    // Llave API de Yelp (deberías almacenarla en application.properties)
    @Value("${yelp.api.key}")
    private String yelpApiKey;

    // Método para realizar la búsqueda de restaurantes a través de la API de Yelp
    public List<Restaurante> buscarRestaurantes(String termino, String ubicacion) {
        // URL para los parámetros de búsqueda
        String url = String.format("%s?term=%s&location=%s", YELP_API_URL, termino, ubicacion);

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
                        restaurante.setImageN(business.getImage_url());
                        restaurante.setUrl(business.getUrl());
                        return restaurante;
                    })
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Error al consultar la API de Yelp");
        }

    }

    public List<Restaurante> buscarPorIntolerancia(String intoleranica, String ubicacion) {
        String categoriaYelp = getYelpCategoryForIntolerancia(intoleranica);
        List<Restaurante> restaurantes = buscarRestaurantes(categoriaYelp, ubicacion);
        return restaurantes;
    }

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
                return "restaurants";
        }
    }}
