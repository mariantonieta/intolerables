package anto.es.intolerables.repositories;

import anto.es.intolerables.entities.ComentarioReceta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Repository
public interface ComentarioRecetaRepository extends JpaRepository<ComentarioReceta, Integer> {
    List<ComentarioReceta> findByRecetaId(Integer recetaId);
}
