package anto.es.intolerables.controllers;

import anto.es.intolerables.dto.UsuarioDTO;
import anto.es.intolerables.entities.Usuario;
import anto.es.intolerables.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import utils.BeanCopyUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;

    //contraseña incorrecta me sale
    @PostMapping("/login-api")
    public ResponseEntity<?> loginApi(@RequestBody UsuarioDTO loginRequest) {
        Optional<Usuario> usuarioBD = usuarioService.findByNombre(loginRequest.getNombre());

        if (usuarioBD.isPresent()) {
            Usuario usuario = usuarioBD.get();
            if (passwordEncoder.matches(loginRequest.getContrasena(), usuario.getContrasena())) {
                return ResponseEntity.ok(Map.of(
                        "mensaje", "Login correcto",
                        "usuario", Map.of("id", usuario.getId(), "nombre", usuario.getNombre())
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Contraseña incorrecta"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Usuario no encontrado"));
        }
    }


    @GetMapping("/registro")
    public String registro(Model model) {
        model.addAttribute("usuario", UsuarioDTO.builder().build());
        return "usuario/registro";
    }

    @PostMapping("/register-api")

    public ResponseEntity<?> registerApi(@RequestBody UsuarioDTO usuarioDto) {
        log.info("Datos recibidos: {}", usuarioDto);
        Optional<Usuario> usuarioBD = usuarioService.findByNombre(usuarioDto.getNombre());

        if (usuarioBD.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Ya existe un usuario con ese nombre"));
        }

        Usuario usuario = Usuario.builder()
                .nombre(usuarioDto.getNombre())
                .contrasena(passwordEncoder.encode(usuarioDto.getContrasena()))
                .paisUsuario(usuarioDto.getPaisUsuario())
                .ciudadUsuario(usuarioDto.getCiudad())
                .fechaRegistro(LocalDate.now())
                .build();

        usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("mensaje", "Usuario registrado con éxito"));
    }
}


    /*

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Integer id) {
        try {
            return usuarioService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearUsuario(@Valid @RequestBody Usuario usuario) {
        try {
            Usuario u = usuarioService.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", u.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Integer id) {
        try {
            Optional<Usuario> usuario = usuarioService.findById(id);
            if (usuario.isPresent()) {
                usuarioService.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> reemplazarUsuario(@PathVariable Integer id,
                                               @Valid @RequestBody Usuario usuario) {
        try {
            if (usuarioService.findById(id).isPresent()) {
                usuarioService.save(usuario);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Integer id,
                                               @Valid @RequestBody Usuario usuario) {
        try {
            Optional<Usuario> usuarioDB = usuarioService.findById(id);
            if (usuarioDB.isPresent()) {
                BeanCopyUtils.copyNonNullProperties(usuario, usuarioDB.get());
                usuarioService.save(usuarioDB.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

 */
