package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.enums.UserRole;
import com.site.forum.serializers.UserDtoSerializer;
import lombok.Data;
import org.hibernate.Hibernate;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Data
@JsonSerialize(using = UserDtoSerializer.class)
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private UserRole role;
    private String imagePath;
    private Set<CommentDto> comments = new HashSet<>();
    private Set<PostDto> hiddenPosts = new HashSet<>();
    private Set<PostDto> createdPosts = new HashSet<>();
    private Set<UserDto> followers = new HashSet<>();
    private Set<UserDto> following = new HashSet<>();
    private Set<NotificationDto> notifications = new HashSet<>();
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