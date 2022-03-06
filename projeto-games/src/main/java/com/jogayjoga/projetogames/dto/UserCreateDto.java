package com.jogayjoga.projetogames.dto;

import java.util.Date;

import com.jogayjoga.projetogames.util.ProfileUser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateDto {

    private String name;

    private String login;
}