package com.jogayjoga.projetogames.service;

import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.dto.ProductDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Product;
import com.jogayjoga.projetogames.model.SaleItens;
import com.jogayjoga.projetogames.repository.SaleItensRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaleItensService {

    @Autowired
    private SaleItensRepository saleItensRepository;

    @Autowired
    private ProductService productService;

    private SaleItens findOne(long id) throws NotFoundException {
        Optional<SaleItens> saleItens = saleItensRepository.findById(id);

        if (saleItens == null ||  saleItens.isEmpty() == true) {
            throw new NotFoundException("Sale not found!");
        }

        return saleItens.get();
    }

    public void create(List<ProductDto> listProductDto, long saleId) throws BadRequestException {
        SaleItens saleItens = new SaleItens();

        for (ProductDto productDto : listProductDto) {
            Product product = productService.findProduct(productDto.getId());

            saleItens.setSaleId(saleId);
            saleItens.setProductId(productDto.getId());
            saleItens.setQuantity(productDto.getQtd());
            saleItens.setUnitPrice(product.getPrice());

            productService.updateProductQuantity(productDto.getId(), productDto.getQtd());
        }

        saleItensRepository.save(saleItens);
    }

    public List<SaleItens> findSaleItensBySaleId(long saleId) throws NotFoundException {
        return saleItensRepository.findBySaleId(saleId);
    }

    public String getProductNameByProductId(long productId) {
        Product product = productService.findProduct(productId);

        return product.getName();
    }
}