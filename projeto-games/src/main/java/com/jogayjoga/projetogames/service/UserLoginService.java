package com.jogayjoga.projetogames.service;

import com.jogayjoga.projetogames.dto.ClientDto;
import com.jogayjoga.projetogames.dto.UserLoginDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.model.Client;
import com.jogayjoga.projetogames.model.User;
import com.jogayjoga.projetogames.repository.ClientRepository;
import com.jogayjoga.projetogames.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserLoginService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ClientRepository clientRepository;

    public User findUserLogin(UserLoginDto userLoginDto) throws BadRequestException {

        User user = userRepository.findByEmail(userLoginDto.getEmail());

        if (user != null) {
            if (BCrypt.checkpw(userLoginDto.getPassword(), user.getPassword())) {
                return user;
            }
        }

        throw new BadRequestException("User or password was wrong!");
    }

    public ClientDto findClientLogin(UserLoginDto userLoginDto) throws BadRequestException {

        Client client = clientRepository.findByEmail(userLoginDto.getEmail());
        ClientDto clientDto = new ClientDto();

        if (client != null) {
            if (BCrypt.checkpw(userLoginDto.getPassword(), client.getPassword())) {
                clientDto.setId(client.getId());
                clientDto.setName(client.getName());
                clientDto.setLegalNumber(client.getLegalNumber());
                clientDto.setEmail(client.getEmail());
                clientDto.setPassword(client.getPassword());
                clientDto.setBirthDate(client.getBirthDate());
                clientDto.setAddress(null);
                return clientDto;
            }
        }

        throw new BadRequestException("User or password was wrong!");
    }
}