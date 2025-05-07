package anto.es.intolerables.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class SpooncularServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private SpooncularService spooncularService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testBuscarRecetasPorIntolerancia() {

        Map<String, Object> mockedResponse = new HashMap<>();
        List<Map<String, Object>> results = new ArrayList<>();


        Map<String, Object> receta = new HashMap<>();
        receta.put("id", 1);
        receta.put("title", "Pasta sin gluten");
        receta.put("image", "image_url");
        receta.put("readyInMinutes", 30);
        receta.put("summary", "This is a gluten-free pasta recipe with 200 calories.");

        results.add(receta);

        mockedResponse.put("results", results);

        when(restTemplate.getForObject(anyString(), eq(Map.class)))
                .thenReturn(mockedResponse);

        Map<String, Object> recetaDetalle = new HashMap<>();
        recetaDetalle.put("extendedIngredients", Arrays.asList(
                Map.of("original", "200g pasta")
        ));
        recetaDetalle.put("analyzedInstructions", Collections.singletonList(
                Map.of("steps", List.of(Map.of("step", "Cocer la pasta")))
        ));
        when(restTemplate.getForObject(anyString(), eq(Map.class)))
                .thenReturn(recetaDetalle);

        List<Map<String, Object>> recetas = spooncularService.buscarRecetasPorIntolerancia("gluten", "pasta");

        verify(restTemplate, times(2)).getForObject(anyString(), eq(Map.class));
        assertNotNull(recetas);
        assertEquals(1, recetas.size());
        assertEquals("Pasta sin gluten", recetas.get(0).get("title"));
        assertEquals("image_url", recetas.get(0).get("image"));
        assertEquals(30, recetas.get(0).get("readyInMinutes"));
        assertEquals(200, recetas.get(0).get("calories"));


        List<Map<String, Object>> analyzedInstructions = (List<Map<String, Object>>) recetas.get(0).get("analyzedInstructions");
        assertNotNull(analyzedInstructions);
        assertFalse(analyzedInstructions.isEmpty());


        List<Map<String, Object>> steps = (List<Map<String, Object>>) analyzedInstructions.get(0).get("steps");
        assertNotNull(steps);
        assertEquals(1, steps.size());
        assertEquals("Cocer la pasta", steps.get(0).get("step"));
    }

    @Test
    public void testTraducirTextoLibreTranslate() {
        Map<String, String> mockedTranslationResponse = new HashMap<>();
        mockedTranslationResponse.put("translatedText", "Traducción al español");

        when(restTemplate.postForObject(anyString(), any(), eq(Map.class)))
                .thenReturn(mockedTranslationResponse);

        String translatedText = spooncularService.traducirTextoLibreTranslate("Test translation");

        assertNotNull(translatedText);
        assertEquals("Traducción al español", translatedText);
    }
}
