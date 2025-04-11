package anto.es.intolerables.services;

import anto.es.intolerables.entities.Intolerancia;
import anto.es.intolerables.repositories.IntoleranciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class IntoleranciaService {
    private final IntoleranciaRepository repositorio;
    public List<Intolerancia> findAll(){
        return repositorio.findAll();
    }
    public Optional<Intolerancia> findById(Integer id){
        return repositorio.findById(id);
    }
    public Intolerancia save(Intolerancia intolerancia){


        return repositorio.save(intolerancia);
    }
    public void delete(Intolerancia intolerancia){
        repositorio.delete(intolerancia);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}
