package anto.es.intolerables.services;

import anto.es.intolerables.entities.ComentarioRestaurante;
import anto.es.intolerables.repositories.ComentarioRestauranteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class ComentarioRestauranteService {
    private final ComentarioRestauranteRepository repositorio;
    public List<ComentarioRestaurante> findAll(){
        return repositorio.findAll();
    }
    public Optional<ComentarioRestaurante> findById(Integer id){
        return repositorio.findById(id);
    }
    public ComentarioRestaurante save(ComentarioRestaurante comentarioRestaurante){
        return repositorio.save(comentarioRestaurante);
    }
    public void delete(ComentarioRestaurante comentarioRestaurante){
        repositorio.delete(comentarioRestaurante);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}
