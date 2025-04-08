package anto.es.intolerables.services;

import anto.es.intolerables.entities.Restaurante;
import anto.es.intolerables.repositories.RestauranteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RestauranteService {
private final RestauranteRepository repositorio;
public List<Restaurante> findAll(){
    return repositorio.findAll();
}
public Optional<Restaurante> findById(Integer id){
    return repositorio.findById(id);
}
public Restaurante save(Restaurante restaurante){
    return repositorio.save(restaurante);
}
public void delete(Restaurante restaurante){
    repositorio.delete(restaurante);
}
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }}
