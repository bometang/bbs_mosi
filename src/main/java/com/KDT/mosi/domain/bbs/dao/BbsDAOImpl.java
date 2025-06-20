package com.KDT.mosi.domain.bbs.dao;

import com.KDT.mosi.domain.entity.Bbs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
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
   * @return 게시글 번호
   */
  @Override
  public Long save(Bbs bbs) {

    StringBuffer sql = new StringBuffer();
    boolean parentsBbs = bbs.getPbbsId() != null;

    // 게시글 등록시 일반글이면 if로 등록하고 답글이면 else로 등록함.
    if (!parentsBbs) {
      sql.append("INSERT INTO bbs (bbs_id,bcategory,title,member_id,bcontent,pbbs_id,bgroup,step,bindent) ");
      sql.append("VALUES (bbs_bbs_id_seq.nextval,:bcategory,:title,:memberId,:bcontent,null,bbs_bbs_id_seq.CURRVAL,0,0) ");
    } else {
      sql.append("INSERT INTO bbs (bbs_id,bcategory,title,member_id,bcontent,pbbs_id,bgroup,step,bindent) ");
      sql.append("VALUES (bbs_bbs_id_seq.nextval,:bcategory,:title,:memberId,:bcontent,:pbbsId,:bgroup,:step,:bindent) ");
    }

    SqlParameterSource param = new BeanPropertySqlParameterSource(bbs);


    KeyHolder keyHolder = new GeneratedKeyHolder();
    long rows = template.update(sql.toString(),param, keyHolder, new String[]{"bbs_id"} );

    Number pidNumber = (Number)keyHolder.getKeys().get("bbs_id");
    long pid = pidNumber.longValue();
    return pid;
  }

  @Override
  public List<Bbs> findAll() {
    //sql
    StringBuffer sql = new StringBuffer();
    sql.append("  SELECT b.bbs_id as bbs_id,b.bcategory as bcategory,b.title as title,m.member_id AS member_id,b.create_date AS create_date, b.update_date as update_date ");
    sql.append("FROM bbs b ");
    sql.append("JOIN left member m ");
    sql.append("ON b.member_id = m.member_id ");
    sql.append("ORDER BY post_id DESC ");

    //db요청
    List<Bbs> list = template.query(sql.toString(), BeanPropertyRowMapper.newInstance(Bbs.class));

    return list;
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
