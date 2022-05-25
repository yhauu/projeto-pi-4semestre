package com.jogayjoga.projetogames.repository;

import java.util.List;

import com.jogayjoga.projetogames.model.Sale;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    public List<Sale> findByClientId(long clientId);
}