package anto.es.intolerables.services;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RestauranteServiceTest {
    private RestauranteRepository repo;
    private RestauranteService restauranteService;

    @BeforeEach
    void setUp() {
        repo = mock(RestauranteRepository.class);
        restauranteService = new RestauranteService(repo);
    }

    @Test
    void findAll() {
        Restaurante restau1 = new Restaurante();
        Restaurante restau2 = new Restaurante();
        when(repo.findAll()).thenReturn(Arrays.asList(restau1, restau2));
        List<Restaurante> resultado = restauranteService.findAll();
        assertEquals(2, resultado.size());
        verify(repo).findAll();

    }

    @Test
    void findById() {
        Restaurante restaurante = new Restaurante();
        restaurante.setId(1);
        when(repo.findById(1)).thenReturn(Optional.of(restaurante));

        Optional<Restaurante> resultado = restauranteService.findById(1);

        assertTrue(resultado.isPresent());
        assertEquals(1, resultado.get().getId());
        verify(repo).findById(1);
    }
    @Test
    void testFindById_NotFound() {
        when(repo.findById(99)).thenReturn(Optional.empty());

        Optional<Restaurante> resultado = restauranteService.findById(99);

        assertFalse(resultado.isPresent());
        verify(repo).findById(99);
    }
    @Test
    void save() {

        Restaurante restaurante = new Restaurante();
        restaurante.setNombre("Restaurante Prueba");
        when(repo.save(restaurante)).thenReturn(restaurante);

        Restaurante resultado = restauranteService.save(restaurante);

        assertNotNull(resultado);
        assertEquals("Restaurante Prueba", resultado.getNombre());
        verify(repo).save(restaurante);
    }
}