package com.KDT.mosi.domain.bbsComment.dao;

import com.KDT.mosi.domain.entity.BbsComment;

import java.util.List;
import java.util.Optional;

public interface BbsCommentDAO {
  //댓글등록
  Long save(BbsComment bbsComment);

  //댓글 목록
  List<BbsComment> findAll(Long id);

  List<BbsComment> findAll(Long id, int pageNo, int numOfRows);

  int getTotalCount(Long id);

  //댓글확인
  Optional<BbsComment> findById(Long id);

  //댓글삭제(단건)
  int deleteById(Long id);

  //댓글수정
  int updateById(Long bbsCommentId, BbsComment bbsComment);

  //답글 순서 조정
  int updateStep(Long bgroup, BbsComment pbbsComment);

}
