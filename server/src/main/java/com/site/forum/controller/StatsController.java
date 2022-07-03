package com.site.forum.controller;

import com.site.forum.service.PostService;
import com.site.forum.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Cacheable(value = "stats")
public class StatsController {

    private final PostService postService;
    private final UserService userService;

    @GetMapping("/stats")
    public ResponseEntity<HashMap<String, Integer>> statistics() {
        HashMap<String, Integer> res = new HashMap<>();
        res.put("posts", postService.getAll().size());
        res.put("users", userService.getAll().size());
        return ResponseEntity.ok(res);
    }
}
