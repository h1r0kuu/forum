package com.site.forum.dto;

import com.site.forum.entity.Report;
import com.site.forum.entity.User;
import com.site.forum.enums.ReportEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@ToString
@EqualsAndHashCode
public class ReportDto {
    private Long id;
    @Size(min = 3, max = 255, message = "The text must be between 3 and 255 characters long")
    private String text;
    @NotNull(message = "Entity cannot be null")
    private ReportEntity entity;
    @NotNull(message = "Object id cannot be null")
    private Integer objectId;
    private User user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ReportDto convertToDto(Report report) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(report, ReportDto.class);
    }

    public Report convertToEntity(ReportDto profileCommentDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(profileCommentDto, Report.class);
    }
}
