package com.site.forum.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.site.forum.dto.ReportDto;

import java.io.IOException;

public class ReportDtoSerializer extends StdSerializer<ReportDto> {
    protected ReportDtoSerializer() {super(ReportDto.class);}

    public static void defaultSerialize(ReportDto value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumberField("id", value.getId());
        jsonGenerator.writeStringField("text", value.getText());
        jsonGenerator.writeStringField("entity", value.getEntity().toString());
        jsonGenerator.writeNumberField("objectId", value.getObjectId());
        jsonGenerator.writeStringField("createdAt", value.getCreatedAt().toString());
        jsonGenerator.writeStringField("updatedAt", value.getUpdatedAt().toString());
    }

        @Override
    public void serialize(ReportDto value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartObject();

        defaultSerialize(value, jsonGenerator, provider);

        jsonGenerator.writeObjectFieldStart("user");
        UserDtoSerializer.defaultSerialize(value.getUser(), jsonGenerator, provider);
        jsonGenerator.writeEndObject();

        jsonGenerator.writeEndObject();
    }
}
