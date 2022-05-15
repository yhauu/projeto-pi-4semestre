package com.jogayjoga.projetogames.dto;

import java.time.LocalDate;

import com.jogayjoga.projetogames.util.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientUpdateDto {

    private long id;

    private String name;

    private LocalDate birthDate;

    private Gender gender;
}