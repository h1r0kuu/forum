package com.site.forum.dto;

import com.site.forum.entity.Forum;
import com.site.forum.model.ForumModel;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Data
public class ForumDto {
    private Long id;
    @Size(min = 3, max = 16, message = "The title must be between 3 and 16 characters long")
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

        Set<ForumDto> entitySubForums = forum.getSubForums()
                                    .stream()
                                    .map(this::convertToDto)
                                    .collect(Collectors.toSet());
        int postCount = forum.getPosts().size();
        if(!entitySubForums.isEmpty()) {
            for (ForumDto subForum : entitySubForums) {
                postCount += subForum.getPostsCount();
            }
        }
        dto.setPostsCount(postCount);
        dto.setSubForums(entitySubForums);
        dto.setLastPost(
                forum.getPosts() != null && forum.getPosts().size() > 0
                ? postDto.convertToDto(new ArrayList<>(forum.getPosts()).get(forum.getPosts().size() - 1))
                : null
        );
        return dto;
    }

    public Forum modelToEntity(ForumModel model) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addMappings(new PropertyMap<ForumModel, Forum>() {
            @Override
            protected void configure() {
                skip(destination.getId());
            }
        });
        return modelMapper.map(model, Forum.class);
    }

    public Forum convertToEntity(ForumDto forumDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(forumDto, Forum.class);
    }
}
