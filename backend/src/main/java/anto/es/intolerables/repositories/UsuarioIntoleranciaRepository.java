package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.UsuarioIntolerancia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioIntoleranciaRepository extends JpaRepository<UsuarioIntolerancia, Integer> {
}
