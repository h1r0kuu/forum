package com.site.forum.controller;

import com.site.forum.utils.FileUpload;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class ImageController {
    @Value("${file.upload.path}")
    private String fileUploadPath;

    @PostMapping("/upload")
    public ResponseEntity<HashMap<String, Object>> uploadFile(@RequestParam("upload") MultipartFile file) throws IOException {

        String filePath = FileUpload.upload(fileUploadPath, file.getOriginalFilename(),file);
        HashMap<String, Object> result = new HashMap<>();
        result.put("uploaded", true);
        result.put("url", "http://localhost:8080/img/"+file.getOriginalFilename());
        return ResponseEntity.ok(result);
    }
}
