package com.site.forum.dto;

import com.site.forum.entity.Forum;
import com.site.forum.model.ForumModel;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.ui.Model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ForumDto {
    private Long id;
    private String title;
    private Set<ForumDto> subForums;
    private int postsCount;
    private PostDto lastPost;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ForumDto convertToDto(Forum forum) {
        ModelMapper modelMapper = new ModelMapper();
        ForumDto dto = modelMapper.map(forum, ForumDto.class);
        PostDto postDto = new PostDto();
        dto.setPostsCount( Objects.nonNull(forum.getPosts()) ? forum.getPosts().size() : 0 );
        dto.setSubForums(
                forum.getSubForums() != null
                ?
                   forum.getSubForums()
                        .stream()
                        .map(this::convertToDto)
                        .collect(Collectors.toSet())
                :
                   Collections.emptySet()

        );
        dto.setLastPost(
                forum.getPosts() != null && forum.getPosts().size() > 0
                ? postDto.convertToDto(new ArrayList<>(forum.getPosts()).get(forum.getPosts().size() - 1))
                : null
        );
        return dto;
    }

    public Forum modelToEntity(ForumModel model) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addMappings(new PropertyMap<Forum, ForumModel>() {
            @Override
            protected void configure() {
                skip(destination.getParentId());
            }
        });
        return modelMapper.map(model, Forum.class);
    }

    public Forum convertToEntity(ForumDto forumDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(forumDto, Forum.class);
    }
}
