package com.jogayjoga.projetogames.controller;

import java.util.List;

import com.google.gson.Gson;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Product;
import com.jogayjoga.projetogames.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<Product> getProducts() {
        return productService.listAll();
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public Product getProduct(@PathVariable Long productId) throws NotFoundException {
        return productService.findProduct(productId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestPart String data, @RequestPart List<MultipartFile> files) throws NotFoundException {
        Gson g = new Gson();
        Product product = g.fromJson(data, Product.class);
        productService.create(product, files);
    }

    @PutMapping
    @RequestMapping("/{productId}/update")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable long productId, @RequestPart String data, @RequestPart List<MultipartFile> files) throws NotFoundException, BadRequestException {
        Gson g = new Gson();
        Product product = g.fromJson(data, Product.class);
        productService.update(productId, product, files);
    }

    @PutMapping
    @RequestMapping("/{productId}/status")
    @ResponseStatus(HttpStatus.OK)
    public void updateStatus(@PathVariable long productId) throws NotFoundException {
        productService.updateStatus(productId);
    }
}