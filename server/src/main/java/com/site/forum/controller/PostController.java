package com.site.forum.controller;

import com.site.forum.dto.CommentDto;
import com.site.forum.dto.PostDto;
import com.site.forum.entity.Comment;
import com.site.forum.entity.Post;
import com.site.forum.service.impl.CommentServiceImpl;
import com.site.forum.service.impl.PostServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postService;
    private final CommentServiceImpl commentService;

    private final PostDto postDto = new PostDto();
    private final CommentDto commentDto = new CommentDto();

    @PostMapping(value = "/create")
    public ResponseEntity<PostDto> create(@RequestBody PostDto post) {
        Post createdPost = postService.create( postDto.convertToEntity(post) );
        return ResponseEntity.ok( postDto.convertToDto(createdPost) );
    }
    @GetMapping("/all")
    public ResponseEntity<List<PostDto>> getAll() {
            List<PostDto> posts = postService.getAll().stream()
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

    @GetMapping("/{id}/comments")
    public ResponseEntity<Set<CommentDto>> getPostComments(@PathVariable("id") Long id) {
        Set<CommentDto> comments = commentService.getByPostId(id).stream()
                                                                 .map(commentDto::convertToDto)
                                                                 .collect(Collectors.toSet());
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{id}/comments/create")
    public ResponseEntity<CommentDto> createComment(@PathVariable("id") Long id,
                                                    @RequestBody CommentDto commentDto) {
        Post post = postService.getById(id);
        Comment createdComment = commentService.create( commentDto.convertToEntity(commentDto) );
        return ResponseEntity.ok(commentDto.convertToDto(createdComment));
    }
}
