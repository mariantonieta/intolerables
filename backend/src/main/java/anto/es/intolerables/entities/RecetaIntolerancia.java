package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table

@Getter
@Setter
public class RecetaIntolerancia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_receta_intolerancia")
    private Integer id;
    @Column(name = "cantidad_intolerancia")
    private String cantidadIntolerancia;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "id_receta")
    private Receta receta;

    @ManyToOne
    @JoinColumn(name = "id_intolerancia")
    @JsonManagedReference
    private Intolerancia intolerancia;



}
