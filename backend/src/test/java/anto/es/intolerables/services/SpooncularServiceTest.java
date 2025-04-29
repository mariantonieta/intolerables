package anto.es.intolerables.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;
        import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class SpooncularServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private SpooncularService spooncularService;

    private static final String MOCK_API_KEY = "a".repeat(128);
    @BeforeEach
    void setUp() {
        spooncularService.setSpooncularApiKey(MOCK_API_KEY);


    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void buscarRecetasPorIntolerancia() {
        Map<String, Object> mockSearchResponse = Map.of(
                "results", List.of(
                        Map.of(
                                "id", 1,
                                "title", "Receta de Pasta Vegana",
                                "image", "https://imagen.ejemplo.com/pasta.jpg",
                                "readyInMinutes", 30,
                                "summary", "Una deliciosa receta vegana con 500 calories"
                        )
                )
        );

        Map<String, Object> mockRecipeDetailResponse = Map.of(
                "extendedIngredients", List.of(
                        Map.of("original", "100g de pasta vegana"),
                        Map.of("original", "50g de tomate")
                ),
                "analyzedInstructions", List.of(
                        Map.of("steps", List.of(Map.of("step", "Cocinar la pasta")))
                )
        );

        when(restTemplate.getForObject(anyString(), eq(Map.class)))
                .thenReturn(mockSearchResponse)
                .thenReturn(mockRecipeDetailResponse);

        List<Map<String, Object>> recetas = spooncularService.buscarRecetasPorIntolerancia("vegan", "pasta");

        assertNotNull(recetas);
        assertFalse(recetas.isEmpty());

        Map<String, Object> receta = recetas.get(0);
        assertEquals("Receta de Pasta Vegana", receta.get("title"));
        assertEquals("https://imagen.ejemplo.com/pasta.jpg", receta.get("image"));
        assertEquals(30, receta.get("readyInMinutes"));
        assertEquals(500, receta.get("calories"));
        assertEquals("Una deliciosa receta vegana con 500 calories", receta.get("summary"));

        // Verificamos que los ingredientes se han extraído correctamente
        List<Map<String, Object>> instrucciones = (List<Map<String, Object>>) receta.get("analyzedInstructions");
        assertEquals(1, instrucciones.size());

        List<Map<String, Object>> pasos = (List<Map<String, Object>>) instrucciones.get(0).get("steps");
        assertEquals("Cocinar la pasta", pasos.get(0).get("step"));

        // Verificamos que se hicieron las llamadas correctas a la API
        verify(restTemplate, times(2)).getForObject(anyString(), eq(Map.class));

    }
}