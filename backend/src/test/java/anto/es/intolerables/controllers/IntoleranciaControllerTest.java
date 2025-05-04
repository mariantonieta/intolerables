package anto.es.intolerables.controllers;
import anto.es.intolerables.entities.Intolerancia;
import anto.es.intolerables.services.IntoleranciaService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class IntoleranciaControllerTest {

    private MockMvc mockMvc;

    @Mock
    private IntoleranciaService intoleranciaService;

    @InjectMocks
    private IntoleranciaController intoleranciaController;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(intoleranciaController).build();
    }

    @Test
    public void testFindAll() throws Exception {
        // Simulamos la lista de intolerancias que el servicio devolverá
        Intolerancia intolerancia1 = new Intolerancia();
        intolerancia1.setId(1);
        intolerancia1.setNombre("Gluten");
        intolerancia1.setDescripcion("Intolerancia al gluten");
        intolerancia1.setDetalles("Detallada información sobre la intolerancia al gluten.");
        intolerancia1.setMensaje("Evitar el consumo de gluten.");
        intolerancia1.setImagen("image_url");

        Intolerancia intolerancia2 = new Intolerancia();
        intolerancia2.setId(2);
        intolerancia2.setNombre("Lactosa");
        intolerancia2.setDescripcion("Intolerancia a la lactosa");
        intolerancia2.setDetalles("Información sobre la intolerancia a la lactosa.");
        intolerancia2.setMensaje("Evitar productos lácteos.");
        intolerancia2.setImagen("image_url");

        when(intoleranciaService.findAll()).thenReturn(Arrays.asList(intolerancia1, intolerancia2));

        mockMvc.perform(get("/api/intolerancias"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nombre").value("Gluten"))
                .andExpect(jsonPath("$[0].descripcion").value("Intolerancia al gluten"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].nombre").value("Lactosa"))
                .andExpect(jsonPath("$[1].descripcion").value("Intolerancia a la lactosa"));

        verify(intoleranciaService, times(1)).findAll();
    }

}