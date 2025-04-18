package anto.es.intolerables.services;

import anto.es.intolerables.entities.Usuario;
import anto.es.intolerables.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository repositorio;
public Optional<Usuario> findByNombre(String nombre) {
    return repositorio.findByNombre(nombre);
}
    public List<Usuario> findAll() {
        return repositorio.findAll();
    }

    public Optional<Usuario> findById(Integer id) {
        return repositorio.findById(id);
    }

    public Usuario save(Usuario usuario) {
        return repositorio.save(usuario);
    }

    public void delete(Usuario usuario) {
        repositorio.delete(usuario);
    }

    public void deleteById(Integer id) {
        repositorio.deleteById(id);
    }
}