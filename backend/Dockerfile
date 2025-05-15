FROM maven:3.9.4-eclipse-temurin-21

WORKDIR /app

# Copiar pom.xml y archivos de configuración para caché de dependencias
COPY pom.xml ./
# Si tienes carpeta .mvn o scripts mvnw, cópialos también
# COPY .mvn .mvn
# COPY mvnw .

# Descargar dependencias (sin código)
RUN mvn dependency:go-offline -B

# Copiar el código fuente completo
COPY src ./src

# Compilar y empaquetar sin tests
RUN mvn clean package -DskipTests

# Ajusta el nombre del JAR generado aquí
CMD ["java", "-jar", "target/intolerables-0.0.1-SNAPSHOT.jar"]
