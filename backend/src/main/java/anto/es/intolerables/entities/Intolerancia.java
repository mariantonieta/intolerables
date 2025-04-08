package anto.es.intolerables.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity

@Getter
@Setter
@Table(name = "intolerancia")
public class Intolerancia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_intolerancia")
    private Integer id;

    @Column(name="nombre_intolerancia")
    private String nombre;

    @Column(name="descripcion_intolerancia")
    private String descripcion;

    @OneToMany(mappedBy = "intolerancia")
    private List<RecetaIntolerancia> recetas;

    @OneToMany(mappedBy = "intolerancia")
    private List<UsuarioIntolerancia> usuarios;
}

