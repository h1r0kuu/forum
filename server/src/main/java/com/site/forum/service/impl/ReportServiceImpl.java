package com.site.forum.service.impl;

import com.site.forum.dao.ReportRepository;
import com.site.forum.entity.Report;
import com.site.forum.enums.ReportEntity;
import com.site.forum.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Report> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Page<Report> findReportsByEntity(ReportEntity entity, Pageable pageable) {
        return repository.getReportsWhereEntity(entity, pageable);
    }
}
