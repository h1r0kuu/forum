package com.site.forum.controller;

import com.site.forum.dto.CommentDto;
import com.site.forum.dto.PostDto;
import com.site.forum.entity.Comment;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import com.site.forum.service.impl.CommentServiceImpl;
import com.site.forum.service.impl.PostServiceImpl;
import com.site.forum.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postService;
    private final CommentServiceImpl commentService;
    private final UserServiceImpl userService;

    private final PostDto postDto = new PostDto();
    private final CommentDto commentDto = new CommentDto();

    @PostMapping(value = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<PostDto> create(@RequestBody PostDto post) {
        Post createdPost = postService.create( postDto.convertToEntity(post) );
        return ResponseEntity.ok( postDto.convertToDto(createdPost) );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getOne(@PathVariable("id") Long id) {
        Post post = postService.getById(id);
        return ResponseEntity.ok( postDto.convertToDto(post) );
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deletePost(@PathVariable("id") Long id) {
        postService.delete(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostDto>> getAll(@Nullable @RequestParam("order") String orderBy) {
            List<PostDto> posts = postService.getAll( Objects.nonNull( orderBy ) ? orderBy : "createdAt" ).stream()
                                             .map(postDto::convertToDto)
                                             .toList();
            return ResponseEntity.ok(posts);
    }

    @GetMapping("/forum/{id}")
    public ResponseEntity<List<PostDto>> getPostsByForumId(@PathVariable("id") Long id) {
        List<PostDto> posts = postService.getByForumId(id).stream()
                                         .map(postDto::convertToDto)
                                         .toList();
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<String> likePost(@PathVariable("id") Long id,
                                           Authentication authentication) {
        Post post = postService.getById(id);
        User user = userService.getUserByUsername(authentication.getName());
        postService.like(post, user);
        return ResponseEntity.ok("likes");
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<String> dislikePost(@PathVariable("id") Long id,
                                           Authentication authentication) {
        Post post = postService.getById(id);
        User user = userService.getUserByUsername(authentication.getName());
        postService.dislike(post, user);
        return ResponseEntity.ok("disliked");
    }

//    Comments
    @GetMapping("/{id}/comments")
    public ResponseEntity<Set<CommentDto>> getPostComments(@PathVariable("id") Long id) {
        Set<CommentDto> comments = commentService.getByPostId(id).stream()
                                                                 .map(commentDto::convertToDto)
                                                                 .collect(Collectors.toSet());
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{id}/comments/{commentId}/delete")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long id) {
        commentService.delete(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

    @PostMapping("/{id}/comments/create")
    public ResponseEntity<CommentDto> createComment(@PathVariable("id") Long id,
                                                    @RequestBody CommentDto commentDto) {
        Post post = postService.getById(id);
        Comment createdComment = commentService.create( commentDto.convertToEntity(commentDto), post );
        return ResponseEntity.ok(commentDto.convertToDto(createdComment));
    }

    @PostMapping("/{id}/comments/{id}/like")
    public ResponseEntity<String> likeComment(@PathVariable("id") Long id,
                                              Authentication authentication) {
        Comment comment = commentService.getById(id);
        User user = userService.getUserByUsername(authentication.getName());
        commentService.like(comment, user);
        return ResponseEntity.ok("liked");
    }

    @PostMapping("/{id}/comments/{id}/dislike")
    public ResponseEntity<String> dislikeComment(@PathVariable("id") Long id,
                                                 Authentication authentication) {
        Comment comment = commentService.getById(id);
        User user = userService.getUserByUsername(authentication.getName());
        commentService.dislike(comment, user);
        return ResponseEntity.ok("liked");
    }
}
