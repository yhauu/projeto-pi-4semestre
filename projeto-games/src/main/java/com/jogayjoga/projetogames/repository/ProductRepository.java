package com.jogayjoga.projetogames.repository;

import com.jogayjoga.projetogames.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    
}