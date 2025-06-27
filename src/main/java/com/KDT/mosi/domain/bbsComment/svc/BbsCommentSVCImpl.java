package com.KDT.mosi.domain.bbsComment.svc;

import com.KDT.mosi.domain.bbs.dao.BbsDAO;
import com.KDT.mosi.domain.bbs.svc.BbsSVC;
import com.KDT.mosi.domain.entity.Bbs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Repository
public class BbsCommentSVCImpl implements BbsSVC {
  private final BbsDAO bbsDAO;

  @Override
  public Long save(Bbs bbs) {
    return bbsDAO.save(bbs);
  }

  @Override
  public List<Bbs> findAll() {
    return bbsDAO.findAll();
  }

  @Override
  public List<Bbs> findAll(int pageNo, int numOfRows) {
    return bbsDAO.findAll(pageNo, numOfRows);
  }

  @Override
  public int getTotalCount() {
    return bbsDAO.getTotalCount();
  }

  @Override
  public List<Bbs> findAll(String bcategory) {
    return bbsDAO.findAll(bcategory);
  }

  @Override
  public List<Bbs> findAll(String bcategory, int pageNo, int numOfRows) {
    return bbsDAO.findAll(bcategory,pageNo,numOfRows);
  }

  @Override
  public int getTotalCount(String bcategory) {
    return bbsDAO.getTotalCount(bcategory);
  }

  @Override
  public Optional<Bbs> findById(Long id) {
    return bbsDAO.findById(id);
  }

  @Override
  public int deleteById(Long id) {
    return bbsDAO.deleteById(id);
  }

  @Override
  public int deleteByIds(List<Long> ids) {
    return bbsDAO.deleteByIds(ids);
  }

  @Override
  public int updateById(Long bbsId, Bbs bbs) {
    return bbsDAO.updateById(bbsId,bbs);
  }

  @Override
  public int updateStep(Long bgroup, Bbs parentBbs) {
    return bbsDAO.updateStep(bgroup,parentBbs);
  }

  @Override
  public int increaseHit(Long id) {
    return bbsDAO.increaseHit(id);
  }
}
