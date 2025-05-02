package anto.es.intolerables.services;

import anto.es.intolerables.entities.Usuario;
import anto.es.intolerables.repositories.UsuarioRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Optional;
import static org.mockito.Mockito.*;
class UsuarioServiceTest {
    private UsuarioRepository repositorio;
    private UsuarioService service;

    @BeforeEach
    void setUp() {
        repositorio = mock(UsuarioRepository.class);
        service = new UsuarioService(repositorio);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findByNombre() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Anto");
        when(repositorio.findByNombre("Anto")).thenReturn(Optional.of(usuario));
        Optional<Usuario> resultado = service.findByNombre("Anto");
        assertTrue(resultado.isPresent());
        assertEquals("Anto", resultado.get().getNombre());
        verify(repositorio).findByNombre("Anto");
    }

    @Test
    void findById() {
        Usuario usuario = new Usuario();
        usuario.setId(1);
        when(repositorio.findById(1)).thenReturn(Optional.of(usuario));
        Optional<Usuario> resultado = service.findById(1);
        assertTrue(resultado.isPresent());
        assertEquals(1, resultado.get().getId());
        verify(repositorio).findById(1);
    }

    @Test
    void save() {
        Usuario usuario = new Usuario();
        when(repositorio.save(usuario)).thenReturn(usuario);
        Usuario resultado = service.save(usuario);
        assertNotNull(resultado);
    }
    @Test
    void testFindByNombre_NoExiste() {
        when(repositorio.findByNombre("Carlos")).thenReturn(Optional.empty());
        Optional<Usuario> resultado = service.findByNombre("Carlos");
        assertFalse(resultado.isPresent());
        verify(repositorio).findByNombre("Carlos");
    }

    @Test
    void testFindById_NotFound() {
        when(repositorio.findById(99)).thenReturn(Optional.empty());

        Optional<Usuario> resultado = service.findById(99);

        assertFalse(resultado.isPresent());
        verify(repositorio).findById(99);
    }
}