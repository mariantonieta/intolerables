    package anto.es.intolerables.services;

    import anto.es.intolerables.entities.*;
    import anto.es.intolerables.repositories.*;
    import lombok.RequiredArgsConstructor;
    import org.hibernate.Hibernate;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;

    import java.time.LocalDate;
    import java.util.List;

    @RequiredArgsConstructor
    @Service
    public class RecetaService {
        private final RecetaRepository recetaRepositorio;
        private final IngredienteRepository ingredienteRepositorio;
        private final RecetaIngredienteRepository recetaIngredienteRepository;
        private final RecetaPasosRepository recetaPasosRepositorio;
//obtine las recetas incluyendo las intolerancias
        @Transactional
        public List<Receta> obtenerTodasLasRecetas() {
            List<Receta> recetas = recetaRepositorio.findAll();
            recetas.forEach(receta -> Hibernate.initialize(receta.getIntolerancias()));
            return recetas;
        }

        public Receta crearReceta(Receta receta) {
            receta.setFechaCreacionReceta(LocalDate.now());
            Receta recetaGuardada = recetaRepositorio.save(receta);

            guardarIngredientes(recetaGuardada);
            guardarPasos(recetaGuardada);

            return recetaGuardada;
        }
//guarda los ingrecientes para crearReceta
        private void guardarIngredientes(Receta recetaGuardada) {
            List<RecetaIngrediente> ingredientes = recetaGuardada.getIngredientes();

            if (ingredientes == null || ingredientes.isEmpty()) return;

            for (RecetaIngrediente recetaIngrediente : ingredientes) {
                Ingrediente ingredienteOriginal = recetaIngrediente.getIngrediente();

                if (ingredienteOriginal != null && ingredienteOriginal.getNombre() != null) {

                    Ingrediente ingrediente = ingredienteRepositorio
                            .findByNombre(ingredienteOriginal.getNombre())
                            .orElseGet(() -> guardarNuevoIngrediente(ingredienteOriginal.getNombre()));

                    recetaIngrediente.setIngrediente(ingrediente);
                    recetaIngrediente.setReceta(recetaGuardada);
                    recetaIngredienteRepository.save(recetaIngrediente);
                } else {
                    System.out.println("RecetaIngrediente sin ingrediente");
                }
            }
        }

        private Ingrediente guardarNuevoIngrediente(String nombreIngrediente) {
            Ingrediente nuevo = new Ingrediente();
            nuevo.setNombre(nombreIngrediente);
            return ingredienteRepositorio.save(nuevo);
        }

        private void guardarPasos(Receta recetaGuardada) {
            List<RecetaPasos> pasos = recetaGuardada.getAnalyzedInstructions();

            if (pasos == null || pasos.isEmpty()) return;

            for (RecetaPasos paso : pasos) {
                paso.setReceta(recetaGuardada);
                recetaPasosRepositorio.save(paso);
            }
        }

    }
