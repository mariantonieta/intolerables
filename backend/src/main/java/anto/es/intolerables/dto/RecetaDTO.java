package anto.es.intolerables.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class RecetaDTO {
    private Integer id;
    private String title;
    private String summary;
    private Integer calories;
    private Integer readyInMinutes;
    private String image;
    private List<PasoPreparacionDTO> pasosPreparacion;
    private List<IngredienteDTO> recetaIngredientes;

}
