package com.site.forum.service.impl;

import com.site.forum.dao.ForumRepository;
import com.site.forum.dao.PostRepository;
import com.site.forum.entity.Forum;
import com.site.forum.entity.Post;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@TestPropertySource("/application-test.properties")
public class PostServiceImplTest {

    @Autowired
    private PostServiceImpl postService;
    @Autowired

    private ForumServiceImpl forumService;

    @MockBean
    private PostRepository postRepository;

    @MockBean
    private ForumRepository forumRepository;

    private Forum mainForum;

    @Before
    public void init() {
//        forumService = new ForumServiceImpl(forumRepository);
//        postService = new PostServiceImpl(postRepository, forumService);
//        MockitoAnnotations.initMocks(this);

        mainForum = forumService.create(new Forum(1L, "test", null, null, null, null, null));
    }

//    @Test
//    void create() {
//        Forum forum = forumService.getById(post.getForum().getId());
//        if(forum == null) {
//            throw new NoSuchElementException("Forum doesn't exist");
//        }
//        return postRepository.save(post);
//    }

    @Test
    public void shouldReturnPostsCount() {
        postService.create(new Post(1L, "test", "test", false, mainForum, null, null, null, null, null, null, null));
        postService.create(new Post(2L, "test", "test", false, mainForum, null, null, null, null, null, null, null));
        postService.create(new Post(3L, "test", "test", false, mainForum, null, null, null, null, null, null, null));
        postService.create(new Post(4L, "test", "test", false, mainForum, null, null, null, null, null, null, null));

        assertEquals(4, postService.getAll().size());
    }

    @Test
    public void shouldThrowNoSuchElementException() {
        assertThrows(NoSuchElementException.class, ()->postService.getById(123L));
    }

    @Test
    public void shouldReturnAllPostsCountByForum() {
        postService.create(new Post(1L, "test", "test", false, mainForum, null, null, null, null, null, null, null));
        postService.create(new Post(2L, "test", "test", false, mainForum, null, null, null, null, null, null, null));
        postService.create(new Post(3L, "test", "test", false, mainForum, null, null, null, null, null, null, null));
        postService.create(new Post(4L, "test", "test", false, mainForum, null, null, null, null, null, null, null));

        assertEquals(4, postService.getByForumId(1L).size());
    }
}
