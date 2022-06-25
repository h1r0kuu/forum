package com.site.forum.controller;

import com.site.forum.dto.ReportDto;
import com.site.forum.entity.Report;
import com.site.forum.enums.ReportEntity;
import com.site.forum.service.impl.ReportServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportServiceImpl reportService;

    private final ReportDto reportDto = new ReportDto();

    @PostMapping("/create")
    public ResponseEntity<ReportDto> create(@RequestBody ReportDto reportDto) {
        Report createdReport = reportService.create( reportDto.convertToEntity(reportDto) );
        return ResponseEntity.ok(reportDto.convertToDto(createdReport));
    }

    @GetMapping("/all")
    public ResponseEntity<Set<ReportDto>> getReports(@RequestParam("entity_type") @Nullable ReportEntity entityType) {
        Set<ReportDto> reports = new HashSet<>();
        if (Objects.nonNull(entityType)) {
            reports = reportService.findReportsByEntity(entityType).stream()
                    .map(reportDto::convertToDto)
                    .collect(Collectors.toSet());
        } else {
            reports = reportService.getAll().stream()
                    .map(reportDto::convertToDto)
                    .collect(Collectors.toSet());
        }
        return ResponseEntity.ok(reports);
    }
}
