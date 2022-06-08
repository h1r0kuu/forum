package com.site.forum.controller;

import com.site.forum.dto.PostDto;
import com.site.forum.entity.Post;
import com.site.forum.service.impl.PostServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postService;

    private final PostDto postDto = new PostDto();

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
}
