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

    private void defaultSerialize(CommentDto comment, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", comment.getId());
        jsonGenerator.writeStringField("text", comment.getText());

        jsonGenerator.writeObjectFieldStart("user");
        UserDtoSerializer userDtoSerializer = new UserDtoSerializer();
        userDtoSerializer.defaultSerialize(comment.getUser(),jsonGenerator,serializerProvider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeNumberField("likesCount", comment.getLikesCount());
        jsonGenerator.writeNumberField("dislikesCount", comment.getDislikesCount());
        jsonGenerator.writeStringField("createdAt", comment.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", comment.getUpdatedAt().toString());
    }

    @Override
    public void serialize(CommentDto comment, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(comment, jsonGenerator, serializerProvider);

        if(comment.getParentComment() != null) {
            jsonGenerator.writeObjectFieldStart("parent_comment");
            defaultSerialize(comment.getParentComment(), jsonGenerator, serializerProvider);
            jsonGenerator.writeEndObject();
        } else {
            jsonGenerator.writeNullField("parent_comment");
        }

        jsonGenerator.writeArrayFieldStart("replies");
        if(comment.getReplies().size() > 0 && comment.getReplies() != null) {
            for(CommentDto reply : comment.getReplies()) {
                jsonGenerator.writeStartObject();
                defaultSerialize(reply,jsonGenerator,serializerProvider);
                jsonGenerator.writeEndObject();
            }
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}
