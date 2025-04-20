package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "receta_intolerancia")
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
    @JoinColumn(name = "id_receta")
    @JsonBackReference("receta-intolerancias")
    private Receta receta;

    @ManyToOne
    @JoinColumn(name = "id_intolerancia")
    private Intolerancia intolerancia;

}
