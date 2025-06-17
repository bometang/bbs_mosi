package com.KDT.mosi.domain.bbs.dao;

import com.KDT.mosi.domain.entity.Bbs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@Repository
public class BbsDAOImpl implements BbsDAO {
  final private NamedParameterJdbcTemplate template;

  /**
   * 게시글 등록
   * @param bbs
   * @return
   */
  @Override
  public Long save(Bbs bbs) {
    StringBuffer sql = new StringBuffer();
    sql.append("INSERT INTO bbs (bbs_id,bcategory,title,member_id,bcontent,pbbs_id,bgroup,step,bindent) ");
    sql.append("VALUES (bbs_bbs_id_seq.nextval,:bcategory,:title,:memberId,:bcontent,NULL,bbs_bbs_id_seq.CURRVAL,0,0) ");

    //BeanPropertySqlParameterSource : 자바객체 필드명과 SQL파라미터명이 같을때 자동 매칭함.
    SqlParameterSource param = new BeanPropertySqlParameterSource(postBoards);

    // template.update()가 수행된 레코드의 특정 컬럼값을 읽어오는 용도(게시글 번호)
    KeyHolder keyHolder = new GeneratedKeyHolder();
    long rows = template.update(sql.toString(),param, keyHolder, new String[]{"post_id"} );

    Number pidNumber = (Number)keyHolder.getKeys().get("post_id");
    long pid = pidNumber.longValue();
    return pid;
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
