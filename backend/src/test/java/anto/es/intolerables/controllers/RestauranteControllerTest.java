package anto.es.intolerables.controllers;


import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
import anto.es.intolerables.services.RestauranteService;
import anto.es.intolerables.services.YelpService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)  // Agregar esta línea
class RestauranteControllerTest {

    private MockMvc mockMvc;

    @Mock
    private YelpService yelpService;

    @Mock
    private RestauranteService restauranteService;

    @Mock
    private RestauranteRepository restauranteRepository;

    @InjectMocks
    private RestauranteController restauranteController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(restauranteController).build();
    }

    @Test
    void testListarRestaurantes() throws Exception {
        Restaurante restaurante1 = new Restaurante();
        restaurante1.setNombre("Restaurante A");
        restaurante1.setDireccion("Dirección A");

        Restaurante restaurante2 = new Restaurante();
        restaurante2.setNombre("Restaurante B");
        restaurante2.setDireccion("Dirección B");

        List<Restaurante> listaRestaurantes = Arrays.asList(restaurante1, restaurante2);
        when(restauranteService.findAll()).thenReturn(listaRestaurantes);

        mockMvc.perform(get("/api/restaurantes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").value("Restaurante A"))
                .andExpect(jsonPath("$[1].nombre").value("Restaurante B"));

        verify(restauranteService, times(1)).findAll();
    }

    @Test
    void testBuscarPorIntolerancia() throws Exception {
        String intolerancia = "lactosa";
        String ubicacion = "Madrid";
        String comida = "pizza";

        Restaurante restaurante1 = new Restaurante();
        restaurante1.setNombre("Restaurante A");
        restaurante1.setDireccion("Dirección A");

        Restaurante restaurante2 = new Restaurante();
        restaurante2.setNombre("Restaurante B");
        restaurante2.setDireccion("Dirección B");

        List<Restaurante> listaRestaurantes = Arrays.asList(restaurante1, restaurante2);

        when(yelpService.buscarPorIntolerancia(intolerancia, ubicacion, comida)).thenReturn(listaRestaurantes);

        mockMvc.perform(get("/api/restaurantes/buscar")
                        .param("intolerancia", intolerancia)
                        .param("ubicacion", ubicacion)
                        .param("comida", comida))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").value("Restaurante A"))
                .andExpect(jsonPath("$[1].nombre").value("Restaurante B"));
verify(yelpService, times(1)).buscarPorIntolerancia(intolerancia, ubicacion, comida);
    }

  /*  @Test
    void testBuscarPorIntolerancia_Fail_NoIntolerancia() throws Exception {
        mockMvc.perform(get("/api/restaurantes/buscar")
                        .param("ubicacion", "Madrid")
                        .param("comida", "pizza"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Intolerancia y ubicación son obligatorios"));
    }@Test
    void testBuscarPorIntolerancia_Fail_NoUbicacion() throws Exception {
         mockMvc.perform(get("/api/restaurantes/buscar")
                        .param("intolerancia", "lactosa")
                        .param("comida", "pizza"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Intolerancia y ubicación son obligatorios"));
    }*/

    @Test
    void testBuscarPorIntolerancia_Exception() throws Exception {

        when(yelpService.buscarPorIntolerancia(anyString(), anyString(), anyString()))
                .thenThrow(new RuntimeException("Error al buscar restaurantes"));
   mockMvc.perform(get("/api/restaurantes/buscar")
                        .param("intolerancia", "lactosa")
                        .param("ubicacion", "Madrid")
                        .param("comida", "pizza"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error al buscar restaurantes: Error al buscar restaurantes"));
    }
}
