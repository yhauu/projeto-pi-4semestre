package com.jogayjoga.projetogames.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class PhotoManager {

    @Value("${caminho.disco.raiz}")
    private String rootPath;

    public void savePhotos(List<MultipartFile> photos, long idProduct) {
        this.save(String.valueOf(idProduct), photos);
    }

    private void save(String path, List<MultipartFile> files) {
        Path pathSave = Paths.get(this.rootPath, path);

        for (MultipartFile file : files) {
            try {
                Path filePath = pathSave.resolve(file.getOriginalFilename());
                Files.createDirectories(pathSave);
                file.transferTo(filePath.toFile());
            } catch (IOException ex) {
                throw new RuntimeException("Error trying to save files!", ex);
            }
        }
    }
}