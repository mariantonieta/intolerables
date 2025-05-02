package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.Usuario;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
class UsuarioRepositoryTest {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    void findByNombre() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Alberto");
        usuario.setContrasena("123456");
        usuarioRepository.save(usuario);
        Optional<Usuario> resultado = usuarioRepository.findByNombre("Alberto");
        assertTrue(resultado.isPresent());
        assertEquals("Alberto", resultado.get().getNombre());
    }
    @Test
    void testFindByNombreNoExistente() {
        Optional<Usuario> resultado = usuarioRepository.findByNombre("Inexistente");
        assertFalse(resultado.isPresent());
    }
}