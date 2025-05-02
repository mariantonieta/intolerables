package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.Restaurante;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class RestauranteRepositoryTest {
    @Autowired
    private RestauranteRepository restauranteRepository;

    @Test
    void testFindByNombre() {
        Restaurante restaurante = new Restaurante();
        restaurante.setNombre("Casa Pepe");
        restaurante.setDireccion("Calle Luna 12");

        restauranteRepository.save(restaurante);

        Optional<Restaurante> resultado = restauranteRepository.findByNombre("Casa Pepe");

        assertThat(resultado).isPresent();
        assertThat(resultado.get().getDireccion()).isEqualTo("Calle Luna 12");
    }

    @Test
    void testExistsByNombreAndDireccion() {
        Restaurante restaurante = new Restaurante();
        restaurante.setNombre("El Búho");
        restaurante.setDireccion("Avenida Central");

        restauranteRepository.save(restaurante);

        boolean existe = restauranteRepository.existsByNombreAndDireccion("El Búho", "Avenida Central");

        assertThat(existe).isTrue();
    }

    @Test
    void testFindByNombreContainingIgnoreCase() {
        Restaurante restaurante = new Restaurante();
        restaurante.setNombre("Taco Bell");
        restaurante.setDireccion("Calle Falsa");

        restauranteRepository.save(restaurante);

        Optional<Restaurante> resultado = restauranteRepository.findByNombreContainingIgnoreCase("taco");

        assertThat(resultado).isPresent();
        assertThat(resultado.get().getNombre()).isEqualTo("Taco Bell");
    }

}