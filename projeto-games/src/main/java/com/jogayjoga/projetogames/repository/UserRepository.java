package com.jogayjoga.projetogames.repository;

import com.jogayjoga.projetogames.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);
}