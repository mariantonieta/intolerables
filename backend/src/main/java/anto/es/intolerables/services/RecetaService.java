package anto.es.intolerables.services;

import anto.es.intolerables.entities.*;
import anto.es.intolerables.repositories.*;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RecetaService {
    private final RecetaRepository recetaRepositorio;
    private final IngredienteRepository ingredienteRepositorio;
    private final RecetaIngredienteRepository recetaIngredienteRepository;
    private final RecetaPasosRepository recetaPasosRepositorio;

    // Obtiene las recetas incluyendo las intolerancias
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

    public Receta convertirDesdeSpoonacular(Map<String, Object> datosReceta) {
        Receta receta = new Receta();
        receta.setTitulo((String) datosReceta.get("title"));
        receta.setImagen((String) datosReceta.get("image"));
        receta.setDuracionReceta((Integer) datosReceta.get("readyInMinutes"));
        receta.setCalorias((Integer) datosReceta.get("calories"));

        List<Map<String, Object>> ingredientesApi = (List<Map<String, Object>>) datosReceta.get("extendedIngredients");
        List<RecetaIngrediente> ingredientes = ingredientesApi.stream()
                .map(ingredienteMap -> {
                    RecetaIngrediente recetaIngrediente = new RecetaIngrediente();
                    String nombreIngrediente = (String) ingredienteMap.get("name");
                    Ingrediente ingrediente = ingredienteRepositorio.findByNombre(nombreIngrediente)
                            .orElseGet(() -> guardarNuevoIngrediente(nombreIngrediente));
                    recetaIngrediente.setIngrediente(ingrediente);
                    return recetaIngrediente;
                })
                .collect(Collectors.toList());

        receta.setIngredientes(ingredientes);


        List<Map<String, Object>> instruccionesApi = (List<Map<String, Object>>) datosReceta.get("analyzedInstructions");
        List<RecetaPasos> pasos = instruccionesApi.stream()
                .map(instruccionMap -> {
                    RecetaPasos paso = new RecetaPasos();
                    paso.setDescripcion((String) instruccionMap.get("step"));
                    return paso;
                })
                .collect(Collectors.toList());

        receta.setAnalyzedInstructions(pasos);

        return receta;
    }
}
