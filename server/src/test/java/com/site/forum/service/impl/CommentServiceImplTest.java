package com.site.forum.service.impl;

import com.site.forum.dao.CommentRepository;
import com.site.forum.dao.ForumRepository;
import com.site.forum.dao.PostRepository;
import com.site.forum.entity.Comment;
import com.site.forum.entity.Forum;
import com.site.forum.entity.Post;
import com.site.forum.exception.PostIsClosedException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@RunWith(SpringRunner.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@TestPropertySource("/application-test.properties")
public class CommentServiceImplTest {

    private PostServiceImpl postService;

    private ForumServiceImpl forumService;

    private CommentServiceImpl commentService;


    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ForumRepository forumRepository;


    private Post mainPost;

    @Before
    public void init() {
        commentService = new CommentServiceImpl(commentRepository);

        forumService = new ForumServiceImpl(forumRepository);
        postService = new PostServiceImpl(postRepository, forumService);

        Forum forum = forumService.create(new Forum(1L, "test", null, null, null, null, null));
        mainPost = postService.create(new Post(4L, "test", "test", true, forum, null, null, null, null, null, null, null));
    }

    @Test
    public void shouldReturnFalseIfPostIsClosed() {
        assertThrows(PostIsClosedException.class, () ->
                commentService.create(new Comment(1L, "test", null, null, null, null, null, null, null, null), mainPost)
        );
    }

}
