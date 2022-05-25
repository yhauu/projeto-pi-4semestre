package com.jogayjoga.projetogames.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.jogayjoga.projetogames.util.PaymentMethods;
import com.jogayjoga.projetogames.util.SaleStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="venda")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="data_venda")
    private LocalDateTime saleDate;

    @Column(name="id_cliente")
    private long clientId;

    @Column(name="id_endereco_entrega")
    private long deliveryAddressId;

    @Column(name="id_endereco_faturamento")
    private long billingAdrressId;

    @Column(name="preco_frete")
    private Double fee;

    @Column(name="valor_total")
    private Double totalSaleAmount;

    @Column(name="metodo_pagamento")
    private PaymentMethods paymentMethods;

    @Column(name="status")
    private SaleStatus status;
}
