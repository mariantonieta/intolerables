# Intolerables

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/) (v9 o superior recomendado)
- [Java 21](https://adoptium.net/) o superior
- [Maven](https://maven.apache.org/) (opcional, el wrapper está incluido)
- Docker (opcional, para despliegue con contenedores)
- **IntelliJ IDEA** (opcional, facilita la gestión y ejecución del backend)

---

## Instalación local

> **Nota:** Si tienes instalado IntelliJ IDEA, la configuración y ejecución del backend será mucho más sencilla, ya que puedes importar el proyecto como un proyecto Maven y ejecutarlo directamente desde el IDE.

### 1. Clona el repositorio

```sh
git clone https://github.com/mariantonieta/intolerables
cd intolerables
```

### 2. Backend (Spring Boot)

#### Opción A: Usando IntelliJ IDEA (recomendado)

1. Abre IntelliJ IDEA y selecciona "Open" para abrir la carpeta `backend`.
2. IntelliJ detectará automáticamente el proyecto Maven y descargará las dependencias.
3. Configura el archivo `application.properties` con tus claves y datos de conexión.
spring.datasource.url=jdbc:postgresql://maglev.proxy.rlwy.net:36034/railway
spring.datasource.username=postgres
spring.datasource.password=PwUcRjwgPkMnOPkcCnZBlwFdJvvnwZef
spring.main.allow-bean-definition-overriding=true
#APIs KEY
spoonacular.api.key=0405f43ca10d485cb541ed424366e6dc
ai.api.key=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
#JWT
jwt.secret=y2B54p1ZZIPXJIMTWziI7yWis3FmhTpIgpBMu1f50i1E7bbLDOmaCY/LFcpdS8nWXkD9dPoYGh7pwRmvS/agug==

# JPA
4. Haz clic derecho sobre la clase principal (`IntolerablesApplication.java`) y selecciona "Run".

#### Opción B: Usando Maven Wrapper

```sh
cd backend
./mvnw clean package -DskipTests
./mvnw spring-boot:run
```

### 3. Frontend (React + Vite)

```sh
cd front
npm install
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

---

## Uso

- Accede al frontend en [http://localhost:5173](http://localhost:5173).
- El backend estará escuchando en [http://localhost:9000](http://localhost:9000) (o el puerto configurado).
- Realiza búsquedas de recetas según intolerancias alimentarias, traducidas automáticamente.

---

## Pruebas

### Frontend

```sh
cd front
npm run test
```

### Backend

```sh
cd backend
./mvnw test
```

---

## Estructura del proyecto

- `backend/`: API REST con Spring Boot
- `front/`: Aplicación web en React

---

## Notas

- Recuerda obtener y configurar tu propia API Key de Spoonacular.
- Puedes modificar los puertos en los archivos de configuración si es necesario.
- Usar IntelliJ IDEA simplifica la gestión del backend y la ejecución de pruebas.