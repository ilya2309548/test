FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /workspace/app

# Установка необходимых зависимостей
RUN apk add --no-cache curl

# Копирование файлов проекта
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Установка прав на выполнение для mvnw
RUN chmod +x mvnw

# Сборка приложения
RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.forum_back.ForumBackApplication"]

EXPOSE 8081
