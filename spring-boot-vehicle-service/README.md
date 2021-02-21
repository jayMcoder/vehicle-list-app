# Getting Started

Module to run springboot service for vehicle details.

## To build and run application

### `mvn clean install`

Clean the target folder and compile the project to target folder

### `mvn spring-boot:run`

Runs springboot vehicle list service in port `http://localhost:3080`

### Database

Application uses in-memory H2 database to store data. When the application restarts it will be reset to default values.
`data.sql` has table schema and loads initial data into the database during application start.

### Configuration

* `server.port` defined in application.properties
* `spring.h2.console.enabled` to enable h2 console
* `spring.h2.console.path=/h2-console` defines path to h2 console

