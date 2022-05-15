package com.jogayjoga.projetogames.repository;

import com.jogayjoga.projetogames.model.Client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    public Client findByEmail(String email);
}