package com.site.forum.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class ChatModel {
    private List<String> usernames;
}
