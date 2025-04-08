package anto.es.intolerables.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.w3c.dom.stylesheets.LinkStyle;

import java.time.LocalDate;
import java.util.List;

@Entity

@Getter
@Setter
@Table(name = "receta")

public class Receta {
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "id_receta")
    private Integer id;
    @Column(name="titulo_receta")
    private String titulo;
    @Column(name="imagen_receta")
    private String imagen;
    @Column(name="descripcion_receta")
    private String descripcion;
    @Column(name="fecha_creacion_receta")
    private LocalDate fechaCreacionReceta;
    @Column(name="duracion_receta")
    private Integer duracionReceta;
    @Column(name="calorias_receta")
    private Integer calorias;
    @Column(name="tipo_receta")
    private String tipoReceta;
    @OneToMany(mappedBy = "receta")
    private List<RecetaIngrediente> ingredientes;

    @OneToMany(mappedBy = "receta")
    private List<RecetaIntolerancia> intolerancias;
}
