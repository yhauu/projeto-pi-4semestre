package com.jogayjoga.projetogames.repository;

import java.util.List;

import com.jogayjoga.projetogames.model.SaleItens;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleItensRepository extends JpaRepository<SaleItens, Long>{

    public List<SaleItens> findBySaleId(long clientId);
}