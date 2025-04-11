package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "restaurante_intolerancia")
public class RestauranteIntolerancia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_restaurante_intolerancia")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_restaurante")
    @JsonManagedReference
    private Restaurante restaurante;

    @ManyToOne
    @JoinColumn(name = "id_intolerancia")
    @JsonManagedReference
    private Intolerancia intolerancia;
}
