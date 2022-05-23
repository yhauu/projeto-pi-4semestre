package com.jogayjoga.projetogames.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.jogayjoga.projetogames.util.Gender;
import com.jogayjoga.projetogames.util.ProfileUser;

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

    @Column(name="cpf")
    private String legalNumber;

    private String email;

    @Column(name="senha")
    private String password;

    @Column(name="data_nascimento")
    private LocalDate birthDate;

    @Column(name="genero")
    private Gender gender;

    @Column(name="perfil_sistema")
    private ProfileUser profile;

    @OneToMany
    @JoinColumn(name="id_cliente")
    private List<Address> address;
}