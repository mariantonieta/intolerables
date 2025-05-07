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

        @Column(name = "title")
        private String title;

        @Column(name = "summary")
        private String summary;

        @Column(name = "calories")
        private Integer calories;

        @Column(name = "ready_in_minutes")
        private Integer readyInMinutes;

        @Column(name = "image")
        private String image;

        @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
        private List<PasoPreparacion> pasosPreparacion;

        @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
        private List<Ingrediente> ingredientes;
    }

