package anto.es.intolerables.entities;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
@Builder
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Table(name="usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer id;

    @Column(name = "nombre_usuario")
    private String nombre;

    @Column(name = "contraseña_usuario")
    private String contrasena;

    @Column(name = "fecha_registro_usuario")
    private LocalDate fechaRegistro;

    @Column(name = "pais_usuario")
    private String paisUsuario;

    @Column(name = "ciudad_usuario")
    private String ciudadUsuario;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    //maneja la serializacion desde el usuario, y asegura que se serealicen los objtos
    @JsonManagedReference(value = "usuario-favoritos")
    private List<FavoritoRestaurante> favoritos;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "usuario-favoritos-recetas") // Identificador único para recetas
    private List<FavoritoReceta> favorito;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "usuario-intolerancias")
    private List<UsuarioIntolerancia> intolerancias;
}
