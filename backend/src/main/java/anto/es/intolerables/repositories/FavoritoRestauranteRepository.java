package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.FavoritoRestaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRestauranteRepository extends JpaRepository<FavoritoRestaurante, Integer> {
}
