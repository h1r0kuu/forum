package com.site.forum.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class MessageModel {
    private String sender;
    private String receiver;
    private String text;

}
