package anto.es.intolerables.services;

import anto.es.intolerables.entities.ComentarioReceta;
import anto.es.intolerables.repositories.ComentarioRecetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class ComentarioRecetaService {

    private final ComentarioRecetaRepository repositorio;
    public List<ComentarioReceta> findAll(){
        return repositorio.findAll();
    }
    public Optional<ComentarioReceta> findById(Integer id){
        return repositorio.findById(id);
    }
    public ComentarioReceta save(ComentarioReceta comentarioReceta){
        return repositorio.save(comentarioReceta);
    }
    public void delete(ComentarioReceta comentarioReceta){
        repositorio.delete(comentarioReceta);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}
