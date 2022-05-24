package com.jogayjoga.projetogames.repository;

import java.util.List;

import com.jogayjoga.projetogames.model.Address;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long>{

    List<Address> findByClientId(long clientId);
}