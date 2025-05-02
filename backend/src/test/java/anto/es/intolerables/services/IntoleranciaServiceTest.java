package anto.es.intolerables.services;

import anto.es.intolerables.entities.Intolerancia;
import anto.es.intolerables.entities.Usuario;
import anto.es.intolerables.entities.UsuarioIntolerancia;
import anto.es.intolerables.repositories.IntoleranciaRepository;
import anto.es.intolerables.repositories.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IntoleranciaServiceTest {

@Mock private IntoleranciaRepository intoleranciaRepository;
@Mock private UsuarioRepository usuarioRepository;
@InjectMocks IntoleranciaService intoleranciaService;




    @BeforeEach
    void setUp() {
    }

    @Test
    void findAll() {
        Intolerancia into1 = new Intolerancia();
        Intolerancia into2 = new Intolerancia();
        when(intoleranciaRepository.findAll()).thenReturn(List.of(into1,into2));
        List<Intolerancia> resultado = intoleranciaService.findAll();
        assertEquals(2, resultado.size());
        verify(intoleranciaRepository).findAll();



    }

    @Test
    void findById() {
        Intolerancia intolerancia = new Intolerancia();
        intolerancia.setId(1);
        when(intoleranciaRepository.findById(1)).thenReturn(Optional.of(intolerancia));

        Optional<Intolerancia> resultado = intoleranciaService.findById(1);

        assertTrue(resultado.isPresent());
        assertEquals(1, resultado.get().getId());
        verify(intoleranciaRepository).findById(1);
    }

    @Test
    void save() {
        Intolerancia intolerancia = new Intolerancia();
        intolerancia.setNombre("Lactosa");
        when(intoleranciaRepository.save(intolerancia)).thenReturn(intolerancia);
        Intolerancia resulatdo = intoleranciaService.save(intolerancia);
        assertEquals("Lactosa", resulatdo.getNombre());
        verify(intoleranciaRepository).save(intolerancia);
    }

    @Test
    void asociarAUsuario() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Geovanna");
        usuario.setIntolerancias(new ArrayList<>());
        Intolerancia intolerancia = new Intolerancia();
        intolerancia.setNombre("Mariscos");
        when(usuarioRepository.findByNombre("Geovanna")).thenReturn(Optional.of(usuario));
        when(intoleranciaRepository.findByNombreContainingIgnoreCase("Mariscos")).thenReturn(Optional.of(intolerancia));
        when(usuarioRepository.save(any(Usuario.class)))
                .thenReturn(usuario);
        boolean resultado = intoleranciaService.asociarAUsuario("Mariscos", "Geovanna");
        assertTrue(resultado);
        assertEquals(1, usuario.getIntolerancias().size());
        UsuarioIntolerancia relacion = usuario.getIntolerancias().get(0);
        assertEquals(usuario, relacion.getUsuario());
        assertEquals(intolerancia, relacion.getIntolerancia());
        verify(usuarioRepository).save(usuario);
    }
    @Test
    void testAsociarAUsuario_FalloPorUsuario() {
        when(usuarioRepository.findByNombre("Ana")).thenReturn(Optional.empty());
        when(intoleranciaRepository.findByNombreContainingIgnoreCase("Gluten"))
                .thenReturn(Optional.of(new Intolerancia()));

        boolean resultado = intoleranciaService.asociarAUsuario("Gluten", "Ana");

        assertFalse(resultado);
        verify(usuarioRepository, never()).save(any());
    }
    @Test
    void testAsociarAUsuario_FalloPorIntolerancia() {
        when(usuarioRepository.findByNombre("Ana")).thenReturn(Optional.of(new Usuario()));
        when(intoleranciaRepository.findByNombreContainingIgnoreCase("Gluten"))
                .thenReturn(Optional.empty());

        boolean resultado = intoleranciaService.asociarAUsuario("Gluten", "Ana");

        assertFalse(resultado);
        verify(usuarioRepository, never()).save(any());
    }

}