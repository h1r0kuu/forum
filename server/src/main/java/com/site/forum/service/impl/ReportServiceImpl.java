package com.site.forum.service.impl;

import com.site.forum.dao.ReportRepository;
import com.site.forum.entity.Report;
import com.site.forum.enums.ReportEntity;
import com.site.forum.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository repository;

    @Override
    public Report create(Report report) {
        return repository.save(report);
    }

    @Override
    public List<Report> getAll() {
        return repository.findAll();
    }

    @Override
    public List<Report> findReportsByEntity(ReportEntity entity) {
        return repository.getReportsWhereEntity(entity);
    }
}
