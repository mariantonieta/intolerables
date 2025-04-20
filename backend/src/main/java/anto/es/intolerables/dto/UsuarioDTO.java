package anto.es.intolerables.dto;

import anto.es.intolerables.contraints.PasswordIgual;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@PasswordIgual
public class UsuarioDTO {
    @NotNull
    @NotEmpty
    private String nombre;
    private String contrasena;

    @NotNull
    @NotEmpty
    private String contrasenaConfirm;
    private String paisUsuario;
    private String ciudad;


}
