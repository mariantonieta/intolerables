package anto.es.intolerables.services;

import anto.es.intolerables.entities.Ingrediente;
import anto.es.intolerables.repositories.IngredienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IngredienteService {
    private final IngredienteRepository repositorio;
    public List<Ingrediente> findAll(){
        return repositorio.findAll();
    }
    public Optional<Ingrediente> findById(Integer id){
        return repositorio.findById(id);
    }
    public Ingrediente save(Ingrediente ingrediente){
        return repositorio.save(ingrediente);
    }
    public void delete(Ingrediente ingrediente){
        repositorio.delete(ingrediente);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}
