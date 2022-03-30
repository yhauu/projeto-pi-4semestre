package com.jogayjoga.projetogames.repository;

import java.util.List;

import com.jogayjoga.projetogames.model.ProductPhoto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPhotoRepository extends JpaRepository<ProductPhoto, Long> {

    public List<ProductPhoto> findByProductId(long productId);
}