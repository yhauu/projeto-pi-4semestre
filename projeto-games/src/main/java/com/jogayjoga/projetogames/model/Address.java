package com.jogayjoga.projetogames.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="endereco")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="cep")
    private String zipCode;

    @Column(name="logradouro")
    private String address;

    @Column(name="bairro")
    private String district;

    @Column(name="numero")
    private int numberAddress;

    @Column(name="complemento")
    private String complementAddress;

    @Column(name="cidade")
    private String city;

    @Column(name="uf")
    private String uf;

    @Column(name="faturamento")
    private boolean billingAdrress;

    @Column(name="entrega")
    private boolean deliveryAddress;

    @ManyToOne
    @JoinColumn(name="id_endereco")
    private Client client;
}