package com.site.forum.controller;

import com.site.forum.dto.PostDto;
import com.site.forum.dto.UserDto;
import com.site.forum.service.PostService;
import com.site.forum.service.UserService;
import com.site.forum.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SearchController {

    private final UserService userService;
    private final PostService postService;

    private final Mapper mapper;
    @GetMapping("/search")
    public ResponseEntity<HashMap<String, Object>> search(@RequestParam("query") String query,
                                                          @PageableDefault(size = 5, sort = "createdAt") Pageable pageable) {
        HashMap<String, Object> res = new HashMap<>();

        Page<UserDto> foundUsers = userService.searchUserByUsernameLike(query, pageable)
                                            .map(u -> mapper.convertTo(u, UserDto.class));
        Page<PostDto> foundPosts = postService.searchPostByTitleLike(query, pageable)
                                               .map(p -> mapper.convertTo(p, PostDto.class));

        res.put("users", foundUsers);
        res.put("posts", foundPosts);

        return ResponseEntity.ok(res);
    }
}
