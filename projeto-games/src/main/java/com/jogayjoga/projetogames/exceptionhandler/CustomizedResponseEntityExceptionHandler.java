package com.jogayjoga.projetogames.exceptionhandler;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity<MessageExceptionHandler> handleNotFoundException(NotFoundException ex, WebRequest request) {
        MessageExceptionHandler exceptionResponse = new MessageExceptionHandler(new Date().toString(), request.getDescription(false), ex.getMessage(), HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<MessageExceptionHandler>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<MessageExceptionHandler> handleBadRequestException(BadRequestException ex, WebRequest request) {
        MessageExceptionHandler exceptionResponse = new MessageExceptionHandler(new Date().toString(), request.getDescription(false), ex.getMessage(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<MessageExceptionHandler>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}