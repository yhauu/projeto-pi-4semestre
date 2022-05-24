package com.jogayjoga.projetogames.dto;

import java.time.LocalDate;
import java.util.List;

import com.jogayjoga.projetogames.util.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {

    private long id;

    private String name;

    private String legalNumber;

    private String email;

    private String password;

    private LocalDate birthDate;

    private Gender gender;

    private List<AddressDto> address;
}
