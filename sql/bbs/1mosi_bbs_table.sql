--테이블 삭제				
drop table bbs_like;				
DROP TABLE bbs_report;				
drop table bbs;				
				
DROP TABLE member_role;
DROP TABLE ROLE;
DROP TABLE MEMBER;
DROP SEQUENCE member_member_id_seq;

--시퀀스삭제				
drop sequence bbs_bbs_id_seq;	

DROP TABLE code;

-- MEMBER 테이블
CREATE TABLE MEMBER (
  MEMBER_ID    NUMBER(10)               NOT NULL,
  EMAIL        VARCHAR2(40)             NOT NULL,
  NAME         VARCHAR2(50)             NOT NULL,
  PASSWD       VARCHAR2(12)             NOT NULL,
  TEL          VARCHAR2(13),
  NICKNAME     VARCHAR2(30),
  GENDER       VARCHAR2(6)              CHECK (GENDER IN ('남자','여자')),
  ADDRESS      VARCHAR2(200)            NOT NULL,
  PIC          BLOB,
  CREATE_DATE  TIMESTAMP                DEFAULT SYSTIMESTAMP NOT NULL,
  UPDATE_DATE  TIMESTAMP                DEFAULT SYSTIMESTAMP NOT NULL,
  CONSTRAINT PK_MEMBER        PRIMARY KEY (MEMBER_ID),
  CONSTRAINT UK_MEMBER_EMAIL  UNIQUE     (EMAIL)
);
-- 시퀀스 생성
CREATE SEQUENCE member_member_id_seq;

-- ROLE 테이블
CREATE TABLE ROLE (
  ROLE_ID    VARCHAR2(11)  NOT NULL,
  ROLE_NAME  VARCHAR2(50)  NOT NULL,
  CONSTRAINT PK_ROLE       PRIMARY KEY (ROLE_ID)
);


-- MEMBER_ROLE 테이블 (회원·역할 매핑)
CREATE TABLE MEMBER_ROLE (
  MEMBER_ID  NUMBER(10)    NOT NULL,
  ROLE_ID    VARCHAR2(11)  NOT NULL,
  CONSTRAINT PK_MEMBER_ROLE           PRIMARY KEY (MEMBER_ID, ROLE_ID),
  CONSTRAINT FK_MR_ROLE               FOREIGN KEY (ROLE_ID)   REFERENCES ROLE   (ROLE_ID)
);

ALTER TABLE MEMBER_ROLE
ADD CONSTRAINT FK_MR_MEMBER
  FOREIGN KEY (MEMBER_ID)
  REFERENCES MEMBER (MEMBER_ID)
  ON DELETE CASCADE;

--------------------------------------------------------				
--코드				
--------------------------------------------------------				
create table code(				
code_id     varchar2(11) PRIMARY KEY,       --코드				
DECODE      varchar2(30) NOT null,          --코드명				
discript    clob,                           --코드설명				
pcode_id    varchar2(11),                   --상위코드				
useyn       char(1) default 'Y' NOT null,   --사용여부 (사용:'Y',미사용:'N')				
cdate       timestamp default systimestamp,				
udate       timestamp				
);				
--외래키				
alter table code				
add constraint fk_code_pcode_id				
foreign key(pcode_id)				
references code(code_id);				
				
--제약조건				
alter table code add constraint code_useyn_ck check(useyn in ('Y','N'));				
--------------------------------------------------------							

--------------------------------------------------------
--게시판
--------------------------------------------------------
create table bbs(
BBS_ID       number(10)    PRIMARY KEY,
BCATEGORY    varchar2(11)  NOT null,
status       varchar2(11)  NOT NULL,
title        varchar2(100) NOT null,
member_id    number(10)    NOT null,
hit          number(5)     DEFAULT 0 NOT null,				
bcontent     clob          NOT null,				
pbbs_id      number(10),				
bgroup       number(10)		NOT null,		
step         number(3)		NOT null,		
bindent      number(3)		NOT null,		
CREATE_DATE  timestamp    default systimestamp,				
UPDATE_DATE  timestamp    default systimestamp				
);				
-- 작성자 아이디 외래키 지정				
ALTER TABLE bbs				
ADD CONSTRAINT fk_bbs_md				
FOREIGN KEY (member_id)				
REFERENCES member(member_id);				
				
-- 상태코드 외래키 지정				
ALTER TABLE bbs				
ADD CONSTRAINT fk_bbs_BC				
FOREIGN KEY (BCATEGORY)				
REFERENCES code(code_id);				
--				
				
-- 상태코드 외래키 지정				
ALTER TABLE bbs				
ADD CONSTRAINT fk_bbs_status				
FOREIGN KEY (status)				
REFERENCES code(code_id);				
--				
				
-- 상태코드 외래키 지정				
ALTER TABLE bbs				
ADD CONSTRAINT fk_bbs_PD				
FOREIGN KEY (PBBS_ID)				
REFERENCES bbs(BBS_ID);				
--				
				
--시퀸스 생성				
CREATE SEQUENCE bbs_bbs_id_seq;				
--------------------------------------------------------				
				
				
--------------------------------------------------------				
--게시판 좋아요 테이블				
--------------------------------------------------------				
CREATE TABLE bbs_like (				
bbs_id       NUMBER(10)    NOT NULL,				
member_id    NUMBER(10)    NOT NULL,				
create_date  TIMESTAMP     DEFAULT SYSTIMESTAMP NOT NULL,				
CONSTRAINT pk_bbs_like       PRIMARY KEY (bbs_id, member_id)				
);				
				
-- 게시글 아이디 외래키 지정				
ALTER TABLE bbs_like				
ADD CONSTRAINT fk_bbs_like_bbs				
FOREIGN KEY (bbs_id)				
REFERENCES bbs(BBS_ID);				
--				
				
-- 작성자 아이디 외래키 지정				
ALTER TABLE bbs_like				
ADD CONSTRAINT fk_bbs_like_mem				
FOREIGN KEY (member_id)				
REFERENCES member(member_id);				
--------------------------------------------------------				
				
--------------------------------------------------------				
-- 게시판 신고 테이블				
--------------------------------------------------------				
CREATE TABLE bbs_report (				
bbs_id      NUMBER(10)    NOT NULL,				
member_id   NUMBER(10)    NOT NULL,				
reason      VARCHAR2(300) NULL,				
report_date TIMESTAMP     DEFAULT SYSTIMESTAMP NOT NULL,				
CONSTRAINT pk_bbs_report       PRIMARY KEY (bbs_id, member_id)				
);				
				
-- 게시글 아이디 외래키 지정				
ALTER TABLE bbs_report				
ADD CONSTRAINT fk_bbs_report_bbs				
FOREIGN KEY (bbs_id)				
REFERENCES bbs(BBS_ID);				
--				
				
-- 작성자 아이디 외래키 지정				
ALTER TABLE bbs_report				
ADD CONSTRAINT fk_bbs_report_mem				
FOREIGN KEY (member_id)				
REFERENCES member(member_id);				
--------------------------------------------------------				
