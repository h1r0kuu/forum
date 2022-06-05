package com.site.forum.dto;

import com.site.forum.entity.Forum;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

@Data
public class ForumDto {
    private Long id;
    private String title;
    private ForumDto forum;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ForumDto convertToDto(Forum forum) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(forum, ForumDto.class);
    }

    public Forum convertToEntity(ForumDto forumDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(forumDto, Forum.class);
    }
}
