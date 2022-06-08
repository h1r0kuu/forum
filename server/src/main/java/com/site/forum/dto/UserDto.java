package com.site.forum.dto;

import com.site.forum.entity.User;
import com.site.forum.enums.UserRole;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

public class UserDto {
    private Long id;
    private String username;
    private String password;
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserDto convertToDto(User user) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(user, UserDto.class);
    }

    public User convertToEntity(UserDto userDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(userDto, User.class);
    }
}