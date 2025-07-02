// src/main/resources/static/js/bbs/csr/add.js
import { ajax } from '/js/common.js';

async function addBbs(data) {
  // 정식 등록 시 status=B0201
  data.status = 'B0201';
  console.log('▶ addBbs 호출, data=', data);
  const { header } = await ajax.post('/api/bbs', data);
  if (header.rtcd === 'S00') {
    window.location.href = '/csr/bbs';  // 등록 성공 후 목록으로
  } else {
    alert(header.rtmsg);
  }
}

async function saveDraft(data) {
  // 임시 저장 시 status=B0203
  data.status = 'B0203';
  console.log('▶ saveDraft 호출, data=', data);
  const { header } = await ajax.post('/api/bbs', data);
  if (header.rtcd === 'S00') {
    window.location.href = '/csr/bbs';
  } else {
    alert(header.rtmsg);
  }
}

async function displayForm() {
  console.log('▶ displayForm 시작');

  // 1) 폼 마크업 생성
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <form id="frm">
      <label>제목      <input    name="title"></label><br>
      <label>작성자    <input    name="memberId" readonly></label><br>
      <label>카테고리  <select  name="bcategory" id="bcategory">
        <option value="">--선택--</option>
      </select></label><br>
      <label>내용      <textarea name="bcontent"></textarea></label><br>
      <button type="submit" id="btnSubmit">등록</button>
      <button type="button"  id="btnDraft" >임시 저장</button>
    </form>
  `;
  document.body.prepend(wrap);

  // 2) 폼 요소 참조
  const frm            = wrap.querySelector('#frm');
  const memberInput    = wrap.querySelector('[name="memberId"]');
  const categorySelect = wrap.querySelector('#bcategory');
  const btnDraft       = wrap.querySelector('#btnDraft');

  // 3) 로그인 사용자 정보 로드
  console.log('  → 사용자 정보 로드 시도');
  try {
    const resUser = await ajax.get('/api/auth/user');
    console.log('     resUser=', resUser);
    if (resUser.header.rtcd === 'S00' && resUser.body) {
      memberInput.value = resUser.body.memberId;
    } else {
      memberInput.value = '비회원';
    }
  } catch (e) {
    console.error('유저 정보 로드 실패', e);
  }

  // 4) 카테고리 코드 로드 & 바인딩
  console.log('  → 카테고리 로드 시도');
  try {
    const resCat = await ajax.get('/api/bbs/categories');
    console.log('     resCat=', resCat);
    if (resCat.header.rtcd === 'S00' && Array.isArray(resCat.body)) {
      resCat.body.forEach(code => {
        const opt = document.createElement('option');
        opt.value       = code.codeId;   // ex: "B0101"
        opt.textContent = code.decode;   // ex: "장애인"
        categorySelect.appendChild(opt);
      });
    }
  } catch (e) {
    console.error('카테고리 로드 실패', e);
  }

  // 5) 정식 등록 핸들러
  frm.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(frm).entries());

    if (!data.title.trim())      return alert('제목은 필수입니다.');
    if (!data.bcategory.trim())  return alert('카테고리를 선택하세요.');
    if (!data.bcontent.trim())   return alert('내용은 필수입니다.');

    addBbs(data);
  });

  // 6) 임시 저장 핸들러
  btnDraft.addEventListener('click', () => {
    const data = Object.fromEntries(new FormData(frm).entries());

    // 제목/내용 둘 다 비어있으면 저장 막기
    if (!data.title.trim() && !data.bcontent.trim()) {
      return alert('제목 또는 내용을 입력해야 임시 저장할 수 있습니다.');
    }

    saveDraft(data);
  });

  console.log('▶ displayForm 끝');
}

// 페이지 로드 시 즉시 실행
displayForm();
