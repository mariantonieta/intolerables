package anto.es.intolerables.services;

import anto.es.intolerables.entities.RecetaIngrediente;
import anto.es.intolerables.repositories.RecetaIngredienteRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class RecetaIngredienteService {
    private final RecetaIngredienteRepository repositorio;
    public List<RecetaIngrediente> findAll(){
        return repositorio.findAll();
    }
    public Optional<RecetaIngrediente> findById(Integer id){
        return repositorio.findById(id);
    }
    public RecetaIngrediente save(RecetaIngrediente RecetaIngrediente){
        return repositorio.save(RecetaIngrediente);
    }
    public void delete(RecetaIngrediente RecetaIngrediente){
        repositorio.delete(RecetaIngrediente);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}
