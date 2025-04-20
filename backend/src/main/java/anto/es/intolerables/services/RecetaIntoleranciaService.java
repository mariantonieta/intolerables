package anto.es.intolerables.services;

import anto.es.intolerables.entities.RecetaIntolerancia;
import anto.es.intolerables.repositories.RecetaIntoleranciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class RecetaIntoleranciaService {
    private final RecetaIntoleranciaRepository repositorio;
    public List<RecetaIntolerancia> findAll(){
        return repositorio.findAll();
    }
    public Optional<RecetaIntolerancia> findById(Integer id){
        return repositorio.findById(id);
    }
    public RecetaIntolerancia save(RecetaIntolerancia recetaIntolerancia){
        return repositorio.save(recetaIntolerancia);
    }
    public void delete(RecetaIntolerancia recetaIntolerancia){
        repositorio.delete(recetaIntolerancia);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}
