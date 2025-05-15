### Documentación de Intolerables

# Objetivo de la Aplicación
La aplicación Intolerables ayuda a personas con intolerancias alimentarias a encontrar restaurantes y recetas compatibles, integrando servicios externos como Yelp y Spoonacular, y permitiendo a los usuarios guardar preferencias y gestionar sus intolerancias.

# Componentes Principales
1.  **Autenticación y Seguridad:**
   * Utiliza JWT para autenticación y autorización.
   * `JwtTokenProvider`: Genera, valida y extrae tokens JWT.
   * `JwtAuthFilter`: Valida tokens JWT en las solicitudes HTTP.
   * `CustomUserDetailsService`: Carga detalles del usuario para la autenticación.
   * `SeguridadConfig`: Configura políticas de seguridad, CORS, sesiones y autorización de endpoints.

2.  **Gestión de Usuarios:**
   * Los usuarios se registran con nombre y contraseña (cifrada) y se autentican con JWT.
   * `Usuario`: Entidad para la información del usuario.
   * `UsuarioDTO`: DTO para transferir datos de usuario.

3.  **Gestión de Intolerancias Alimentarias:**
   * Los usuarios gestionan sus intolerancias (crear, ver, eliminar), almacenadas en la base de datos.
   * `Intolerancia`: Entidad para la información de la intolerancia.
   * `IntoleranciaService`: Gestiona las operaciones CRUD de las intolerancias y su asociación con usuarios.
   * `IntoleranciaDTO`: DTO para transferir datos de intolerancias.

4.  **Restaurantes y Recetas:**
   * `FavoritoRestaurante`: Permite a los usuarios marcar restaurantes como favoritos.
   * `YelpService`: Se conecta a la API de Yelp para obtener información de restaurantes según intolerancias, ubicación y tipo de comida.
   * `Receta`: Entidad para la información de recetas compatibles con intolerancias.
   * `SpoonacularService`: Se conecta a la API de Spoonacular para buscar recetas adaptadas a las intolerancias.
   * `RecetaService`: Gestiona las operaciones relacionadas con las recetas en la base de datos.

5.  **Controladores (API Endpoints):**
   * `/api/auth`:
      * `POST /api/auth/login`: Inicia sesión y genera token JWT.
      * `POST /api/auth/register-api`: Registra un nuevo usuario.
   * `/api/intolerancias`:
      * `GET /api/intolerancias`: Recupera todas las intolerancias.
      * `POST /api/intolerancias/seleccionar`: Asocia una intolerancia a un usuario.
   * `/api/recetas`:
      * `GET /api/recetas/buscar`: Busca recetas por intolerancias y nombre.
      * `POST /api/recetas/crear`: Crea una nueva receta.
      * `GET /api/recetas`: Obtiene todas las recetas guardadas.
   * `/api/restaurantes`:
      * `GET /api/restaurantes/buscar`: Busca restaurantes por intolerancias, ubicación y tipo de comida.
   * `/api/favoritos-restaurantes`:
      * `POST /api/favoritos-restaurantes`: Marca un restaurante como favorito.

##  Seguridad
La seguridad se basa en JWT para la autenticación basada en tokens. El JwtAuthFilter valida los tokens en cada solicitud, y SeguridadConfig gestiona permisos y accesos.

## 🚗 Integración con Servicios Externos
* **Yelp:** Obtiene información de restaurantes según las necesidades del usuario.
* **Spoonacular:** Ofrece recetas adaptadas a las intolerancias alimentarias.

## Tecnologías Utilizadas
* **Spring Boot:** Backend RESTful.
* **Spring Security:** Autenticación y autorización con JWT.
* **JPA:** Interacción con la base de datos.
* **JWT:** Autenticación basada en tokens.
* **HQL / SQL:** Consultas y almacenamiento de datos.

##  Accesibilidad y CORS
La aplicación permite solicitudes desde 'http://localhost:5173' mediante la configuración de CORS.

