package anto.es.intolerables.controllers;

import anto.es.intolerables.dto.RecetaDTO;
import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.repositories.RecetaRepository;
import anto.es.intolerables.services.RecetaService;
import anto.es.intolerables.services.SpooncularService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecetaControllerTest {

    @Mock
    private RecetaService recetaService;

    @Mock
    private SpooncularService spooncularService;

    @Mock
    private RecetaRepository recetaRepository;

    @InjectMocks
    private RecetaController recetaController;

    private RecetaDTO recetaDTO;
    private Receta receta;
    private Map<String, Object> spoonacularRecipe;

    @BeforeEach
    void setUp() {
        recetaDTO = new RecetaDTO();
        recetaDTO.setId(1);
        recetaDTO.setTitle("Receta de prueba");

        receta = new Receta();
        receta.setId(1);
        receta.setTitle("Receta de prueba");

        spoonacularRecipe = new HashMap<>();
        spoonacularRecipe.put("id", 123);
        spoonacularRecipe.put("title", "Receta desde Spoonacular");
    }



    @Test
    void crearReceta_ReturnsCreatedReceta() {
        // Arrange
        when(recetaService.crearReceta(any(RecetaDTO.class))).thenReturn(recetaDTO);

        // Act
        ResponseEntity<RecetaDTO> response = recetaController.crearReceta(recetaDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(recetaDTO.getId(), response.getBody().getId());
        verify(recetaService).crearReceta(recetaDTO);
    }

    @Test
    void obtenerRecetas_ReturnsAllRecetas() {
        // Arrange
        List<RecetaDTO> mockRecetas = Collections.singletonList(recetaDTO);
        when(recetaService.obtenerTodasLasRecetas()).thenReturn(mockRecetas);
        when(recetaService.traducirRecetaDTO(any(RecetaDTO.class), anyString())).thenReturn(recetaDTO);

        // Act
        ResponseEntity<List<RecetaDTO>> response = recetaController.obtenerRecetas("es");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals(recetaDTO.getTitle(), response.getBody().get(0).getTitle());
        verify(recetaService).obtenerTodasLasRecetas();
        verify(recetaService).traducirRecetaDTO(recetaDTO, "es");
    }

    @Test
    void eliminarReceta_WhenExists_ReturnsNoContent() {
        // Arrange
        when(recetaRepository.findById(1)).thenReturn(Optional.of(receta));

        // Act
        ResponseEntity<?> response = recetaController.eliminarReceta(1);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(recetaRepository).deleteById(1);
    }

    @Test
    void eliminarReceta_WhenNotExists_ReturnsNotFound() {
        // Arrange
        when(recetaRepository.findById(99)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<?> response = recetaController.eliminarReceta(99);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(recetaRepository, never()).deleteById(anyInt());
    }

    @Test
    void eliminarReceta_WhenError_ReturnsInternalServerError() {
        // Arrange
        when(recetaRepository.findById(1)).thenReturn(Optional.of(receta));
        doThrow(new RuntimeException("Error de base de datos")).when(recetaRepository).deleteById(1);

        // Act
        ResponseEntity<?> response = recetaController.eliminarReceta(1);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertTrue(response.getBody() instanceof Map);
        assertEquals("Error de base de datos", ((Map<?, ?>) response.getBody()).get("error"));
    }

    @Test
    void guardarRecetaDesdeSpoonacular_NewRecipe_ReturnsId() {
        // Arrange
        when(recetaService.convertirDesdeSpoonacular(anyMap())).thenReturn(receta);
        when(recetaRepository.findByTitle(anyString())).thenReturn(Optional.empty());
        when(recetaRepository.save(any(Receta.class))).thenReturn(receta);

        // Act
        ResponseEntity<?> response = recetaController.guardarRecetaDesdeSpoonacular(spoonacularRecipe);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof Map);
        assertEquals(1, ((Map<?, ?>) response.getBody()).get("id"));
        verify(recetaRepository).save(receta);
    }

    @Test
    void guardarRecetaDesdeSpoonacular_ExistingRecipe_ReturnsId() {
        // Arrange
        when(recetaService.convertirDesdeSpoonacular(anyMap())).thenReturn(receta);
        when(recetaRepository.findByTitle(anyString())).thenReturn(Optional.of(receta));

        // Act
        ResponseEntity<?> response = recetaController.guardarRecetaDesdeSpoonacular(spoonacularRecipe);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof Map);
        assertEquals(1, ((Map<?, ?>) response.getBody()).get("id"));
        verify(recetaRepository, never()).save(any());
    }

    @Test
    void guardarRecetaDesdeSpoonacular_WhenError_ReturnsInternalServerError() {
        // Arrange
        when(recetaService.convertirDesdeSpoonacular(anyMap())).thenThrow(new RuntimeException("Error de conversión"));

        // Act
        ResponseEntity<?> response = recetaController.guardarRecetaDesdeSpoonacular(spoonacularRecipe);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertTrue(response.getBody() instanceof Map);
        assertEquals("Error de conversión", ((Map<?, ?>) response.getBody()).get("error"));
    }
}