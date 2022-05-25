package com.jogayjoga.projetogames.dto;

import com.jogayjoga.projetogames.util.SaleStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaleStatusDto {

    private long id;

    private SaleStatus saleStatus;
}
