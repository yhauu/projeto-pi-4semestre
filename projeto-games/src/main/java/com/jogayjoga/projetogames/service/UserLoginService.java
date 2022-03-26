package com.jogayjoga.projetogames.service;

import com.jogayjoga.projetogames.dto.UserLoginDto;
import com.jogayjoga.projetogames.model.User;
import com.jogayjoga.projetogames.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLoginService {

    @Autowired
    private UserRepository userRepository;

    public User findUserLogin(UserLoginDto userLoginDto) throws Exception {

        // Variável do BD
        User user = userRepository.findByEmail(userLoginDto.getEmail());

        // Verificação de usuário vindo do BD
        if (user != null) {

            // Verificação de senha do BD com a senha recebida do front
            if (user.getPassword().equals(userLoginDto.getPassword())) {
                return user;
            }
        }

        throw new Exception("User or password was wrong!");
    }

    /* public User findUserLogin(UserLoginDto userLoginDto) throws Exception {
        String email = userLoginDto.getEmail();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User or password was wrong!");
        }
        String passwordBD = user.getPassword();
        String passwordFrontend = userLoginDto.getPassword();

        if (!passwordBD.equals(passwordFrontend)) {
            throw new Exception("User or password was wrong!");
        }
        return user;
    } */
}