FROM maven:latest
RUN mkdir /ace2
WORKDIR /ace2
COPY . .
EXPOSE 8000
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.arguments=--server.port=8000"]