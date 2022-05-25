package com.jogayjoga.projetogames.dto;

import java.util.List;

import com.jogayjoga.projetogames.util.PaymentMethods;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {

    private List<ProductDto> listProductsCart;

    private Double fee;

    private Double totalSaleAmount;

    private long clientId;

    private long deliveryAddressId;

    private long billingAdrressId;

    private PaymentMethods paymentMethods;
}