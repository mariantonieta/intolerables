    package anto.es.intolerables.services;

    import anto.es.intolerables.entities.Ingrediente;
    import anto.es.intolerables.entities.Receta;
    import anto.es.intolerables.entities.RecetaIngrediente;
    import lombok.RequiredArgsConstructor;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.stereotype.Service;
    import org.springframework.web.client.RestTemplate;
    import org.springframework.web.util.UriComponentsBuilder;

    import java.time.LocalDate;
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;

    @Service
    @RequiredArgsConstructor
    public class SpooncularService {
        private final RestTemplate restTemplate = new RestTemplate();

        @Value("${spoonacular.api.key}")
        private String spooncularApiKey;

        private static final String BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

        public List<Map<String, Object>> buscarRecetasPorIntolerancia(String intolerancia, String query) {
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                    .queryParam("intolerances", intolerancia)
                    .queryParam("addRecipeInformation", "true")
                    .queryParam("number", 10)
                    .queryParam("apiKey", spooncularApiKey);

            if (query != null && !query.trim().isEmpty()) {
                builder.queryParam("query", query);
            }

            String url = builder.toUriString();
            System.out.println("URL SPOONACULAR: " + url);

            Map response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

            List<Map<String, Object>> recetasList = new ArrayList<>();

            for (Map<String, Object> item : results) {
                int recetaId = (int) item.get("id");
                // Aquí definimos el detalleUrl dentro del bucle.
                String detalleUrl = "https://api.spoonacular.com/recipes/" + recetaId + "/information?includeNutrition=false&apiKey=" + spooncularApiKey;
                Map detalle = restTemplate.getForObject(detalleUrl, Map.class);
                System.out.println("Detalle: " + detalle);

                Map<String, Object> recetaMap = new HashMap<>();
                recetaMap.put("title", item.get("title"));
                recetaMap.put("image", item.get("image"));
                recetaMap.put("readyInMinutes", item.getOrDefault("readyInMinutes", 0));
                recetaMap.put("calories", extraerCaloriasDesdeSummary((String) item.get("summary")));
                recetaMap.put("summary", item.get("summary"));

                // extendedIngredients
                List<Map<String, String>> ingredientesList = new ArrayList<>();
                List<Map<String, Object>> ingredientesRaw = (List<Map<String, Object>>) detalle.get("extendedIngredients");

                if (ingredientesRaw != null) {
                    for (Map<String, Object> ing : ingredientesRaw) {
                        Map<String, String> ingMap = new HashMap<>();
                        ingMap.put("original", (String) ing.get("original"));
                        ingredientesList.add(ingMap);
                    }
                }
                recetaMap.put("extendedIngredients", ingredientesList);

                // analyzedInstructions
                List<Map<String, Object>> instruccionesList = new ArrayList<>();
                List<Map<String, Object>> instruccionesRaw = (List<Map<String, Object>>) detalle.get("analyzedInstructions");
                if (instruccionesRaw != null && !instruccionesRaw.isEmpty()) {
                    instruccionesList.add(instruccionesRaw.get(0)); // Tomamos solo la primera
                } else {
                    instruccionesList.add(Map.of("steps", List.of(Map.of("step", "Sin pasos disponibles"))));
                }
                recetaMap.put("analyzedInstructions", instruccionesList);

                recetasList.add(recetaMap);
            }

            return recetasList;
        }

        private int extraerCaloriasDesdeSummary(String summary) {
            if (summary == null) return 0;
            Pattern pattern = Pattern.compile("(\\d+) calories");
            Matcher matcher = pattern.matcher(summary.toLowerCase());
            if (matcher.find()) {
                return Integer.parseInt(matcher.group(1));
            }
            return 0;
        }
    }
