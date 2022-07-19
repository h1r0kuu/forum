package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.ProfileCommentDto;

import java.io.IOException;

public class ProfileCommentDtoSerializer extends StdSerializer<ProfileCommentDto> {
    protected ProfileCommentDtoSerializer() {super(ProfileCommentDto.class);}

    public static void defaultSerialize(ProfileCommentDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("text", value.getText());
        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());
    }

    @Override
    public void serialize(ProfileCommentDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartObject();

        jsonGenerator.writeObjectFieldStart("commentator");
        UserDtoSerializer.defaultSerialize(value.getCommentator(), jsonGenerator, provider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeObjectFieldStart("user");
        UserDtoSerializer.defaultSerialize(value.getUser(), jsonGenerator, provider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeEndObject();
    }
}
