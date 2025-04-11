package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Getter
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
    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    private List<ComentarioRestaurante> comentarios;

    @OneToMany(mappedBy = "usuario")
    @JsonManagedReference
    private List<FavoritoRestaurante> favoritos;

    @OneToMany(mappedBy = "usuario")
    private List<UsuarioIntolerancia> intolerancias;
}
