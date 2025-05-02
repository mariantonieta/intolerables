package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.Intolerancia;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.swing.text.html.Option;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
class IntoleranciaRepositoryTest {
@Autowired private IntoleranciaRepository intoleranciaRepository;


    @Test
    void findByNombreContainingIgnoreCase() {
        Intolerancia intolerancia = new Intolerancia();
        intolerancia.setNombre("Lactosa");
        intolerancia.setDescripcion("Intolerancia a la lactosa");
        intolerancia.setDetalles("Detalles de prueba");
        intolerancia.setMensaje("Evitar productos lácteos");
        intolerancia.setImagen("lactosa.jpg");
        intoleranciaRepository.save(intolerancia);
        Optional<Intolerancia> resultado = intoleranciaRepository.findByNombreContainingIgnoreCase("Lac");
        assertThat(resultado).isPresent();
        assertThat(resultado.get().getNombre()).isEqualTo("Lactosa");

    }
}