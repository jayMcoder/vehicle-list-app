package com.carlease.vehiclelist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ControllerExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorMessage> resourceNotFoundExceptionHandler(
        ResourceNotFoundException exception, 
        WebRequest request
    ) {
        ErrorMessage errorMessage = ErrorMessage.builder()
            .statusCode(HttpStatus.NOT_FOUND.value())
            .message(exception.getMessage()).build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> globalExceptionHandler(
        Exception exception,
        WebRequest request
    ) {
        ErrorMessage errorMessage = ErrorMessage.builder()
            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .message(exception.getMessage()).build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }
    
}
