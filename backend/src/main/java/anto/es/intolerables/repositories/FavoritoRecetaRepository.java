package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.FavoritoReceta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRecetaRepository extends JpaRepository<FavoritoReceta, Integer> {
}
