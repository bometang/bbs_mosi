package com.KDT.mosi.domain.bbs.dao;

import com.KDT.mosi.domain.entity.Bbs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@Repository
public class BbsDAOImpl implements BbsDAO {

  /**
   * 게시글 등록
   * @param bbs
   * @return
   */
  @Override
  public Long save(Bbs bbs) {
    return 0L;
  }

  @Override
  public List<Bbs> findAll() {
    return List.of();
  }

  @Override
  public List<Bbs> findAll(int pageNo, int numOfRows) {
    return List.of();
  }

  @Override
  public int getTotalCount() {
    return 0;
  }

  @Override
  public List<Bbs> findAll(String bcategory) {
    return List.of();
  }

  @Override
  public List<Bbs> findAll(String bcategory, int pageNo, int numOfRows) {
    return List.of();
  }

  @Override
  public int getTotalCount(String bcategory) {
    return 0;
  }

  @Override
  public Optional<Bbs> findById(Long id) {
    return Optional.empty();
  }

  @Override
  public int deleteById(Long id) {
    return 0;
  }

  @Override
  public int deleteByIds(List<Long> ids) {
    return 0;
  }

  @Override
  public int updateById(Long bbsId, Bbs bbs) {
    return 0;
  }
}
