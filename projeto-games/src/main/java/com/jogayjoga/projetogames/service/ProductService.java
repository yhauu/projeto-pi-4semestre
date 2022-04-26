package com.jogayjoga.projetogames.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.dto.ProductPhotoDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Product;
import com.jogayjoga.projetogames.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductPhotoService productPhotoService;

    private Product findOne(long id) throws NotFoundException {
        Optional<Product> product = productRepository.findById(id);

        if (product == null ||  product.isEmpty() == true) {
            throw new NotFoundException("Product not found!");
        }

        return product.get();
    }

    public void create(Product product, List<MultipartFile> files) throws NotFoundException { //, List<MultipartFile> productPhotos
        product.setProductStatus(true);
        productRepository.save(product);

        productPhotoService.create(product, files);
    }

    public void update(long productId, Product product, List<MultipartFile> files) throws NotFoundException, BadRequestException { //, List<MultipartFile> photos
        findOne(productId);
        product.setId(productId);
        productRepository.save(product);

        productPhotoService.update(productId, files, product);
    }

    public void updateStatus(long productId) throws NotFoundException {
        Product product = findOne(productId);
        product.setProductStatus(!product.isProductStatus());
        product.setStatusUpdateDate(new Date());
        productRepository.save(product);
    }

    public Product findProduct(long productId) throws NotFoundException {
        Product product = findOne(productId);
        List<ProductPhotoDto> listPhotos = productPhotoService.findAllPhotosByProductId(productId);
        product.setPhotos(listPhotos);
        return product;
    }

    public List<Product> listAll() {
        List<Product> listProduct = productRepository.findAll();
        List<Product> list = new ArrayList<>();

        for (Product product : listProduct) {
            List<ProductPhotoDto> listPhotos = productPhotoService.findAllPhotosByProductId(product.getId());

            product.setPhotos(listPhotos);
            list.add(product);
        }

        return list;
    }
}