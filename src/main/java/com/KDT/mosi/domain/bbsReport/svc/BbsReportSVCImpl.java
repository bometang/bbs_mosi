package com.KDT.mosi.domain.bbsReport.svc;

import com.KDT.mosi.domain.bbsReport.dao.BbsReportDAO;
import com.KDT.mosi.domain.entity.BbsReport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BbsReportSVCImpl implements BbsReportSVC {
  private final BbsReportDAO bbsReportDAO;

  @Override
  public String report(BbsReport bbsReport) {
    return bbsReportDAO.report(bbsReport);
  }

  @Override
  public int getTotalCountReport(Long bbsId) {
    return bbsReportDAO.getTotalCountReport(bbsId);
  }
}
