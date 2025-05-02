package anto.es.intolerables.services;

import anto.es.intolerables.entities.FavoritoRestaurante;
import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.entities.Usuario;
import anto.es.intolerables.repositories.FavoritoRestauranteRepository;
import anto.es.intolerables.repositories.RestauranteRepository;
import anto.es.intolerables.repositories.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FavoritoRestauranteServiceTest {
@Mock private FavoritoRestauranteRepository favoritoRestauranteRepository;
@Mock private UsuarioRepository usuarioRepository;
@Mock private RestauranteRepository restauranteRepository;
@InjectMocks
private FavoritoRestauranteService favoritoRestauranteService;
private Usuario usuario;
private Restaurante restaurante;
    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1);

        restaurante = new Restaurante();
        restaurante.setId(2);
    }

    @Test
    void findAll() {
        when(favoritoRestauranteRepository.findAll()).thenReturn(List.of(new FavoritoRestaurante()));
        List<FavoritoRestaurante> favoritos = favoritoRestauranteService.findAll();
        assertEquals(1, favoritos.size());
        verify(favoritoRestauranteRepository).findAll();
    }

    @Test
    void findByUsuarioAndRestaurante() {
        FavoritoRestaurante favorito = new FavoritoRestaurante();
        when(favoritoRestauranteRepository.findByUsuarioAndRestaurante(usuario, restaurante))
                .thenReturn(Optional.of(favorito));

        Optional<FavoritoRestaurante> resultado =
                favoritoRestauranteService.findByUsuarioAndRestaurante(usuario, restaurante);

        assertTrue(resultado.isPresent());
        verify(favoritoRestauranteRepository).findByUsuarioAndRestaurante(usuario, restaurante);

    }

    @Test
    void agregarFavorito() {
        when(favoritoRestauranteRepository.existsByUsuarioIdAndRestauranteId(1, 2)).thenReturn(false);
        when(usuarioRepository.findById(1)).thenReturn(Optional.of(usuario));
        when(restauranteRepository.findById(2)).thenReturn(Optional.of(restaurante));

        favoritoRestauranteService.agregarFavorito(1, 2);

        verify(favoritoRestauranteRepository).save(any(FavoritoRestaurante.class));
    }
    @Test
    void testAgregarFavorito_UsuarioNoEncontrado() {
        when(favoritoRestauranteRepository.existsByUsuarioIdAndRestauranteId(1, 2)).thenReturn(false);
        when(usuarioRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                favoritoRestauranteService.agregarFavorito(1, 2));

        assertEquals("Usuario no encontrado", exception.getMessage());
    }

    @Test
    void testAgregarFavorito_RestauranteNoEncontrado() {
        when(favoritoRestauranteRepository.existsByUsuarioIdAndRestauranteId(1, 2)).thenReturn(false);
        when(usuarioRepository.findById(1)).thenReturn(Optional.of(usuario));
        when(restauranteRepository.findById(2)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                favoritoRestauranteService.agregarFavorito(1, 2));

        assertEquals("Restaurante no encontrado", exception.getMessage());
    }


    @Test
    void findById() {
        FavoritoRestaurante favorito = new FavoritoRestaurante();
        when(favoritoRestauranteRepository.findById(10)).thenReturn(Optional.of(favorito));

        Optional<FavoritoRestaurante> result = favoritoRestauranteService.findById(10);

        assertTrue(result.isPresent());
        verify(favoritoRestauranteRepository).findById(10);
    }

    @Test
    void save() {
        FavoritoRestaurante favorito = new FavoritoRestaurante();
        when(favoritoRestauranteRepository.save(favorito)).thenReturn(favorito);

        FavoritoRestaurante result = favoritoRestauranteService.save(favorito);

        assertEquals(favorito, result);
        verify(favoritoRestauranteRepository).save(favorito);
    }

    @Test
    void deleteById() {
        favoritoRestauranteService.deleteById(5);
        verify(favoritoRestauranteRepository).deleteById(5);
    }
}