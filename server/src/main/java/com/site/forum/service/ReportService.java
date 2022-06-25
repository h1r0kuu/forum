package com.site.forum.service;

import com.site.forum.entity.Report;
import com.site.forum.enums.ReportEntity;

import java.util.List;

public interface ReportService {
    Report create(Report report);
    List<Report> getAll();
    List<Report> findReportsByEntity(ReportEntity entity);
}
