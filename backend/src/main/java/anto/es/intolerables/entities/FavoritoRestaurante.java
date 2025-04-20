package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name="favorito_restaurante")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class FavoritoRestaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_favorito_restaurante")
    private Integer id;
    @Column(name="fecha_favorito_restaurante", nullable = false)
    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonBackReference("usuario-favoritos")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_restaurante", nullable = false)
    @JsonBackReference(value = "favorito-restaurante")
    private Restaurante restaurante;
}
