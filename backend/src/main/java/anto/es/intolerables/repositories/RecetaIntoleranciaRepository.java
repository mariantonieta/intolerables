package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.RecetaIntolerancia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecetaIntoleranciaRepository extends JpaRepository<RecetaIntolerancia, Integer> {
}
