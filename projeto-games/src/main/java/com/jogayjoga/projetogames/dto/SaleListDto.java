package com.jogayjoga.projetogames.dto;

import java.time.LocalDateTime;

import com.jogayjoga.projetogames.util.SaleStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class SaleListDto {

    private long id;

    private Double totalSaleAmount;

    private LocalDateTime saleDate;

    private SaleStatus status;
}