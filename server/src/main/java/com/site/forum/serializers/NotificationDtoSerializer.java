package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.NotificationDto;
import com.site.forum.dto.UserDto;
import com.site.forum.entity.Notification;

import java.io.IOException;

public class NotificationDtoSerializer extends StdSerializer<NotificationDto> {

    protected NotificationDtoSerializer() {
        super(NotificationDto.class);
    }

    public void defaultSerialize(NotificationDto dto, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", dto.getId());
        jsonGenerator.writeStringField("text", dto.getText());
        jsonGenerator.writeBooleanField("isRead", dto.isRead());
        jsonGenerator.writeStringField("createdAt", dto.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", dto.getUpdatedAt().toString());
    }

    @Override
    public void serialize(NotificationDto dto, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        defaultSerialize(dto, jsonGenerator, serializerProvider);
        jsonGenerator.writeObjectFieldStart("user");
        UserDtoSerializer userDtoSerializer = new UserDtoSerializer();
        userDtoSerializer.defaultSerialize(dto.getUser(),jsonGenerator,serializerProvider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeEndObject();
    }
}
