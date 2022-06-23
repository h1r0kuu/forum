package com.site.forum.service;

import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
    Post create(Post post);
    void delete(Long id);
    List<Post> getAll();
    Page<Post> getAll(Pageable pageable);
    Post getById(Long id);
    List<Post> getByForumId(Long forumId);
    Page<Post> getByForumIdAndPage(Long forumId, Pageable pageable);

    void like(Post post, User user);
    void dislike(Post post, User user);

    Page<Post> searchPostByTitleLike(String title, Pageable pageable);
}
