package anto.es.intolerables.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="comentario_restaurante")
public class ComentarioRestaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_comentario_restaurante")
    private Integer id;

    @Column(name="descripcion_comentario")
    private String descripcionComentario;

    @Column(name="fecha_comentario")
    private LocalDate fechaComentario;

    private String resenia;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonBackReference
    private Usuario usuario;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_restaurante")
    private Restaurante restaurante;
}
