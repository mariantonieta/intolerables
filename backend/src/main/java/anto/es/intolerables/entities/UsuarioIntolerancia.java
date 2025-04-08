package anto.es.intolerables.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "usuario_intolerancia")
public class UsuarioIntolerancia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario_intolerancia")
    private Integer id;
    @Column(name = "numero_intolerancia")

    private String numeroIntolerancia;
    @ManyToOne
    @JoinColumn(name= "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name= "id_intolerancia")
    private Intolerancia intolerancia;


}
