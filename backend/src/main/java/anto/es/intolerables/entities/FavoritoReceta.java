package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name="favorito_receta")
public class FavoritoReceta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_favorito_receta")
    private Integer id;

    @Column(name="fecha_favorito")
    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonBackReference(value = "usuario-favoritos-recetas") // Debe coincidir con el de Usuario
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_receta")
    private Receta receta;
}
