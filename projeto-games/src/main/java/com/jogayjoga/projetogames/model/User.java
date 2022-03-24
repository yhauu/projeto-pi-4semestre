package com.jogayjoga.projetogames.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.jogayjoga.projetogames.util.ProfileUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="usuario")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="nome")
    private String name;

    @Column(name="nome_usuario")
    private String login;

    @Column(name="cpf")
    private String legalNumber;

    @Column(name="senha")
    private String password;

    @Column(name="numero_telefone")
    private String telephoneNumber;

    private String email;

    @Column(name="data_nascimento")
    private Date birthDate;

    @Column(name="perfil_sistema")
    private ProfileUser profile;

    @Column(name="status")
    private boolean userStatus;

    @Column(name="data_alteracao_status")
    private Date statusUpdateDate;

    public void setUserStatus(boolean b) {
    }

    public void setId(long userId) {
    }

    public boolean isUserStatus() {
        return false;
    }

    public void setStatusUpdateDate(Date date) {
    }

    public String getEmail() {
        return null;
    }

    public Object getLegalNumber() {
        return null;
    }
}
