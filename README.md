# Getting Started

Parent level project for vehicle list service.
Contains two modules
 * spring-boot-vehicle-service
 * react-app

This project bundles both java and client application in one jar.

## Spring boot vehicle service

Java spring boot project for vehicle list service

## React client app

React client app to render vehicle list, edit and add new vehicles

## `mvn clean install`

Clean both modules build folder and builds the application.
Final jar bundle `vehicle-list-0.0.1-SNAPSHOT.jar` in `spring-boot-vehicle-service/target` folder.

## `java -jar spring-boot-vehicle-service/target/vehicle-list-0.0.1-SNAPSHOT.jar`

This start the jar bundle and application is served in location `http://localhost:3080`

