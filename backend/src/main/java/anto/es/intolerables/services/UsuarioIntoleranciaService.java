package anto.es.intolerables.services;

import anto.es.intolerables.entities.UsuarioIntolerancia;
import anto.es.intolerables.repositories.UsuarioIntoleranciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UsuarioIntoleranciaService {
    private final UsuarioIntoleranciaRepository repositorio;
    public List<UsuarioIntolerancia> findAll(){
        return repositorio.findAll();
    }
    public Optional<UsuarioIntolerancia> findById(Integer id){
        return repositorio.findById(id);
    }
    public UsuarioIntolerancia save(UsuarioIntolerancia usuarioIntolerancia){
        return repositorio.save(usuarioIntolerancia);
    }
    public void delete(UsuarioIntolerancia usuarioIntolerancia){
        repositorio.delete(usuarioIntolerancia);
    }
    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}
