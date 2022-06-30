package com.site.forum.model;

import com.site.forum.constraints.PasswordConstraint;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Size;

@Data
public class RegistrationModel {
    @Size(min = 3, max = 20, message = "The username must be between 3 and 200 characters long")
    private String username;
    @PasswordConstraint(message = "Password should contain at least one uppercase & special character")
    private String password;
    private MultipartFile image;
}
