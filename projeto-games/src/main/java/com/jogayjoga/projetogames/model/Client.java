package com.jogayjoga.projetogames.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.jogayjoga.projetogames.util.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="cliente")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="nome_completo")
    private String name;

    @Column(name="data_nascimento")
    private LocalDate birthDate;

    @Column(name="genero")
    private Gender gender;

    // @Column(name="id_endereco_faturamento")
    // private BillingAddress billingAddress;

    // @Transient
    // private DeliveryAddress deliveryAddress;
}