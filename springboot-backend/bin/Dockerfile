# OpenJDK 17을 기반으로 설정
FROM openjdk:17-jdk-slim

# 애플리케이션이 실행될 디렉토리 생성
WORKDIR /app

# 로컬의 Spring Boot JAR 파일을 컨테이너로 복사
COPY target/springboot-backend-0.0.1-SNAPSHOT.jar app.jar

# 애플리케이션 실행 명령어 설정
ENTRYPOINT ["java", "-jar", "app.jar"]
