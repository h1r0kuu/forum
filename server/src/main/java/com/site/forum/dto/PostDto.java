package com.site.forum.dto;

import com.site.forum.entity.Post;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@ToString
@EqualsAndHashCode(exclude = {"creator"})
public class PostDto {
    private Long id;
    @Size(min = 3, max = 16, message = "The title must be between 3 and 16 characters long")
    private String title;
    @Size(min = 3, message = "The text must be more than 3 characters long")
    private String text;
    private Boolean closed;
    @NotNull(message = "Forum cannot be null")
    private ForumDto forum;
    @NotNull(message = "Creator cannot be null")
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
