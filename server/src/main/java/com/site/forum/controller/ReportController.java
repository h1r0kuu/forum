package com.site.forum.controller;

import com.site.forum.dto.ReportDto;
import com.site.forum.entity.Report;
import com.site.forum.enums.ReportEntity;
import com.site.forum.service.ReportService;
import com.site.forum.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public ResponseEntity<Page<ReportDto>> getReports(@RequestParam("entity_type") @Nullable ReportEntity entityType,
                                                      @PageableDefault(sort = "createdAt") Pageable pageable) {
        Page<ReportDto> reports;
        if (Objects.nonNull(entityType)) {
            reports = reportService.findReportsByEntity(entityType, pageable)
                    .map(r -> mapper.convertTo(r, ReportDto.class));
        } else {
            reports = reportService.getAll(pageable)
                    .map(r -> mapper.convertTo(r, ReportDto.class));
        }
        return ResponseEntity.ok(reports);
    }
}
