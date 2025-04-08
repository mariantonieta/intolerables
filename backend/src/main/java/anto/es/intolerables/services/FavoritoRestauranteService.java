package anto.es.intolerables.services;
import anto.es.intolerables.entities.FavoritoRestaurante;
import anto.es.intolerables.repositories.FavoritoRestauranteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class FavoritoRestauranteService {
    private final FavoritoRestauranteRepository repositorio;
    public List<FavoritoRestaurante> findAll(){
        return repositorio.findAll();
    }
    public Optional<FavoritoRestaurante> findById(Integer id){
        return repositorio.findById(id);
    }
    public FavoritoRestaurante save(FavoritoRestaurante favoritoRestaurante){
        return repositorio.save(favoritoRestaurante);
    }
    public void delete(FavoritoRestaurante favoritoRestaurante){
        repositorio.delete(favoritoRestaurante);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}
