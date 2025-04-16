package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @Column(length = 1200)
    private  String detalles;
    private  String mensaje;

    private String imagen;
    @OneToMany(mappedBy = "intolerancia")
    @JsonBackReference
    private List<RecetaIntolerancia> recetas;

    @OneToMany(mappedBy = "intolerancia")
    @JsonBackReference
    private List<UsuarioIntolerancia> usuarios;
    @OneToMany(mappedBy = "intolerancia", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<RestauranteIntolerancia> restaurantes;

}

