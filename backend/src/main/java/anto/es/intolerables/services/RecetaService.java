    package anto.es.intolerables.services;

    import anto.es.intolerables.entities.*;
    import anto.es.intolerables.repositories.*;
    import lombok.RequiredArgsConstructor;
    import org.hibernate.Hibernate;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;

    import java.time.LocalDate;
    import java.util.List;
    import java.util.Optional;

    @RequiredArgsConstructor
    @Service
    public class RecetaService {
        private final RecetaRepository recetaRepositorio;
        private final IngredienteRepository ingredienteRepositorio;
        private final RecetaIngredienteRepository recetaIngredienteRepository;
        private final RecetaPasosRepository recetaPasosRepositorio;
        private final RestauranteRepository restauranteRepository;

        @Transactional
        public List<Receta> findAll() {
            return recetaRepositorio.findAll();     }

        public Receta crearReceta(Receta receta) {
            receta.setFechaCreacionReceta(LocalDate.now());

            // Guardamos la receta para obtener su ID
            Receta recetaGuardada = recetaRepositorio.save(receta);

            // Guardamos ingredientes y pasos
            guardarIngredientes(recetaGuardada);
            guardarPasos(recetaGuardada);

            return recetaGuardada;
        }

        private void guardarIngredientes(Receta recetaGuardada) {
            List<RecetaIngrediente> ingredientes = recetaGuardada.getIngredientes();

            if (ingredientes == null || ingredientes.isEmpty()) return;

            for (RecetaIngrediente recetaIngrediente : ingredientes) {
                Ingrediente ingredienteOriginal = recetaIngrediente.getIngrediente();

                if (ingredienteOriginal != null && ingredienteOriginal.getNombre() != null) {
                    // Buscar o crear ingrediente
                    Ingrediente ingrediente = ingredienteRepositorio
                            .findByNombre(ingredienteOriginal.getNombre())
                            .orElseGet(() -> guardarNuevoIngrediente(ingredienteOriginal.getNombre()));

                    // Asociar y guardar la relación
                    recetaIngrediente.setIngrediente(ingrediente);
                    recetaIngrediente.setReceta(recetaGuardada);
                    recetaIngredienteRepository.save(recetaIngrediente);
                } else {
                    System.out.println("RecetaIngrediente sin ingrediente válido");
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
