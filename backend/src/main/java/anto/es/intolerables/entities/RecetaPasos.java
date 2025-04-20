package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "receta_pasos")
public class RecetaPasos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_receta")
    @JsonBackReference("receta-pasos")
    private Receta receta;
}
