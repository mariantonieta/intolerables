package anto.es.intolerables.services;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
import anto.es.intolerables.dto.YelpDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class YelpServiceTest {

    @Mock
    private RestauranteRepository restauranteRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private YelpService yelpService;
//api falsa
    private static final String MOCK_API_KEY = "a".repeat(128);


    @BeforeEach
    void setUp() {
        yelpService.setYelpApiKey(MOCK_API_KEY);
    }

    @Test
    void buscarPorIntolerancia_ReturnListaDeRestaurantes() {
        // Datos simulados
        YelpDTO mockYelpDTO = new YelpDTO();
        YelpDTO.Business business = new YelpDTO.Business();

        YelpDTO.Location location = new YelpDTO.Location();
        location.setAddress1("Calle hermanos machado, 5");
        business.setLocation(location);

        YelpDTO.Category category = new YelpDTO.Category();
        category.setTitle("Vegetarian");
        business.setCategories(List.of(category));

        YelpDTO.Coordinates coordinates = new YelpDTO.Coordinates();
        coordinates.setLatitude(40.4165);
        coordinates.setLongitude(-3.70256);
        business.setCoordinates(coordinates);

        business.setName("Restaurante Saludable");
        business.setImage_url("https://imagen.ejemplo.com");
        business.setUrl("https://ejemplo.com");

        mockYelpDTO.setBusinesses(List.of(business));

        ResponseEntity<YelpDTO> mockResponse = new ResponseEntity<>(mockYelpDTO, HttpStatus.OK);

        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(), eq(YelpDTO.class)))
                .thenReturn(mockResponse);

        List<Restaurante> resultado = yelpService.buscarPorIntolerancia("vegetariano", "Madrid", "pasta");
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals("Restaurante Saludable", resultado.get(0).getNombre());
//configurar la llamada a la api
        verify(restTemplate, times(1)).exchange(anyString(), eq(HttpMethod.GET), any(), eq(YelpDTO.class));
    }

    @Test
    void deberiaLanzarExcepcionCuandoYelpDevuelveError() {
        // Respuesta de error
        ResponseEntity<YelpDTO> mockErrorResponse = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(), eq(YelpDTO.class)))
                .thenReturn(mockErrorResponse);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            yelpService.buscarPorIntolerancia("vegetariano", "Madrid", "pasta");
        });

        assertEquals("Error al consultar la API de Yelp", exception.getMessage());
    }

}

