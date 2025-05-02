package anto.es.intolerables;

import anto.es.intolerables.controllers.YepController;
import anto.es.intolerables.repositories.RestauranteRepository;
import anto.es.intolerables.security.jwt.JwtAuthFilter;
import anto.es.intolerables.security.jwt.JwtTokenProvider;
import anto.es.intolerables.services.YelpService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import static org.mockito.Mockito.mock;

@Configuration
@Import(YepController.class) // Importamos YepController para que esté disponible en la prueba
 class MockConfig {
    @Bean
    public YelpService yelpService() {
        return mock(YelpService.class);
    }

    @Bean
    public RestauranteRepository restauranteRepository() {
        return mock(RestauranteRepository.class);
    }

    @Bean
    public JwtAuthFilter jwtAuthFilter() {
        return mock(JwtAuthFilter.class);
    }

    @Bean
    public JwtTokenProvider jwtTokenProvider() {
        return mock(JwtTokenProvider.class);
    }
}
