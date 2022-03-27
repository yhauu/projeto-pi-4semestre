package com.jogayjoga.projetogames.exceptionhandler;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MessageExceptionHandler {

    private String timestamp;

    private String details;

    private String message;

    private Integer status;
}
