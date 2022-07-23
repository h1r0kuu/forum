package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.ForumDto;
import com.site.forum.dto.PostDto;

import java.io.IOException;
import java.util.ArrayList;

public class ForumDtoSerializer extends StdSerializer<ForumDto> {

    protected ForumDtoSerializer() {super(ForumDto.class);}

    public static void defaultSerialize(ForumDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("title", value.getTitle());
        jsonGenerator.writeNumberField("postsCount", value.getPosts().size());

        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());
    }

        @Override
    public void serialize(ForumDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(value, jsonGenerator, provider);

        jsonGenerator.writeArrayFieldStart("subForum");
        for(ForumDto forumDto : value.getSubForums()) {
            jsonGenerator.writeStartObject();
            defaultSerialize(forumDto, jsonGenerator, provider);
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeObjectFieldStart("lastPost");
        if(value.getPosts().size() > 0) {
            PostDto lastPost = new ArrayList<>(value.getPosts()).get(value.getPosts().size() - 1);
            PostDtoSerializer.defaultSerialize(lastPost, jsonGenerator, provider);
        }
        jsonGenerator.writeEndObject();

        jsonGenerator.writeEndObject();
    }
}
