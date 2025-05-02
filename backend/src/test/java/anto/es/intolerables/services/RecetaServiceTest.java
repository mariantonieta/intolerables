package anto.es.intolerables.services;

import anto.es.intolerables.entities.Ingrediente;
import anto.es.intolerables.entities.Receta;
import anto.es.intolerables.entities.RecetaIngrediente;
import anto.es.intolerables.repositories.IngredienteRepository;
import anto.es.intolerables.repositories.RecetaIngredienteRepository;
import anto.es.intolerables.repositories.RecetaPasosRepository;
import anto.es.intolerables.repositories.RecetaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RecetaServiceTest {

    @Mock private RecetaRepository recetaRepositorio;
    @Mock private IngredienteRepository ingredienteRepositorio;
    @Mock private RecetaIngredienteRepository recetaIngredienteRepository;
    @Mock private RecetaPasosRepository recetaPasosRepositorio;
    @InjectMocks
    private RecetaService recetaService;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testObtenerTodasLasRecetas() {
        Receta receta = new Receta();
        receta.setIntolerancias(new ArrayList<>());
        when(recetaRepositorio.findAll()).thenReturn(List.of(receta));

        List<Receta> recetas = recetaService.obtenerTodasLasRecetas();

        assertEquals(1, recetas.size());
        verify(recetaRepositorio).findAll();
    }


    @Test
    void crearReceta() {
        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setNombre("Tomate");

        RecetaIngrediente recetaIngrediente = new RecetaIngrediente();
        recetaIngrediente.setIngrediente(ingrediente);

        Receta receta = new Receta();
        receta.setIngredientes(List.of(recetaIngrediente));
        receta.setAnalyzedInstructions(new ArrayList<>());

        when(recetaRepositorio.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(ingredienteRepositorio.findByNombre("Tomate")).thenReturn(Optional.of(ingrediente));

        Receta resultado = recetaService.crearReceta(receta);

        assertNotNull(resultado.getFechaCreacionReceta());
        verify(recetaRepositorio).save(any());
        verify(recetaIngredienteRepository).save(any());
    }

    @Test
    void convertirDesdeSpoonacular() {
        Map<String, Object> datos = Map.of(
                "title", "Ensalada",
                "image", "url_imagen",
                "readyInMinutes", 10,
                "calories", 200,
                "extendedIngredients", List.of(
                        Map.of("name", "Lechuga")
                ),
                "analyzedInstructions", List.of(
                        Map.of("step", "Cortar la lechuga")
                )
        );

        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setNombre("Lechuga");

        when(ingredienteRepositorio.findByNombre("Lechuga")).thenReturn(Optional.of(ingrediente));

        Receta receta = recetaService.convertirDesdeSpoonacular(datos);

        assertEquals("Ensalada", receta.getTitulo());
        assertEquals(1, receta.getIngredientes().size());
        assertEquals("Lechuga", receta.getIngredientes().get(0).getIngrediente().getNombre());
        assertEquals("Cortar la lechuga", receta.getAnalyzedInstructions().get(0).getDescripcion());

    }
}