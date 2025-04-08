package anto.es.intolerables.entities;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name= "restaurante")
public class Restaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_restaurante")
    private Integer id;
    @Column(name = "nombre_restaurante")
    private String nombre;

    @Column(name = "direccion_restaurante")
    private String direccion;
    @Column(name = "categoria_restaurante")
    private String categoria;

    private Double latitud;

    private Double longitud;
    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL)
    private List<ComentarioRestaurante> comentarios;

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL)
    private List<FavoritoRestaurante> favoritos;

}
