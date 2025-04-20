package anto.es.intolerables.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity

@Getter
@Setter
@Table(name="ingredientes")
public class Ingrediente {
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="id_ingredientes")
private Integer id;
    @Column(name="nombre_ingrediente")
    private String nombre;

    @OneToMany(mappedBy = "ingrediente")
    private List<RecetaIngrediente> recetas;

}
