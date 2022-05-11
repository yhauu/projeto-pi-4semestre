package com.jogayjoga.projetogames.controller;

import com.jogayjoga.projetogames.dto.ClientUpdateDto;
import com.jogayjoga.projetogames.dto.UserLoginDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Client;
import com.jogayjoga.projetogames.service.ClientService;
import com.jogayjoga.projetogames.service.UserLoginService;
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
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private UserLoginService userLoginService;

    @GetMapping
    @ResponseBody
    @RequestMapping("/{clientId}")
    @ResponseStatus(HttpStatus.OK)
    public Client getClient(@PathVariable Long clientId) throws NotFoundException {
        return clientService.findClient(clientId);
    }

    @PutMapping
    @RequestMapping("/{clientId}/update")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable long clientId, @RequestBody ClientUpdateDto clientDto) throws NotFoundException, BadRequestException {
        clientService.update(clientId, clientDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Client login(@RequestBody UserLoginDto userLoginDto) throws Exception {
        return userLoginService.findClientLogin(userLoginDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody Client user) throws NotFoundException {
        clientService.create(user);
    }
}