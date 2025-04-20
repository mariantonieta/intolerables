package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonBackReference("receta-ingrediente")
    private Receta receta;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "id_ingredientes")
    @JsonIgnore
    private Ingrediente ingrediente;

}
