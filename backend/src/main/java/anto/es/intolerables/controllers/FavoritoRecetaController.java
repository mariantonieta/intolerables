package anto.es.intolerables.controllers;

import anto.es.intolerables.dto.FavoritoRecetaDTO;
import anto.es.intolerables.entities.FavoritoReceta;
import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.entities.Usuario;
import anto.es.intolerables.repositories.FavoritoRecetaRepository;
import anto.es.intolerables.repositories.RecetaRepository;
import anto.es.intolerables.services.FavoritoRecetaService;
import anto.es.intolerables.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import utils.BeanCopyUtils;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/favoritos-recetas")
public class FavoritoRecetaController {
    private final FavoritoRecetaService favoritoRecetaService;
    private final UsuarioService usuarioService;
    private final RecetaRepository recetaRepository;
    private final FavoritoRecetaRepository favoritoRepo;


    @GetMapping
    public ResponseEntity<List<FavoritoRecetaDTO>> getFavoritos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nombreUsuario = authentication.getName();

        Usuario usuario = usuarioService.findByNombre(nombreUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<FavoritoReceta> favoritos = favoritoRepo.findByUsuario(usuario);
        List<FavoritoRecetaDTO> dtoList = favoritos.stream()
                .map(FavoritoRecetaDTO::new)
                .toList();

        return ResponseEntity.ok(dtoList);
    }



    @PostMapping
    public ResponseEntity<Map<String, Object>> crearFavorito(@Valid @RequestBody FavoritoReceta favorito) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String nombreUsuario = authentication.getName();
            System.out.println("Usuario autenticado: " + authentication.getName());
            Usuario usuario = usuarioService.findByNombre(nombreUsuario)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (favorito.getReceta() == null || favorito.getReceta().getId() == null) {
                throw new RuntimeException("El objeto receta o su ID es nulo en la petición");
            }

            Receta receta = recetaRepository.findById(favorito.getReceta().getId())
                    .orElseThrow(() -> new RuntimeException("La receta no existe en la base de datos"));

            favorito.setUsuario(usuario);
            favorito.setReceta(receta);

            FavoritoReceta f = favoritoRecetaService.save(favorito);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", f.getId()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarFavorito(@PathVariable Integer id) {
        if (favoritoRecetaService.findById(id).isPresent()) {
            favoritoRecetaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
