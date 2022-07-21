package com.site.forum.service;

import com.site.forum.entity.Report;
import com.site.forum.enums.ReportEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReportService {
    Report create(Report report);
    Page<Report> getAll(Pageable pageable);
    Page<Report> findReportsByEntity(ReportEntity entity, Pageable pageable);
}
