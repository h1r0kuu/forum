package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.NotificationDto;
import com.site.forum.dto.UserDto;
import java.io.IOException;

public class UserDtoSerializer extends StdSerializer<UserDto> {
    protected UserDtoSerializer() {
        super(UserDto.class);
    }

    public void defaultSerialize(UserDto user, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", user.getId());
        jsonGenerator.writeStringField("username", user.getUsername());
        jsonGenerator.writeStringField("password", user.getPassword());
        jsonGenerator.writeStringField("imagePath", user.getImagePath());
        jsonGenerator.writeNumberField("commentsCount", user.getCommentsCount());
        jsonGenerator.writeNumberField("hiddenPostsCount", user.getHiddenPostsCount());
        jsonGenerator.writeStringField("role", user.getRole().name());
        jsonGenerator.writeStringField("createdAt", user.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", user.getUpdatedAt().toString());
    }

    @Override
    public void serialize(UserDto user, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(user, jsonGenerator, serializerProvider);

        jsonGenerator.writeArrayFieldStart("followers");
        if(user.getFollowers().size() > 0 && user.getFollowers() != null) {
            for(UserDto follower : user.getFollowers()) {
                jsonGenerator.writeStartObject();
                defaultSerialize(follower, jsonGenerator, serializerProvider);
                jsonGenerator.writeEndObject();
            }
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeArrayFieldStart("following");
        if(user.getFollowing().size() > 0 && user.getFollowing() != null) {
            for(UserDto following : user.getFollowing()) {
                jsonGenerator.writeStartObject();
                defaultSerialize(following, jsonGenerator, serializerProvider);
                jsonGenerator.writeEndObject();
            }
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeArrayFieldStart("notifications");
        NotificationDtoSerializer notificationDtoSerializer = new NotificationDtoSerializer();
        if(user.getNotifications().size() > 0 && user.getNotifications() != null) {
            for(NotificationDto notification : user.getNotifications()) {
                jsonGenerator.writeStartObject();
                notificationDtoSerializer.defaultSerialize(notification,jsonGenerator,serializerProvider);
                jsonGenerator.writeEndObject();
            }
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}
