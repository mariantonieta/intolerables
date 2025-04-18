package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.ComentarioReceta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRecetaRepository extends JpaRepository<ComentarioReceta, Integer> {
}
