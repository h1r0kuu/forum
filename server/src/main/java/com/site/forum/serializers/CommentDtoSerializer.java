package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.CommentDto;

import java.io.IOException;

public class CommentDtoSerializer extends StdSerializer<CommentDto> {

    protected CommentDtoSerializer() {
        super(CommentDto.class);
    }

    public static void defaultSerialize(CommentDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("text", value.getText());

        jsonGenerator.writeObjectFieldStart("user");
        UserDtoSerializer.defaultSerialize(value.getUser(),jsonGenerator,serializerProvider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeNumberField("likesCount", value.getLikes().size());
        jsonGenerator.writeNumberField("dislikesCount", value.getDislikes().size());
        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());
    }

    @Override
    public void serialize(CommentDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(value, jsonGenerator, serializerProvider);

        if(value.getParentComment() != null) {
            jsonGenerator.writeObjectFieldStart("parent_comment");
            defaultSerialize(value.getParentComment(), jsonGenerator, serializerProvider);
            jsonGenerator.writeEndObject();
        } else {
            jsonGenerator.writeNullField("parent_comment");
        }

        jsonGenerator.writeArrayFieldStart("replies");
        if(value.getReplies().size() > 0 && value.getReplies() != null) {
            for(CommentDto reply : value.getReplies()) {
                jsonGenerator.writeStartObject();
                defaultSerialize(reply,jsonGenerator,serializerProvider);
                jsonGenerator.writeEndObject();
            }
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}
