package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.ComentarioRestaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRestauranteRepository extends JpaRepository<ComentarioRestaurante, Integer> {
}
