package com.KDT.mosi.domain.bbsComment.dao;

import com.KDT.mosi.domain.entity.BbsComment;
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
public class BbsCommentDAOImpl implements BbsCommentDAO {
  final private NamedParameterJdbcTemplate template;

  @Override
  public Long save(BbsComment bbsComment) {
    StringBuffer sql = new StringBuffer();
    sql.append("INSERT INTO post_comment (comment_id,post_id,parent_id,content,member_id) ");
    sql.append("VALUES (post_comment_comment_id_seq.nextval,:postId,:parentId,:content, :memberId) ");

    //BeanPropertySqlParameterSource : 자바객체 필드명과 SQL파라미터명이 같을때 자동 매칭함.
    SqlParameterSource param = new BeanPropertySqlParameterSource(bbsComment);

    // template.update()가 수행된 레코드의 특정 컬럼값을 읽어오는 용도(댓글 번호)
    KeyHolder keyHolder = new GeneratedKeyHolder();
    long rows = template.update(sql.toString(),param, keyHolder, new String[]{"comment_id"} );

    Number pidNumber = (Number)keyHolder.getKeys().get("comment_id");
    long pid = pidNumber.longValue();
    return pid;
  }

  @Override
  public List<BbsComment> findAll(Long id) {
    return List.of();
  }

  @Override
  public List<BbsComment> findAll(Long id, int pageNo, int numOfRows) {
    return List.of();
  }

  @Override
  public int getTotalCount(Long id) {
    return 0;
  }

  @Override
  public Optional<BbsComment> findById(Long id) {
    return Optional.empty();
  }

  @Override
  public int deleteById(Long id) {
    return 0;
  }

  @Override
  public int updateById(Long bbsCommentId, BbsComment bbsComment) {
    return 0;
  }

  @Override
  public int updateStep(Long bgroup, BbsComment pbbsComment) {
    return 0;
  }
}
