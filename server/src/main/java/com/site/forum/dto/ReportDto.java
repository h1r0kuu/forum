package com.site.forum.dto;

import com.site.forum.entity.ProfileComment;
import com.site.forum.entity.Report;
import com.site.forum.entity.User;
import com.site.forum.enums.ReportEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

@Data
@ToString
@EqualsAndHashCode
public class ReportDto {
    private Long id;
    private String text;
    private ReportEntity entity;
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
