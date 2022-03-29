package com.jogayjoga.projetogames.service;

import java.util.List;

import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.ProductPhoto;
import com.jogayjoga.projetogames.repository.ProductPhotoRepository;
import com.jogayjoga.projetogames.util.PhotoManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductPhotoService {

    @Autowired
    private ProductPhotoRepository productPhotoRepository;

    @Autowired
    private PhotoManager photoManager;

    private ProductService productService;

    public void create(long idProduct, List<MultipartFile> photos) throws NotFoundException {
        photoManager.savePhotos(photos, idProduct);

        //productPhotoRepository.save(productPhoto);
    }

    public void update(long productId, ProductPhoto product, List<MultipartFile> photos) throws NotFoundException, BadRequestException {
        productService.findProduct(productId);
        product.setId(productId);
        productPhotoRepository.save(product);
    }
}