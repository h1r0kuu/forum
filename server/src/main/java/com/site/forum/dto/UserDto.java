package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.constraints.PasswordConstraint;
import com.site.forum.entity.User;
import com.site.forum.enums.UserRole;
import com.site.forum.model.RegistrationModel;
import com.site.forum.serializers.UserDtoSerializer;
import lombok.Data;
import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Collections;
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
    private Set<CommentDto> comments;
    private Set<PostDto> hiddenPosts;
    private Set<PostDto> createdPosts;
    private Set<UserDto> followers;
    private Set<UserDto> following;
    private Set<NotificationDto> notifications;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

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
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}