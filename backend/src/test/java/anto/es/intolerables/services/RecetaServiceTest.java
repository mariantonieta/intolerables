package anto.es.intolerables.services;

import anto.es.intolerables.dto.*;
import anto.es.intolerables.entities.*;
import anto.es.intolerables.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.*;

public class RecetaServiceTest {

    private MockMvc mockMvc;

    @Mock
    private RecetaRepository recetaRepository;

    @Mock
    private IngredienteRepository ingredienteRepository;

    @InjectMocks
    private RecetaService recetaService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCrearReceta() {

        RecetaDTO recetaDTO = new RecetaDTO();
        recetaDTO.setTitle("Pasta sin gluten");
        recetaDTO.setSummary("Una receta deliciosa");
        recetaDTO.setCalories(200);
        recetaDTO.setReadyInMinutes(30);
        recetaDTO.setImage("image_url");
        recetaDTO.setPasosPreparacion(Arrays.asList(new PasoPreparacionDTO("Cocer la pasta")));
        recetaDTO.setRecetaIngredientes(Arrays.asList(new IngredienteDTO(1, "Pasta", "200g")));

        Receta receta = new Receta();
        receta.setTitle("Pasta sin gluten");
        receta.setSummary("Una receta deliciosa");
        receta.setCalories(200);
        receta.setReadyInMinutes(30);
        receta.setImage("image_url");
        receta.setPasosPreparacion(new ArrayList<>());
        receta.setIngredientes(new ArrayList<>());

        when(recetaRepository.save(any(Receta.class))).thenReturn(receta);

        RecetaDTO recetaGuardada = recetaService.crearReceta(recetaDTO);

        assertNotNull(recetaGuardada);
        assertEquals("Pasta sin gluten", recetaGuardada.getTitle());
        assertEquals(200, recetaGuardada.getCalories());
        assertEquals(30, recetaGuardada.getReadyInMinutes());
        verify(recetaRepository, times(1)).save(any(Receta.class));
    }



    @Test
    public void testConvertirDesdeSpoonacular() {

        Map<String, Object> datosReceta = Map.of(
                "title", "Pasta sin gluten",
                "image", "image_url",
                "readyInMinutes", 30,
                "calories", 200,
                "extendedIngredients", List.of(
                        Map.of("name", "Pasta", "amount", 200, "unit", "g")
                ),
                "analyzedInstructions", List.of(
                        Map.of("steps", List.of(Map.of("step", "Cocer la pasta"))))
        );

        Receta receta = recetaService.convertirDesdeSpoonacular(datosReceta);


        assertNotNull(receta);
        assertEquals("Pasta sin gluten", receta.getTitle());
        assertEquals(200, receta.getCalories());
        assertEquals(30, receta.getReadyInMinutes());
        assertFalse(receta.getIngredientes().isEmpty());
        assertFalse(receta.getPasosPreparacion().isEmpty());
    }
}
