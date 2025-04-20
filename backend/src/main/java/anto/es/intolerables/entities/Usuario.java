package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
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
    @JsonManagedReference(value = "usuario-favoritos")
    private List<FavoritoRestaurante> favoritos;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "usuario-intolerancias")
    private List<UsuarioIntolerancia> intolerancias;
}
