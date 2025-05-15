package anto.es.intolerables.dto;

public class PasoPreparacionDTO {
    private String descripcion;

    // Constructor
    public PasoPreparacionDTO(String descripcion) {
        this.descripcion = descripcion;
    }

    // Getters y Setters manuales
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
