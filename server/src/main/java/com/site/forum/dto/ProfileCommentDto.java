package com.site.forum.dto;

import com.site.forum.entity.ProfileComment;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@ToString
@EqualsAndHashCode
public class ProfileCommentDto {
    private Long id;
    @NotNull(message = "Commentator cannot be null")
    private UserDto commentator;
    @NotNull(message = "User cannot be null")
    private UserDto user;
    @Size(min = 3, max = 255, message = "The text must be between 3 and 255 characters long")
    private String text;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProfileCommentDto convertToDto(ProfileComment profileComment) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(profileComment, ProfileCommentDto.class);
    }

    public ProfileComment convertToEntity(ProfileCommentDto profileCommentDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(profileCommentDto, ProfileComment.class);
    }
}
