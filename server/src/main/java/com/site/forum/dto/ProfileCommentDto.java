package com.site.forum.dto;

import com.site.forum.entity.Forum;
import com.site.forum.entity.ProfileComment;
import com.site.forum.model.ForumModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

import java.time.LocalDateTime;

@Data
@ToString
@EqualsAndHashCode
public class ProfileCommentDto {
    private Long id;
    private UserDto commentator;
    private UserDto user;
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
