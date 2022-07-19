package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.enums.ReportEntity;
import com.site.forum.serializers.ReportDtoSerializer;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@ToString
@EqualsAndHashCode
@JsonSerialize(using = ReportDtoSerializer.class)
public class ReportDto {
    private Long id;
    @Size(min = 3, max = 255, message = "The text must be between 3 and 255 characters long")
    private String text;
    @NotNull(message = "Entity cannot be null")
    private ReportEntity entity;
    @NotNull(message = "Object id cannot be null")
    private Integer objectId;
    private UserDto user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
