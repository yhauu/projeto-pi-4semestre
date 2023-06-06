package com.jogayjoga.projetogames.controller;

import java.util.List;

import com.jogayjoga.projetogames.dto.CartDto;
import com.jogayjoga.projetogames.dto.SaleFinalize;
import com.jogayjoga.projetogames.dto.SaleListDto;
import com.jogayjoga.projetogames.dto.SaleResponseDto;
import com.jogayjoga.projetogames.dto.SaleStatusDto;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Sale;
import com.jogayjoga.projetogames.service.SaleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping
    @ResponseBody
    @RequestMapping("/client/{clientId}")
    @ResponseStatus(HttpStatus.OK)
    public List<SaleListDto> getSalesByClient(@PathVariable Long clientId) throws NotFoundException {
        return saleService.listSalesByClientId(clientId);
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/{saleId}")
    @ResponseStatus(HttpStatus.OK)
    public SaleResponseDto getSale(@PathVariable Long saleId) throws NotFoundException {
        return saleService.getSale(saleId);
    }

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<Sale> getSales() throws NotFoundException {
        return saleService.listAll();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public SaleFinalize create(@RequestBody CartDto cartDto) throws NotFoundException {
        return saleService.create(cartDto);
    }

    @PutMapping
    @RequestMapping("/{saleId}/status")
    @ResponseStatus(HttpStatus.OK)
    public void updateStatus(@PathVariable long saleId, @RequestBody SaleStatusDto saleStatusDto) throws NotFoundException {
        saleService.updateStatus(saleId, saleStatusDto);
    }
}