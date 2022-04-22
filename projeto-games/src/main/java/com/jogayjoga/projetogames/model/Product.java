package com.jogayjoga.projetogames.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.jogayjoga.projetogames.dto.ProductPhotoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="produto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="nome", length = 200)
    private String name;

    @Column(name="avaliacao")
    private float rating;

    @Column(name="descricao", length = 2000)
    private String description;

    @Column(name="preco")
    private Double price;

    @Column(name="qtd")
    private int quantity;

    @Column(name="status")
    private boolean productStatus;

    @Column(name="data_alteracao_status")
    private Date statusUpdateDate;

    @Column(name="foto_principal")
    private String principalPhoto;

    @Transient
    private List<ProductPhotoDto> photos;
}
