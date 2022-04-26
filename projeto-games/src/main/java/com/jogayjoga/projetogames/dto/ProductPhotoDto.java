package com.jogayjoga.projetogames.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductPhotoDto {

    private long id;

    private String namePhoto;

    private String path;

    private long idProduct;
}
