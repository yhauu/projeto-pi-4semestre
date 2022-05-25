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
public class SaleResponseDto {

    private List<ProductSaleDto> listProducts;

    private Double fee;

    private Double totalSaleAmount;

    private AddressDto deliveryAddress;

    private AddressDto billingAdrress;

    private PaymentMethods paymentMethods;
}