package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.NotificationDto;

import java.io.IOException;

public class NotificationDtoSerializer extends StdSerializer<NotificationDto> {

    protected NotificationDtoSerializer() {
        super(NotificationDto.class);
    }

    public void defaultSerialize(NotificationDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("text", value.getText());
        jsonGenerator.writeBooleanField("isRead", value.isRead());
        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());
    }

    @Override
    public void serialize(NotificationDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(value, jsonGenerator, serializerProvider);

        jsonGenerator.writeObjectFieldStart("user");
        UserDtoSerializer.defaultSerialize(value.getUser(),jsonGenerator,serializerProvider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeEndObject();
    }
}
