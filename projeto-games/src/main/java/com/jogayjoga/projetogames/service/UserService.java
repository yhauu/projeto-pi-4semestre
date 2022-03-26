package com.jogayjoga.projetogames.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.model.User;
import com.jogayjoga.projetogames.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private User findOne(long id) throws Exception {
        Optional<User> user = userRepository.findById(id);

        if (user == null ||  user.isEmpty() == true) {
            throw new Exception("User not found!");
        }

        return user.get();
    }

    public void create(User user) throws Exception {
        userVerification(user, 'c');
        user.setUserStatus(true);
        userRepository.save(user);
    }

    public void update(long userId, User user) throws Exception {
        findOne(userId);
        userVerification(user, 'u');
        user.setId(userId);
        userRepository.save(user);
    }

    public void updateStatus(long userId) throws Exception {
        User user = findOne(userId);
        user.setUserStatus(!user.isUserStatus());
        user.setStatusUpdateDate(new Date());
        userRepository.save(user);
    }

    public User findUser(long userId) throws Exception {
        User user = findOne(userId);
        return user;
    }

    public List<User> listAll() {
        return userRepository.findAll();
    }

    private void userVerification(User user, char optionSelected) throws Exception {
        User userEmailVerifi = userRepository.findByEmail(user.getEmail());

        if (userEmailVerifi != null && optionSelected == 'c') {
            throw new Exception("Email is already in use!");
        }

        if (user.getLegalNumber() == null) {
            throw new Exception("Legal number is required!");
        }
    }
}
