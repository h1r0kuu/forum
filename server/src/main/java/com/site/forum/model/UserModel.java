package com.site.forum.model;

import com.site.forum.dto.UserDto;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserModel extends UserDto {
    private MultipartFile image;

}
