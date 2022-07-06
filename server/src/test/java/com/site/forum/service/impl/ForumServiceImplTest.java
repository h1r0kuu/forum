package com.site.forum.service.impl;

import com.site.forum.dao.ForumRepository;
import com.site.forum.entity.Forum;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;

@SpringBootTest
@RunWith(SpringRunner.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@TestPropertySource("/application-test.properties")
public class ForumServiceImplTest {

    private ForumServiceImpl forumService;

    @Autowired
    private ForumRepository forumRepository;

    @Before
    public void init() {
        forumService = new ForumServiceImpl(forumRepository);
    }

    @Test
    public void getById() {
        Forum forum2 = forumService.create(new Forum(1L, "test", null, null, null, null, null));
        System.out.println(forum2.getId());
        Forum forum = forumService.getById(1L);

        assertEquals(1L, forum.getId());
    }

    @Test
    public void shouldThrowNoSuchElementException() {
        assertThrows(NoSuchElementException.class, ()->forumService.getById(123L));
    }

    @Test
    public void shouldReturnAllForumsCount() {
        forumService.create(new Forum(1L, "test", null, null, null, null, null));
        forumService.create(new Forum(2L, "test", null, null, null, null, null));
        forumService.create(new Forum(3L, "test", null, null, null, null, null));
        forumService.create(new Forum(4L, "test", null, null, null, null, null));

        assertEquals(4,forumService.getAll().size());
    }

    @Test
    public void shouldReturnSubForumsCount() {
        Set<Forum> subForums = new HashSet<>();
        Forum first = forumService.create(new Forum(1L, "test", null, null, null, null, null));
        Forum second = forumService.create(new Forum(2L, "test", null, null, null, null, null));
        subForums.add(first);
        subForums.add(second);

        forumService.create(new Forum(3L, "test", subForums, null, null, null, null));

        Forum forum = forumService.getById(3L);
        assertEquals(2, forum.getSubForums().size());
    }

    @Test
    public void shouldReturnTrueIfForumIsSubForum() {
        Set<Forum> subForums = new HashSet<>();
        Forum forum = forumService.create(new Forum(1L, "test", null, null, null, null, null));
        subForums.add(forum);
        forumService.create(new Forum(2L, "test", subForums, null, null, null, null));

        assertTrue(forumService.isForumASubForum(1L));
    }
}
