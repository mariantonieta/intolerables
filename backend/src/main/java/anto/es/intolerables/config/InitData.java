package anto.es.intolerables.config;

import anto.es.intolerables.entities.Intolerancia;
import anto.es.intolerables.repositories.IntoleranciaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class InitData {

    @Bean
    CommandLineRunner loadIntolerancias(IntoleranciaRepository repository) {
        return args -> {
            repository.saveAll(List.of(
                    new Intolerancia(1, "Intolerancia a la fructosa",
                            "Evitar frutas con alto contenido de fructosa, miel, y productos procesados con jarabe de maíz alto en fructosa.",
                            "Consulta con un nutricionista para crear un plan alimenticio personalizado.",
                            "No estás solo, ¡cada paso hacia una vida saludable cuenta!",
                            "/icons/fructosa.svg"),

                    new Intolerancia(2, "Alergia a los frutos secos",
                            "Evitar nueces, almendras, avellanas, anacardos, pistachos y productos con trazas.",
                            "Lee etiquetas y consulta siempre en restaurantes.",
                            "Cuidarte es una forma poderosa de amor propio ❤",
                            "/icons/frutosecos.svg"),

                    new Intolerancia(3, "Intolerancia al gluten",
                            "Evitar trigo, cebada, centeno y alimentos procesados con gluten.",
                            "Busca productos certificados sin gluten.",
                            "Tu salud es la base para construir grandes sueños",
                            "/icons/gluten.svg"),

                    new Intolerancia(4, "Alergia o intolerancia a los huevos",
                            "Evitar huevos y alimentos que los contengan como pasteles, salsas, pastas.",
                            "Usa sustitutos como chía o linaza.",
                            "Cocinar sin huevo puede ser creativo y delicioso",
                            "/icons/huevos.svg"),

                    new Intolerancia(5, "Intolerancia a la lactosa",
                            "Evitar leche y derivados como yogur, queso o helado no deslactosado.",
                            "Prefiere productos vegetales o deslactosados.",
                            "Sentirte bien empieza con decisiones sabias y conscientes",
                            "/icons/lactosa.svg"),

                    new Intolerancia(6, "Alergia a los mariscos",
                            "Evitar camarones, langostinos, cangrejos, mejillones y otros mariscos.",
                            "Ten precaución con platos preparados fuera de casa.",
                            "Tu bienestar siempre debe ser prioridad en tu menú",
                            "/icons/mariscos.svg"),

                    new Intolerancia(7, "Intolerancia o alergia a la soja",
                            "Evitar tofu, salsa de soja, leche de soja, productos industriales con soja.",
                            "Lee siempre los ingredientes.",
                            "Paso a paso, cuida tu cuerpo y mente",
                            "/icons/soja.svg"),

                    new Intolerancia(8, "Dieta vegana",
                            "Exclusión total de carne, leche, huevos y miel.",
                            "Elige productos 100% vegetales.",
                            "Tu elección puede cambiar el mundo y tu vida-",
                            "/icons/veganos.svg")
            ));
        };
    }
}
