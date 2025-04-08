package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.RecetaIngrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecetaIngredienteRepository extends JpaRepository<RecetaIngrediente, Integer> {
}
