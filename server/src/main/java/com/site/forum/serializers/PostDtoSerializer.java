package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.CommentDto;
import com.site.forum.dto.PostDto;

import java.io.IOException;

public class PostDtoSerializer extends StdSerializer<PostDto> {

    protected PostDtoSerializer() {
        super(PostDto.class);
    }

    public static void defaultSerialize(PostDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("title", value.getTitle());
        jsonGenerator.writeStringField("text", value.getText());
        jsonGenerator.writeBooleanField("closed", value.getClosed());


        jsonGenerator.writeNumberField("likesCount", value.getLikes().size());
        jsonGenerator.writeNumberField("dislikesCount", value.getDislikes().size());
        jsonGenerator.writeNumberField("viewsCount", value.getViews().size());
        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());
    }

    @Override
    public void serialize(PostDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartObject();
        defaultSerialize(value, jsonGenerator, provider);

        jsonGenerator.writeObjectFieldStart("forum");
        ForumDtoSerializer.defaultSerialize(value.getForum(), jsonGenerator, provider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeObjectFieldStart("creator");
        UserDtoSerializer.defaultSerialize(value.getCreator(),jsonGenerator, provider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeArrayFieldStart("comments");
        for(CommentDto commentDto : value.getComments()) {
            jsonGenerator.writeStartObject();
            CommentDtoSerializer.defaultSerialize(commentDto, jsonGenerator, provider);
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}
