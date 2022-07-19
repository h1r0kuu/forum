package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.ChatMessageDto;

import java.io.IOException;

public class ChatMessageDtoSerializer extends StdSerializer<ChatMessageDto> {
    protected ChatMessageDtoSerializer() {super(ChatMessageDto.class);}

    public static void defaultSerialize(ChatMessageDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("text", value.getText());
        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());
    }

    @Override
    public void serialize(ChatMessageDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(value, jsonGenerator, provider);

        jsonGenerator.writeObjectFieldStart("chat");
        ChatDtoSerializer.defaultSerialize(value.getChat(), jsonGenerator, provider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeObjectFieldStart("author");
        UserDtoSerializer.defaultSerialize(value.getAuthor(), jsonGenerator, provider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeEndObject();
    }
}
