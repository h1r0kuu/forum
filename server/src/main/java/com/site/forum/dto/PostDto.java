package com.site.forum.dto;

import com.site.forum.entity.Post;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@ToString
@EqualsAndHashCode(exclude = {"creator", "views"})
public class PostDto {
    private Long id;
    private String title;
    private String text;
    private Boolean closed;
    private ForumDto forum;
    private UserDto creator;
    private Set<CommentDto> comments;
    private int likesCount;
    private int dislikesCount;
    private int viewsCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PostDto convertToDto(Post post) {
        ModelMapper modelMapper = new ModelMapper();
        PostDto dto = modelMapper.map(post, PostDto.class);

        CommentDto commentDto = new CommentDto();
        dto.setComments(
                post.getComments() != null
                ?
                    post.getComments()
                        .stream()
                        .filter(comment -> comment.getParentComment()==null)
                        .map(commentDto::convertToDto)
                        .collect(Collectors.toSet())
                :
                    Collections.emptySet()
        );
        dto.setLikesCount(Objects.nonNull(post.getLikes()) ? post.getLikes().size() : 0);
        dto.setDislikesCount(Objects.nonNull(post.getDislikes()) ? post.getDislikes().size() : 0);
        dto.setViewsCount( Objects.nonNull(post.getViews()) ? post.getViews().size() : 0 );
        return dto;
    }

    public Post convertToEntity(PostDto postDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(postDto, Post.class);
    }
}
