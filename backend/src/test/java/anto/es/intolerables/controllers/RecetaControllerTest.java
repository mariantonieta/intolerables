package anto.es.intolerables.controllers;


import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.services.RecetaService;
import anto.es.intolerables.services.SpooncularService;
import anto.es.intolerables.repositories.RecetaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class RecetaControllerTest {

    private MockMvc mockMvc;

    @Mock
    private RecetaService recetaService;

    @Mock
    private SpooncularService recetaSpooncularService;

    @Mock
    private RecetaRepository recetaRepository;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private RecetaController recetaController;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(recetaController).build();
    }
    @Test
    public void testBuscarRecetasPorIntoleranciaYNombre() throws Exception {

        String intolerancia = "Gluten";
        String query = "Pasta";
        Map<String, Object> receta1 = Map.of("titulo", "Pasta sin gluten", "ingredientes", "Harina sin gluten");
        Map<String, Object> receta2 = Map.of("titulo", "Ensalada", "ingredientes", "Lechuga, Tomate");

        when(recetaSpooncularService.buscarRecetasPorIntolerancia(intolerancia, query)).thenReturn(
                List.of(receta1, receta2));

        mockMvc.perform(get("/api/recetas/buscar")
                        .param("intolerancia", intolerancia)
                        .param("query", query))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.results.length()").value(2))
                .andExpect(jsonPath("$.results[0].titulo").value("Pasta sin gluten"))
                .andExpect(jsonPath("$.results[1].titulo").value("Ensalada"));

        verify(recetaSpooncularService, times(1)).buscarRecetasPorIntolerancia(intolerancia, query);
    }

    @Test
    public void testObtenerTodasLasRecetas() throws Exception {
        Receta receta = new Receta();
        receta.setId(1);
        receta.setTitulo("Receta de prueba");

        when(recetaService.obtenerTodasLasRecetas()).thenReturn(Collections.singletonList(receta));

        mockMvc.perform(get("/api/recetas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].titulo").value("Receta de prueba"));

        verify(recetaService, times(1)).obtenerTodasLasRecetas();
    }
    @Test
    public void testCrearReceta() throws Exception {

        Receta receta = new Receta();
        receta.setId(1);
        receta.setTitulo("Receta creada");
        String username = "Antonieta";
        when(authentication.getName()).thenReturn(username);

        when(recetaService.crearReceta(any(Receta.class))).thenReturn(receta);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonReceta = objectMapper.writeValueAsString(receta);

        mockMvc.perform(post("/api/recetas/crear")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonReceta)
                        .principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.titulo").value("Receta creada"));

        verify(recetaService, times(1)).crearReceta(any(Receta.class));
    }

    @Test
    public void testGuardarRecetaDesdeSpoonacular() throws Exception {
        Map<String, Object> datosReceta = Map.of("Pastaa con tomate", "Pasta sin gluten", "ingredientes", "Pasta de vegetales o sin gluten");

        Receta receta = new Receta();
        receta.setId(1);
        receta.setTitulo("Pasta sin gluten");

        when(recetaService.convertirDesdeSpoonacular(datosReceta)).thenReturn(receta);
        when(recetaRepository.findByTitulo(receta.getTitulo())).thenReturn(Optional.empty());
        when(recetaRepository.save(receta)).thenReturn(receta);

        mockMvc.perform(post("/api/recetas/guardar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(datosReceta)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));

        verify(recetaRepository, times(1)).findByTitulo(receta.getTitulo());
        verify(recetaRepository, times(1)).save(receta);
    }

    @Test
    public void testGuardarRecetaDesdeSpoonacularError() throws Exception {
        Map<String, Object> datosReceta = Map.of("titulo", "Pasta sin gluten", "ingredientes", "Harina sin gluten");

        when(recetaService.convertirDesdeSpoonacular(datosReceta)).thenThrow(new RuntimeException("Error al procesar la receta"));

        mockMvc.perform(post("/api/recetas/guardar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(datosReceta)))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.error").value("Error al procesar la receta"));
    }
}
