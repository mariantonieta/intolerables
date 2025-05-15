FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia primero el pom.xml para aprovechar cache de Docker en las dependencias
COPY pom.xml .

# Descargar dependencias (opcional para cachear)
RUN mvn dependency:go-offline

# Ahora copia el resto del código
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
