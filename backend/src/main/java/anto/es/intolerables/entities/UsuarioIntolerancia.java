package anto.es.intolerables.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
    //relacion muchos a uno
    //utilizo JsonBackReference para evitar la serializacion recursiva
    @ManyToOne
    @JoinColumn(name= "id_usuario")
    @JsonBackReference("usuario-intolerancias")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name= "id_intolerancia")
    @JsonBackReference("intolerancia-usuarios")
    private Intolerancia intolerancia;


}
