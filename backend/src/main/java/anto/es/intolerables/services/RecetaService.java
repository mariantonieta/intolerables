package anto.es.intolerables.services;

import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.repositories.RecetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RecetaService {
    private final RecetaRepository repositorio;
    public List<Receta> findAll(){
        return repositorio.findAll();
    }
    public Optional<Receta> findById(Integer id){
        return repositorio.findById(id);
    }
    public Receta save(Receta receta){
        return repositorio.save(receta);
    }
    public void delete(Receta receta){
        repositorio.delete(receta);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }

}
