package com.jogayjoga.projetogames.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {

    private long id;

    private String zipCode;

    private String address;

    private String district;

    private int numberAddress;

    private String complementAddress;

    private String city;

    private String uf;

    private boolean billingAdrress;

    private boolean deliveryAddress;

    private long idClient;
}
