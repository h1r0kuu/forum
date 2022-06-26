package com.site.forum.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.NoSuchElementException;

@ControllerAdvice
@ResponseStatus
public class RestException {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<HashMap<String, String>> noSuchElementException(NoSuchElementException exception, WebRequest request) {
        HashMap<String, String> error = new HashMap<>();
        error.put("status_code", HttpStatus.NOT_FOUND.toString());
        error.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(PostIsClosedException.class)
    public ResponseEntity<HashMap<String, String>> postIsClosedException(PostIsClosedException exception, WebRequest request) {
        HashMap<String, String> error = new HashMap<>();
        error.put("status_code", HttpStatus.LOCKED.toString());
        error.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.LOCKED).body(error);
    }

    @ExceptionHandler(UserNotAuthorized.class)
    public ResponseEntity<HashMap<String, String>> userNotAuthorized(UserNotAuthorized exception, WebRequest request) {
        HashMap<String, String> error = new HashMap<>();
        error.put("status_code", HttpStatus.LOCKED.toString());
        error.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
}