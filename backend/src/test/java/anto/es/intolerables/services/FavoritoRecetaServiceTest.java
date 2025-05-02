package anto.es.intolerables.services;

import anto.es.intolerables.entities.FavoritoReceta;
import anto.es.intolerables.repositories.FavoritoRecetaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FavoritoRecetaServiceTest {
@Mock
private FavoritoRecetaRepository favoritoRecetaRepository;
@InjectMocks private FavoritoRecetaService favoritoRecetaService;
    @BeforeEach
    void setUp() {
    }

    @Test
    void findAll() {
        FavoritoReceta favorito = new FavoritoReceta();
        when(favoritoRecetaRepository.findAll()).thenReturn(List.of(favorito));
        List<FavoritoReceta> resultado = favoritoRecetaService.findAll();
        assertEquals(1, resultado.size());
        verify(favoritoRecetaRepository).findAll();
    }

    @Test
    void findById() {
        FavoritoReceta favorito = new FavoritoReceta();
        when(favoritoRecetaRepository.findById(1)).thenReturn(Optional.of(favorito));
        Optional<FavoritoReceta> resultado = favoritoRecetaService.findById(1);
        assertTrue(resultado.isPresent());
        verify(favoritoRecetaRepository).findById(1);

    }

    @Test
    void save() {
        FavoritoReceta favorito = new FavoritoReceta();
        when(favoritoRecetaRepository.save(favorito)).thenReturn(favorito);
        FavoritoReceta resultado = favoritoRecetaService.save(favorito);
        assertEquals(favorito, resultado);
        verify(favoritoRecetaRepository).save(favorito);
    }

    @Test
    void deleteById() {
        favoritoRecetaService.deleteById(1);
        verify(favoritoRecetaRepository).deleteById(1);
    }
    }
