package anto.es.intolerables.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SpooncularServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private SpooncularService spooncularService;

    private static final String SPOONACULAR_API_KEY = "a".repeat(128);

    @BeforeEach
    public void setUp() {
        spooncularService.setSpooncularApiKey(SPOONACULAR_API_KEY);
    }

    @Test
    public void testBuscarRecetasPorIntolerancia() {
        String intolerancia = "gluten";
        String query = "pasta";

        Map<String, Object> item1 = new HashMap<>();
        item1.put("id", 123);
        item1.put("title", "Pasta sin gluten");
        item1.put("image", "https://image.url");
        item1.put("readyInMinutes", 30);
        item1.put("summary", "A delicious gluten-free pasta recipe with 300 calories.");

        List<Map<String, Object>> results = new ArrayList<>();
        results.add(item1);

        Map<String, Object> response = new HashMap<>();
        response.put("results", results);
        when(restTemplate.getForObject(Mockito.anyString(), Mockito.eq(Map.class))).thenReturn(response);
        Map<String, Object> detalle = new HashMap<>();
        detalle.put("extendedIngredients", Arrays.asList(Map.of("original", "gluten-free pasta")));
        detalle.put("analyzedInstructions", Arrays.asList(
                Map.of("steps", Arrays.asList(Map.of("number", 1, "step", "Boil the pasta")))
        ));

        when(restTemplate.getForObject(Mockito.contains("recipes/123/information"), Mockito.eq(Map.class))).thenReturn(detalle);

        List<Map<String, Object>> recetas = spooncularService.buscarRecetasPorIntolerancia(intolerancia, query);

        assertNotNull(recetas);
        assertEquals(1, recetas.size());
        Map<String, Object> receta = recetas.get(0);
        assertEquals("Pasta sin gluten", receta.get("title"));
        assertEquals("https://image.url", receta.get("image"));
        assertEquals(30, receta.get("readyInMinutes"));
        assertEquals(300, receta.get("calories"));

        List<Map<String, String>> ingredientes = (List<Map<String, String>>) receta.get("extendedIngredients");
        assertEquals("gluten-free pasta", ingredientes.get(0).get("original"));

        List<Map<String, Object>> instrucciones = (List<Map<String, Object>>) receta.get("analyzedInstructions");
        assertNotNull(instrucciones);
        assertFalse(instrucciones.isEmpty());
        assertTrue(instrucciones.get(0).containsKey("steps"));
    }
    @Test
    public void testTraducirTextoLibreTranslate() {
        Map<String, String> translatedResponse = new HashMap<>();
        translatedResponse.put("translatedText", "Pasta sin gluten");


        when(restTemplate.postForObject(Mockito.anyString(), Mockito.any(HttpEntity.class), Mockito.eq(Map.class)))
                .thenReturn(translatedResponse);

        String result = spooncularService.traducirTextoLibreTranslate("Gluten-free pasta");

        assertEquals("Pasta sin gluten", result);
    }
}
