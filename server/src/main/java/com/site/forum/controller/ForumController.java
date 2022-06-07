package com.site.forum.controller;

import com.site.forum.dto.ForumDto;
import com.site.forum.entity.Forum;
import com.site.forum.service.impl.ForumServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/forums")
@RequiredArgsConstructor
public class ForumController {
    private final ForumServiceImpl forumService;
    private final ForumDto forumDto = new ForumDto();

    @PostMapping(value = "/create")
    public ResponseEntity<ForumDto> create(@RequestBody ForumDto forumDto) {
        Forum createdForum = forumService.create( forumDto.convertToEntity(forumDto) );
        return ResponseEntity.ok( forumDto.convertToDto(createdForum) );
    }

    @GetMapping("/all")
    public ResponseEntity<List<ForumDto>> getForums() {
        List<ForumDto> forums = forumService.getAll().stream()
                                               .map(forumDto::convertToDto)
                                               .toList();
        return ResponseEntity.ok(forums);
    }
}
