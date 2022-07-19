package com.site.forum.controller;

import com.site.forum.dto.ReportDto;
import com.site.forum.entity.Report;
import com.site.forum.enums.ReportEntity;
import com.site.forum.service.ReportService;
import com.site.forum.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
@Cacheable(value = "reports")
public class ReportController {

    private final ReportService reportService;

    private final Mapper mapper;

    @PostMapping("/create")
    public ResponseEntity<ReportDto> create(@Valid @RequestBody ReportDto reportDto) {
        Report createdReport = reportService.create( mapper.convertTo(reportDto, Report.class) );
        return ResponseEntity.ok( mapper.convertTo(createdReport, ReportDto.class) );
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReportDto>> getReports(@RequestParam("entity_type") @Nullable ReportEntity entityType) {
        List<Report> reports;
        if (Objects.nonNull(entityType)) {
            reports = reportService.findReportsByEntity(entityType);
        } else {
            reports = reportService.getAll();
        }
        return ResponseEntity.ok( mapper.listConvertTo(reports, ReportDto.class) );
    }
}
