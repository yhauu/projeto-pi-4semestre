package com.jogayjoga.projetogames.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.User;
import com.jogayjoga.projetogames.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private User findOne(long id) throws NotFoundException {
        Optional<User> user = userRepository.findById(id);

        if (user == null ||  user.isEmpty() == true) {
            throw new NotFoundException("User not found!");
        }

        return user.get();
    }

    public void create(User user) throws NotFoundException {
        userVerification(user, 'c');
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10)));
        user.setUserStatus(true);
        userRepository.save(user);
    }

    public void update(long userId, User user) throws NotFoundException, BadRequestException {
        User userCreated = findOne(userId);
        userVerification(user, 'u');
        user.setId(userId);

        if (!userCreated.getPassword().equals(user.getPassword())) {
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10)));
        }

        userRepository.save(user);
    }

    public void updateStatus(long userId) throws NotFoundException {
        User user = findOne(userId);
        user.setUserStatus(!user.isUserStatus());
        user.setStatusUpdateDate(new Date());
        userRepository.save(user);
    }

    public User findUser(long userId) throws NotFoundException {
        User user = findOne(userId);
        return user;
    }

    public List<User> listAll() {
        return userRepository.findAll();
    }

    private void userVerification(User user, char optionSelected) throws BadRequestException {
        User userEmailVerifi = userRepository.findByEmail(user.getEmail());

        if (userEmailVerifi != null && optionSelected == 'c') {
            throw new BadRequestException("Email is already in use!");
        }

        if (user.getLegalNumber() == null) {
            throw new BadRequestException("Legal number is required!");
        }
    }
}
