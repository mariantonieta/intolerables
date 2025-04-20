    package anto.es.intolerables.entities;

    import com.fasterxml.jackson.annotation.JsonManagedReference;
    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;

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

        @Column(name="fecha_creacion_receta")
        private LocalDate fechaCreacionReceta;

        @Column(name="duracion_receta")
        private Integer duracionReceta;

        @Column(name="calorias_receta")
        private Integer calorias;
        //evita errores o datos vacios
        @PrePersist
        public void prePersist() {
            if (this.calorias == null) {
                this.calorias = 0;
            }
        }

        @Column(name="tipo_receta")
        private String tipoReceta;

        @OneToMany(mappedBy = "receta", fetch = FetchType.EAGER)  // EAGER para ingredientes
        @JsonManagedReference("receta-ingrediente")
        private List<RecetaIngrediente> ingredientes;

        @OneToMany(mappedBy = "receta", fetch = FetchType.EAGER)
        @JsonManagedReference("receta-intolerancias")
         private List<RecetaIntolerancia> intolerancias;

        @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
        @JsonManagedReference("receta-pasos")
        private List<RecetaPasos> analyzedInstructions;
    }
