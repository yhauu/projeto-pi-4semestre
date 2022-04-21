package com.jogayjoga.projetogames.repository;

import java.util.List;

import com.jogayjoga.projetogames.dto.ProductPhotoDto;
import com.jogayjoga.projetogames.model.ProductPhoto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPhotoRepository extends JpaRepository<ProductPhoto, Long> {

    @Query(value = "SELECT * FROM PRODUTO_FOTO WHERE id_produto = ?1", nativeQuery = true)
    public List<ProductPhoto> findByProduct(long productId);
}