package com.site.forum.exception;

import org.springframework.security.authentication.LockedException;

public class PostIsClosedException extends LockedException {
    public PostIsClosedException(String msg) {
        super(msg);
    }
}
