package com.jogayjoga.projetogames.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.jogayjoga.projetogames.dto.ProductPhotoDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.model.Product;
import com.jogayjoga.projetogames.model.ProductPhoto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class PhotoManager {

    @Value("${caminho.disco.raiz}")
    private String rootPath;

    public List<ProductPhoto> savePhotos(List<MultipartFile> photos, Product product) {
        return this.save(product, photos);
    }

    private List<ProductPhoto> save(Product product, List<MultipartFile> files) {
        int i = 1;
        List<ProductPhoto> list = new ArrayList<>();

        try {
            for (MultipartFile file : files) {

                String typeOfImage[] = file.getContentType().split("/");
                String photoName = "img" + i + ".".concat(typeOfImage[1]);
                String folder = String.valueOf(product.getId());

                String finalPath = rootPath.concat("/" + folder).concat("/" + photoName);
                File fileWithPath = new File(finalPath);

                Path pathSave = Paths.get(this.rootPath, folder);
                Files.createDirectories(pathSave);

                InputStream input = file.getInputStream();
                OutputStream out = new FileOutputStream(fileWithPath);
                int read = 0;
                byte[] bytes = new byte[1024];

                while ((read = input.read(bytes)) != -1) {
                    out.write(bytes, 0, read);
                }
    
                input.close();
                out.flush();
                out.close();
                i++;

                ProductPhoto productPhoto = new ProductPhoto();
                productPhoto.setNamePhoto(photoName);
                productPhoto.setPath(finalPath);
                productPhoto.setProduct(product);
                list.add(productPhoto);
            }
        } catch (IOException e) {
            throw new BadRequestException("Error to save images!");
        }

        return list;
    }

    public void delete(List<ProductPhotoDto> listPhotos) {
        for (ProductPhotoDto file : listPhotos) {

            String photoName = file.getNamePhoto();
            String folder = String.valueOf(file.getIdProduct());

            String finalPath = rootPath.concat("/" + folder).concat("/" + photoName);
            File fileWithPath = new File(finalPath);

            fileWithPath.delete();
        }
    }
}