package com.site.forum.dto;

import com.site.forum.entity.Post;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class PostDto {
    private Long id;
    private String title;
    private String text;
    private ForumDto forum;
    private UserDto creator;
    private Set<CommentDto> comments;
    private int likesCount;
    private int dislikesCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PostDto convertToDto(Post post) {
        ModelMapper modelMapper = new ModelMapper();
        PostDto dto = modelMapper.map(post, PostDto.class);

        CommentDto commentDto = new CommentDto();
        dto.setComments( post.getComments()
                .stream()
                .map(commentDto::convertToDto)
                .collect(Collectors.toSet())
        );
        dto.setLikesCount(Objects.nonNull(post.getLikes()) ? post.getLikes().size() : 0);
        dto.setDislikesCount(Objects.nonNull(post.getDislikes()) ? post.getDislikes().size() : 0);
        return dto;
    }

    public Post convertToEntity(PostDto postDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(postDto, Post.class);
    }
}
