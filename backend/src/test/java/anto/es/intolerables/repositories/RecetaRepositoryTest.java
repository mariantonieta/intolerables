package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.entities.RecetaIngrediente;
import anto.es.intolerables.entities.RecetaIntolerancia;
import anto.es.intolerables.entities.RecetaPasos;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
class RecetaRepositoryTest {
@Autowired
 private RecetaRepository recetaRepository;
    @Test
    void findByTitulo() {
        Receta receta = new Receta();
        receta.setTitulo("Tortilla de Patatas");
        receta.setImagen("tortilla.jpg");
        receta.setFechaCreacionReceta(LocalDate.of(2025, 4, 30));
        receta.setDuracionReceta(60);
        receta.setCalorias(300);
        receta.setTipoReceta("Sin gluten");

        RecetaIngrediente ri = new RecetaIngrediente();
        ri.setCantidad("1 unidades");
        ri.setReceta(receta);
        RecetaPasos paso = new RecetaPasos();
        paso.setDescripcion("Batir los huevos");
        paso.setReceta(receta);
        RecetaIntolerancia intolerancia = new RecetaIntolerancia();
        intolerancia.setCantidadIntolerancia("Alta");
        intolerancia.setReceta(receta);
        receta.setIngredientes(List.of(ri));
        receta.setAnalyzedInstructions(List.of(paso));
        receta.setIntolerancias(List.of(intolerancia));
        recetaRepository.save(receta);
        Optional<Receta> encontrada = recetaRepository.findByTitulo("Tortilla de Patatas");
        assertThat(encontrada).isPresent();
        assertThat(encontrada.get().getTitulo()).isEqualTo("Tortilla de Patatas");
        assertThat(encontrada.get().getIngredientes()).hasSize(1);
        assertThat(encontrada.get().getAnalyzedInstructions()).hasSize(1);
        assertThat(encontrada.get().getIntolerancias()).hasSize(1);

    }

}