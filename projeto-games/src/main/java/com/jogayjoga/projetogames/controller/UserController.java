package com.jogayjoga.projetogames.controller;

import java.util.List;

import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.User;
import com.jogayjoga.projetogames.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUsers() {
        return userService.listAll();
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable Long userId) throws NotFoundException {
        return userService.findUser(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody User user) throws NotFoundException {
        userService.create(user);
    }

    @PutMapping
    @RequestMapping("/{userId}/update")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable long userId, @RequestBody User user) throws NotFoundException, BadRequestException {
        userService.update(userId, user);
    }

    @PutMapping
    @RequestMapping("/{userId}/status")
    @ResponseStatus(HttpStatus.OK)
    public void updateStatus(@PathVariable long userId) throws NotFoundException {
        userService.updateStatus(userId);
    }
}