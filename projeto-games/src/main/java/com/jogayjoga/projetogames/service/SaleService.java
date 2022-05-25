package com.jogayjoga.projetogames.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.dto.CartDto;
import com.jogayjoga.projetogames.dto.ProductSaleDto;
import com.jogayjoga.projetogames.dto.SaleFinalize;
import com.jogayjoga.projetogames.dto.SaleListDto;
import com.jogayjoga.projetogames.dto.SaleResponseDto;
import com.jogayjoga.projetogames.dto.SaleStatusDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Sale;
import com.jogayjoga.projetogames.model.SaleItens;
import com.jogayjoga.projetogames.repository.SaleRepository;
import com.jogayjoga.projetogames.util.SaleStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleItensService saleItensService;

    @Autowired
    private AddressService addressService;

    private Sale findOne(long id) throws NotFoundException {
        Optional<Sale> sale = saleRepository.findById(id);

        if (sale == null ||  sale.isEmpty() == true) {
            throw new NotFoundException("Sale not found!");
        }

        return sale.get();
    }

    public SaleFinalize create(CartDto cartDto) throws BadRequestException {
        Sale sale = new Sale();
        SaleFinalize saleFinalize = new SaleFinalize();

        sale.setSaleDate(LocalDateTime.now());
        sale.setClientId(cartDto.getClientId());
        sale.setDeliveryAddressId(cartDto.getDeliveryAddressId());
        sale.setBillingAdrressId(cartDto.getBillingAdrressId());
        sale.setFee(cartDto.getFee());
        sale.setTotalSaleAmount(cartDto.getTotalSaleAmount());
        sale.setPaymentMethods(cartDto.getPaymentMethods());
        sale.setStatus(SaleStatus.AGUARDANDO_PAGAMENTO);

        saleRepository.save(sale);

        saleItensService.create(cartDto.getListProductsCart(), sale.getId());

        saleFinalize.setSaleId(sale.getId());
        saleFinalize.setTotalSaleAmount(cartDto.getTotalSaleAmount());

        return saleFinalize;
    }

    public void updateStatus(long saleId, SaleStatusDto saleStatusDto) {
        Sale sale = findOne(saleId);
        sale.setStatus(saleStatusDto.getSaleStatus());

        saleRepository.save(sale);
    }

    public List<SaleListDto> listSalesByClientId(long clientId) throws NotFoundException {
        List<SaleListDto> listSaleResponseDto = new ArrayList<>();
        List<Sale> listSale = saleRepository.findByClientId(clientId);

        for (Sale sale : listSale) {
            SaleListDto saleListDto = new SaleListDto();

            saleListDto.setId(sale.getId());
            saleListDto.setTotalSaleAmount(sale.getTotalSaleAmount());
            saleListDto.setSaleDate(sale.getSaleDate());
            saleListDto.setStatus(sale.getStatus());

            listSaleResponseDto.add(saleListDto);
        }

        return listSaleResponseDto;
    }

    public List<Sale> listAll() {
        return saleRepository.findAll();
    }

    public SaleResponseDto getSale(long saleId) {
        List<ProductSaleDto> listProductSaleDto = new ArrayList<>();
        SaleResponseDto saleResponseDto = new SaleResponseDto();

        Sale sale = findOne(saleId);
        List<SaleItens> listSaleItens = saleItensService.findSaleItensBySaleId(sale.getId());

        for (SaleItens saleItens : listSaleItens) {
            ProductSaleDto productSaleDto = new ProductSaleDto();

            String name = saleItensService.getProductNameByProductId(saleItens.getProductId());
            productSaleDto.setName(name);
            productSaleDto.setQtd(saleItens.getQuantity());
            productSaleDto.setUnitPrice(saleItens.getUnitPrice());

            listProductSaleDto.add(productSaleDto);
        }

        saleResponseDto.setListProducts(listProductSaleDto);
        saleResponseDto.setFee(sale.getFee());
        saleResponseDto.setTotalSaleAmount(sale.getTotalSaleAmount());
        saleResponseDto.setDeliveryAddress(addressService.findAddress(sale.getDeliveryAddressId()));
        saleResponseDto.setBillingAdrress(addressService.findAddress(sale.getBillingAdrressId()));
        saleResponseDto.setPaymentMethods(sale.getPaymentMethods());

        return saleResponseDto;
    }
}