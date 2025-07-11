package com.KDT.mosi.domain.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Rbbs {
  private Long rbbsId;
  private Long bbsId;
  private String status;
  private Long memberId;
  private String bcontent;
  private Long prbbsId;
  private Long bgroup;
  private Long step;
  private Long bindent;
  private LocalDateTime createDate;
  private LocalDateTime updateDate;
}
