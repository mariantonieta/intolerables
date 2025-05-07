package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.Ingrediente;
import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.entities.RecetaIntolerancia;
import anto.es.intolerables.entities.PasoPreparacion;
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
        receta.setTitle("Tortilla de Patatas");
        receta.setImage("tortilla.jpg");
        receta.setReadyInMinutes(60);
        receta.setCalories(300);
        receta.setSummary("Sin gluten");

        Ingrediente ri = new Ingrediente();
        ri.setNombre("Cebolla");
        ri.setCantidad("1 unidades");
        ri.setReceta(receta);
        PasoPreparacion paso = new PasoPreparacion();
        paso.setDescripcion("Batir los huevos");
        paso.setReceta(receta);
        receta.setIngredientes(List.of(ri));
        receta.setPasosPreparacion(List.of(paso));

        recetaRepository.save(receta);
        Optional<Receta> encontrada = recetaRepository.findByTitle("Tortilla de Patatas");
        assertThat(encontrada).isPresent();
        assertThat(encontrada.get().getTitle()).isEqualTo("Tortilla de Patatas");
        assertThat(encontrada.get().getIngredientes()).hasSize(1);
        assertThat(encontrada.get().getPasosPreparacion()).hasSize(1);


    }

}