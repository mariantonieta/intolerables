package anto.es.intolerables.entities;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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

    private String imagen;

    private String url;

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "restaurante-intolerancias")
    private List<RestauranteIntolerancia> intolerancias;


    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "favorito-restaurante")
    private List<FavoritoRestaurante> favoritos;
}
