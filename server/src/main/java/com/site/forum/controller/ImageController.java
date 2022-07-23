package com.site.forum.controller;

import com.site.forum.utils.FileUpload;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class ImageController {
    @Value("${post.image.upload.path}")
    private String fileUploadPath;

    @PostMapping("/upload")
    public ResponseEntity<HashMap<String, Object>> uploadFile(@RequestParam("upload") MultipartFile[] files) throws IOException {
        for(MultipartFile file : files) {
            FileUpload.upload(fileUploadPath, file.getOriginalFilename(),file);
        }
        HashMap<String, Object> result = new HashMap<>();
        result.put("uploaded", true);
        return ResponseEntity.ok(result);
    }
}
