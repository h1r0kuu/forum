package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.ChatDto;
import com.site.forum.dto.ChatMessageDto;
import com.site.forum.dto.UserDto;

import java.io.IOException;

public class ChatDtoSerializer extends StdSerializer<ChatDto> {
    protected ChatDtoSerializer() {super(ChatDto.class);}

    public static void defaultSerialize(ChatDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());

    }

    @Override
    public void serialize(ChatDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(value, jsonGenerator, provider);

        jsonGenerator.writeArrayFieldStart("messages");
        for(ChatMessageDto chatMessageDto : value.getMessages()) {
            jsonGenerator.writeStartObject();
            ChatMessageDtoSerializer.defaultSerialize(chatMessageDto, jsonGenerator, provider);
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeArrayFieldStart("users");
        for(UserDto user : value.getUsers()) {
            jsonGenerator.writeStartObject();
            UserDtoSerializer.defaultSerialize(user, jsonGenerator, provider);
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}
