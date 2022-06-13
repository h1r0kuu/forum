package com.site.forum.service.impl;

import com.site.forum.dao.ForumRepository;
import com.site.forum.dto.ForumDto;
import com.site.forum.entity.Forum;
import com.site.forum.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ForumServiceImpl implements ForumService {

    private final ForumRepository forumRepository;

    @Override
    public Forum create(Forum forum) {
        Forum createdForum = forumRepository.save(forum);
        return createdForum;
    }

    @Override
    public void delete(Long id) {
        forumRepository.deleteById(id);
    }

    @Override
    public List<Forum> getAll() {
        List<Forum> forums = forumRepository.findAll();
        return forums;
    }

    @Override
    public Forum getById(Long id) {
        Forum forum = forumRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Forum not founded"));
        return forum;
    }
}
