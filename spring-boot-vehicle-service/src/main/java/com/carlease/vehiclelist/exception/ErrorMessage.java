package com.carlease.vehiclelist.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class ErrorMessage {
    
    private int statusCode;
    private String message;
}
