package com.jogayjoga.projetogames.controller;

import com.jogayjoga.projetogames.dto.UserLoginDto;
import com.jogayjoga.projetogames.model.User;
import com.jogayjoga.projetogames.service.UserLoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserLoginService userLoginService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public User login(@RequestBody UserLoginDto userLoginDto) throws Exception {
        return userLoginService.findUserLogin(userLoginDto);
    }
}