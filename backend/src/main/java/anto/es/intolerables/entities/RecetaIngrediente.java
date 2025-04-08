package anto.es.intolerables.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "receta_ingrediente")
public class RecetaIngrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer id;

    private String cantidad;

    @ManyToOne
    @JoinColumn(name = "id_receta", referencedColumnName = "id_receta")
    private Receta receta;

    @ManyToOne
    @JoinColumn(name = "id_ingredientes")
    private Ingrediente ingrediente;

}
