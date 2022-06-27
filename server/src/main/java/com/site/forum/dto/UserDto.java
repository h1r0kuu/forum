package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.entity.User;
import com.site.forum.enums.UserRole;
import com.site.forum.model.UserModel;
import com.site.forum.serializers.UserDtoSerializer;
import lombok.Data;
import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@JsonSerialize(using = UserDtoSerializer.class)
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private UserRole role;
    private String imagePath;
    private int commentsCount;
    private int hiddenPostsCount;
    private Set<UserDto> followers;
    private Set<UserDto> following;
    private Set<NotificationDto> notifications;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserDto convertToDto(User user) {
        ModelMapper modelMapper = new ModelMapper();
        UserDto userDto = modelMapper.map(user, UserDto.class);
        NotificationDto notificationDto = new NotificationDto();
        userDto.setCommentsCount(  Objects.nonNull(user.getComments()) ? user.getComments().size() : 0 );
        userDto.setHiddenPostsCount( Objects.nonNull(user.getHiddenPosts()) ? user.getHiddenPosts().size() : 0 );
        userDto.setNotifications(user.getNotifications().stream()
                .map(notificationDto::convertToDto)
                .collect(Collectors.toSet())
        );
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserDto userDto = (UserDto) o;
        return id != null && Objects.equals(id, userDto.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
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