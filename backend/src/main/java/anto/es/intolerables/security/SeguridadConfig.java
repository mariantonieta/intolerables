package anto.es.intolerables.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SeguridadConfig {
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // asegúrate de usarlo al guardar usuarios
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // lo deshabilitamos para desarrollo y permitir peticiones desde React

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/usuario/register-api", "/usuario/login-api", "/usuario/login", "/api/intolerancias", "api/recetas/buscar", "api/restaurantes", "api/yelp/buscar" ).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/usuario/login") // tu endpoint si querés una vista personalizada
                        .loginProcessingUrl("/login") // Spring Security espera este endpoint
                        .usernameParameter("nombre") // el campo que usás como username
                        .passwordParameter("contrasena") // el campo que usás como password
                        .defaultSuccessUrl("/index", true)
                        .permitAll()

                )

                .logout(logout -> logout
                        .logoutUrl("/usuario/logout")
                        .logoutSuccessUrl("/usuario/login?logout")
                        .permitAll()
                );


        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
