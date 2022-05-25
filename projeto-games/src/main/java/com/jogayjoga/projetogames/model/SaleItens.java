package com.jogayjoga.projetogames.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="item_venda")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SaleItens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="id_venda")
    private long saleId;

    @Column(name="id_produto")
    private long productId;

    @Column(name="qtd")
    private int quantity;

    @Column(name="valor_unitario")
    private Double unitPrice;
}
