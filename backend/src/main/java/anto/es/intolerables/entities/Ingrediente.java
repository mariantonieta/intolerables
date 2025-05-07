package anto.es.intolerables.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name="ingrediente")
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingrediente")
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "cantidad", nullable = false)
    private String cantidad;

    @ManyToOne
    @JoinColumn(name = "id_receta")
    private Receta receta;
}
