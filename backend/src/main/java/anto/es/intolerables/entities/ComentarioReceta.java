package anto.es.intolerables.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name="comentario_receta")
public class ComentarioReceta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_comentario_receta")
    private Integer id;

    @Column(name="descripcion_comentario")
    private String descripcionComentario;

    @Column(name="fecha_comentario_recceta")
    private LocalDate fechaComentario;

    private String resenia;
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_receta")
    private Receta receta;
}
