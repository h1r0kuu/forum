package com.site.forum.service.impl;

import com.site.forum.dao.ForumRepository;
import com.site.forum.entity.Forum;
import com.site.forum.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ForumServiceImpl implements ForumService {

    private final ForumRepository forumRepository;

    @Override
    public Forum create(Forum forum) {
        return forumRepository.save(forum);
    }

    @Override
    public void delete(Long id) {
        forumRepository.deleteById(id);
    }

    @Override
    public List<Forum> getAll() {
        return forumRepository.findAll();
    }

    @Override
    public Forum getById(Long id) {
        return forumRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Forum not founded")
        );
    }

    @Override
    public boolean isForumASubForum(Long forumId) {
        return forumRepository.isForumASubForum(forumId);
    }
}
