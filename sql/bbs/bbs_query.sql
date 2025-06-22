SELECT
  b.bbs_id as bbs_id,
  b.bcategory as bcategory,
  CASE
  	WHEN b.status = 'B0202' THEN '삭제된 게시글입니다.'
  	ELSE b.title
  END AS title,
  NVL(m.member_id, 0) AS member_id,
  b.create_date AS create_date,
  b.update_date as update_date,
  b.bindent
FROM bbs b
LEFT JOIN member m
  ON b.member_id = m.member_id
ORDER BY b.bgroup DESC, b.step ASC, b.bbs_id ASC;

SELECT
  b.bbs_id as bbs_id,
  b.bcategory as bcategory,
  b.pbbs_id AS pbbs_id,
  b.step AS step,
  b.bgroup AS bgroup,
  CASE
  	WHEN b.status = 'B0202' THEN '삭제된 게시글입니다.'
  	ELSE b.title
  END AS title,
  NVL(m.member_id, 0) AS member_id,
  b.create_date AS create_date,
  b.update_date as update_date,
  b.bindent
FROM bbs b
LEFT JOIN member m
  ON b.member_id = m.member_id
  WHERE bcategory = 'B0102'
ORDER BY b.bgroup DESC, b.step ASC, b.bbs_id ASC;



SELECT * FROM bbs;


SELECT
  b.bbs_id as bbs_id,
  b.bcategory as bcategory,
  CASE
  	WHEN b.status = 'B0202' THEN '삭제된 게시글입니다.'
  	ELSE b.title
  END AS title,
  NVL(m.member_id, 0) AS member_id,
  b.create_date AS create_date,
  b.update_date as update_date,
  b.bindent
FROM bbs b
LEFT JOIN member m
  ON b.member_id = m.member_id
    WHERE bcategory = 'B0102'
ORDER BY b.bgroup DESC, b.step ASC, b.bbs_id ASC
OFFSET (1 -1) * 10 ROWS
FETCH NEXT 10 ROWS only ;

SELECT count(bbs_id) FROM bbs WHERE bcategory = 'B0102';


SELECT
b.bbs_id as bbs_id,
b.bcategory as bcategory,
CASE
WHEN b.status = 'B0202' THEN '삭제된 게시글입니다.'
ELSE b.title
END AS title,
NVL(m.member_id, 0) AS member_id,
b.hit AS hit,
CASE
WHEN b.status = 'B0202'
THEN to_clob('삭제된 게시글입니다.')
ELSE b.bcontent
END AS bcontent,
b.pbbs_id AS pbbs_id,
b.bgroup AS bgroup,
b.step AS step,
b.bindent AS bindent,
b.create_date AS create_date,
b.update_date as update_date
FROM bbs b
LEFT JOIN member m
ON b.member_id = m.member_id
WHERE bbs_id = 98;

UPDATE bbs
SET status = 'B0202',update_date = systimestamp
WHERE bbs_id = 36;

SELECT * FROM bbs WHERE bbs_id =36;


