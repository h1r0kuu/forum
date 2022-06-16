package com.site.forum.dto;

import com.site.forum.entity.User;
import com.site.forum.enums.UserRole;
import com.site.forum.model.UserModel;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private UserRole role;
    private String imagePath;
    private int commentsCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserDto convertToDto(User user) {
        ModelMapper modelMapper = new ModelMapper();
        UserDto userDto = modelMapper.map(user, UserDto.class);
        userDto.setCommentsCount(  Objects.nonNull(user.getComments()) ? user.getComments().size() : 0 );
        return userDto;
    }

    public UserDto modelToDto(UserModel model) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(model, UserDto.class);
    }

    public User convertToEntity(UserDto userDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(userDto, User.class);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", commentsCount=" + commentsCount +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}