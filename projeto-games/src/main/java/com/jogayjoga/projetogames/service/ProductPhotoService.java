package com.jogayjoga.projetogames.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.dto.ProductPhotoDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Product;
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

    private ProductPhoto findOne(long id) throws NotFoundException {
        Optional<ProductPhoto> productPhoto = productPhotoRepository.findById(id);

        if (productPhoto == null ||  productPhoto.isEmpty() == true) {
            throw new NotFoundException("Product not found!");
        }

        return productPhoto.get();
    }

    public void create(Product product, List<MultipartFile> photos) throws NotFoundException {
        List<ProductPhoto> listProductPhoto = photoManager.savePhotos(photos, product);
        for (ProductPhoto productPhoto : listProductPhoto)  {
            productPhotoRepository.save(productPhoto);
        }
    }

    public void update(long productId, List<MultipartFile> photos, Product product) throws NotFoundException, BadRequestException {
        List<ProductPhotoDto> listPhotos = findAllPhotosByProductId(productId);

        photoManager.delete(listPhotos);

        for (ProductPhotoDto productPhotoDto : listPhotos) {
            ProductPhoto productPhoto = findOne(productPhotoDto.getId());
            productPhotoRepository.delete(productPhoto);
        }

        List<ProductPhoto> listProductPhoto = photoManager.savePhotos(photos, product);
        for (ProductPhoto productPhoto : listProductPhoto)  {
            productPhotoRepository.save(productPhoto);
        }
    }

    public List<ProductPhotoDto> findAllPhotosByProductId(long idProduct) {
        List<ProductPhoto> list = productPhotoRepository.findByProduct(idProduct);
        List<ProductPhotoDto> listProductPhotoDto = new ArrayList<>();

        for (ProductPhoto productPhoto : list) {
            ProductPhotoDto productPhotoDto = new ProductPhotoDto();
            productPhotoDto.setId(productPhoto.getId());
            productPhotoDto.setNamePhoto(productPhoto.getNamePhoto());
            productPhotoDto.setPath(productPhoto.getPath());
            productPhotoDto.setIdProduct(idProduct);

            listProductPhotoDto.add(productPhotoDto);
        }

        return listProductPhotoDto;
    }
}