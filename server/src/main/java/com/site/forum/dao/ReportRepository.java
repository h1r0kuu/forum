package com.site.forum.dao;

import com.site.forum.entity.Report;
import com.site.forum.enums.ReportEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT r FROM Report r WHERE r.entity = ?1")
    Page<Report> getReportsWhereEntity(ReportEntity entity, Pageable pageable);
}
