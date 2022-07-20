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

    public static void defaultSerialize(UserDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("username", value.getUsername());
        jsonGenerator.writeStringField("password", value.getPassword());
        jsonGenerator.writeStringField("imagePath", value.getImagePath());
        jsonGenerator.writeNumberField("commentsCount", value.getComments().size());
        jsonGenerator.writeNumberField("hiddenPostsCount", value.getHiddenPosts().size());
        jsonGenerator.writeNumberField("postsCount", value.getCreatedPosts().size());
        jsonGenerator.writeStringField("role", value.getRole().name());
        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());
    }

    @Override
    public void serialize(UserDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(value, jsonGenerator, serializerProvider);

        jsonGenerator.writeArrayFieldStart("followers");
        if(value.getFollowers().size() > 0 && value.getFollowers() != null) {
            for(UserDto follower : value.getFollowers()) {
                jsonGenerator.writeStartObject();
                defaultSerialize(follower, jsonGenerator, serializerProvider);
                jsonGenerator.writeEndObject();
            }
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeArrayFieldStart("following");
        if(value.getFollowing().size() > 0 && value.getFollowing() != null) {
            for(UserDto following : value.getFollowing()) {
                jsonGenerator.writeStartObject();
                defaultSerialize(following, jsonGenerator, serializerProvider);
                jsonGenerator.writeEndObject();
            }
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeArrayFieldStart("notifications");
        NotificationDtoSerializer notificationDtoSerializer = new NotificationDtoSerializer();
        if(value.getNotifications().size() > 0 && value.getNotifications() != null) {
            for(NotificationDto notification : value.getNotifications()) {
                jsonGenerator.writeStartObject();
                notificationDtoSerializer.defaultSerialize(notification,jsonGenerator,serializerProvider);
                jsonGenerator.writeEndObject();
            }
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}
