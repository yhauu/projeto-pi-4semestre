package com.jogayjoga.projetogames.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaleFinalize {

    private long saleId;

    private Double totalSaleAmount;
}
