package com.jogayjoga.projetogames.service;

import com.jogayjoga.projetogames.dto.UserLoginDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.model.User;
import com.jogayjoga.projetogames.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserLoginService {

    @Autowired
    UserRepository userRepository;

    public User findUserLogin(UserLoginDto userLoginDto) throws BadRequestException {

        User user = userRepository.findByEmail(userLoginDto.getEmail());

        if (user != null) {
            if (BCrypt.checkpw(userLoginDto.getPassword(), user.getPassword())) {
                return user;
            }
        }

        throw new BadRequestException("User or password was wrong!");
    }
}