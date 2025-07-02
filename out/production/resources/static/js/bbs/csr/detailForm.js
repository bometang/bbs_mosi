import { ajax,  PaginationUI} from '/js/common.js';
let currentPage = 1; // 현재 페이지를 위한 전역 변수
let initialPage = 1; // 게시글 추가 후 이동할 페이지 (1페이지)

const recordsPerPage = 10;        // 페이지당 레코드수
const pagesPerPage = 5;          // 한페이지당 페이지수

const board = document.querySelector(".board");     //게시판 클래스명으로 객체 가져오기
const pid = board.id;                               //id 추출로 게시판 아이디 저장



//게시글 조회
const getPostBoard = async pid => {
  try {
    const url = `/api/bbs/${pid}`;
    const result = await ajax.get(url);
    console.log(result);
    if (result.header.rtcd === 'S00') {
      return result.body;

    } else if(result.header.rtcd.substr(0,1) == 'E'){
        for(let key in result.header.details){
            console.log(`필드명:${key}, 오류:${result.header.details[key]}`);
        }
        return result.header.details;
    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.error(err);
  }
  return null;
};

//게시글 삭제
const delPostBoard = async pid => {
  try {
    const url = `/api/bbs/${pid}`;
    const result = await ajax.delete(url);
    console.log(result);
    if (result.header.rtcd === 'S00') {
      console.log(result.body);
      window.location.href = '/csr/boards';
    } else if(result.header.rtcd.substr(0,1) == 'E'){
        for(let key in result.header.details){
            console.log(`필드명:${key}, 오류:${result.header.details[key]}`);
        }
        return result.header.details;
    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.error(err);
  }
  return null;
};

//게시글 수정
const modifyPostBoard = async (pid, postBoard) => {
  try {
    console.log('modifyPostBoard 호출, pid=', pid, 'body=', postBoard);
    const url = `/api/bbs/${pid}`;
    const result = await ajax.patch(url, postBoard);
    if (result.header.rtcd === 'S00') {
      console.log(result.body);
       return result;
    } else if(result.header.rtcd.substr(0,1) == 'E'){
        for(let key in result.header.details){
            console.log(`필드명:${key}, 오류:${result.header.details[key]}`);
        }
        return result;
    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.log("수정 오류")
    console.error(err.message);
  }
};

//멤버id
const getMemberId = async () => {
  try {
    const url = `/api/member/me`;
    const result = await ajax.get(url);
    if (result.header.rtcd === 'S00') {
      console.log(result.body);
       return result.body;
    } else if(result.header.rtcd.substr(0,1) == 'E'){
        for(let key in result.header.details){
            console.log(`필드명:${key}, 오류:${result.header.details[key]}`);
        }
        return result;
    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.error(err.message);
  }
};

//게시글조회 화면
async function displayReadForm() {
  const postBoard = await getPostBoard(pid);
  //상태 : 조회 mode-read, 편집 mode-edit
  const changeEditMode = frm => {
    frm.classList.toggle('mode-edit', true);
    frm.classList.toggle('mode-read', false);
    [...frm.querySelectorAll('input,textarea')]
      .filter(input => !['bbsId', 'memberId', 'createDate', 'updateDate'].includes(input.name))
      .forEach(input => input.removeAttribute('readonly'));

    const $btns = frm.querySelector('.btns');
    $btns.innerHTML = `
      <button id="btnSave" type="button">저장</button>
      <button id="btnCancel" type="button">취소</button>
    `;

    const $btnSave = $btns.querySelector('#btnSave');
    const $btnCancel = $btns.querySelector('#btnCancel');

    //저장
    $btnSave.onclick = async e => {
      frm.querySelector('#errTitle').textContent = '';
      frm.querySelector('#errContent').textContent = '';

      const formData = new FormData(frm); //폼데이터가져오기
      const postBoard = {};

      [...formData.keys()].forEach(
        ele => (postBoard[ele] = formData.get(ele))
      );

      const result = await modifyPostBoard(postBoard.bbsId, postBoard);

      if (result.header.rtcd.startsWith('E')) {
        const details = result.header.details;
        if (details.title)  frm.querySelector('#errTitle').textContent   = details.title;
        if (details.bcontent) frm.querySelector('#errBContent').textContent = details.bcontent;
        return;
      }
      const updateDate = result.body.updateDate;
      frm.querySelector('input[name="updateDate"]').value = updateDate; //수정
      frm.querySelector('#errTitle').textContent   ='';
      frm.querySelector('#errBContent').textContent = '';
      changeReadMode(frm); //읽기모드
    };

    //취소
    $btnCancel.onclick = async e => {
      const postBoard = await getPostBoard(pid);
      frm.querySelector('#errTitle').textContent   ='';
      frm.querySelector('#errBContent').textContent = '';
      frm.reset(); //초기화
      console.log(postBoard.updateDate);
      frm.querySelector('input[name="updateDate"]').value = postBoard.updateDate;
      changeReadMode(frm);
    };
  };


  const changeReadMode = frm => {
    frm.classList.toggle('mode-read', true);
    frm.classList.toggle('mode-edit', false);
    [...frm.querySelectorAll('input,textarea')]
      .filter(input => !['bbsId', 'memberId', 'createDate', 'updateDate'].includes(input.name))
      .forEach(input => input.setAttribute('readonly', ''));

    const $btns = frm.querySelector('.btns');
    $btns.innerHTML = `
      <button id="btnEdit" type="button">수정</button>
      <button id="btnDelete" type="button">삭제</button>
    `;

    const $btnDelete = $btns.querySelector('#btnDelete');
    const $btnEdit = $btns.querySelector('#btnEdit');

    //수정
    $btnEdit.onclick = async () => {
      const memberId = await getMemberId();
      if(memberId !== postBoard.memberId) {
        alert('작성자만 수정할 수 있습니다.');
        return;
      }
      changeEditMode(frm);
    };

    //삭제
    $btnDelete.onclick = async ()  => {
      const postIdValue = frm.querySelector('input[name="bbsId"]').value;
      const memberId = await getMemberId();
      if (!postIdValue || isNaN(postIdValue)) {
        alert('유효한 게시글 아이디를 확인해주세요.');
        return;
      }
      if(memberId !== postBoard.memberId) {
        alert('작성자만 수정할 수 있습니다.');
        return;
      }

      const pid = frm.bbsId.value;
      if (!pid) {
        alert('게시글조회 후 삭제바랍니다.');
        return;
      }

      if (!confirm('삭제하시겠습니까?')) return;
      delPostBoard(pid);
    };
  };

  $readFormWrap.innerHTML = `
    <form id="frm2">

      <div>
          <label for="bbsId">게시글 아이디</label>
          <input type="text" id="bbsId" name="bbsId" value="${postBoard.bbsId}" readonly/>
      </div>
      <div>
          <label for="title">제목</label>
          <input type="text" id="title" name="title" value="${postBoard.title}" readonly/>
          <span class="field-error client" id="errTitle"></span>
      </div>
      <div>
          <label for="memberId">작성자</label>
          <input type="text" id="memberId" name="memberId" value="${postBoard.memberId}" readonly/>
      </div>
      <div>
          <label for="createDate">작성일</label>
          <input type="text" id="createDate" name="createDate" value="${postBoard.createDate}" readonly/>
      </div>
      <div>
          <label for="updateDate">수정일</label>
          <input type="text" id="updateDate" name="updateDate" value="${postBoard.updateDate}" readonly/>
      </div>
      <div>
          <label for="bcontent">내용</label>
          <textarea id="bcontent" name="bcontent" readonly>${postBoard.bcontent}</textarea>
          <span class="field-error client" id="errBContent"></span>
      </div>
      <div class='btns'></div>

    </form>
  `;
  const $frm2 = $readFormWrap.querySelector('#frm2');
  changeReadMode($frm2);
}
const $readFormWrap = document.createElement('div');
document.body.appendChild($readFormWrap);
displayReadForm();

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


const $list = document.createElement('div');
document.body.appendChild($list);

const divEle = document.createElement('div');
divEle.setAttribute('id','reply_pagenation');
document.body.appendChild(divEle);



//게시글 조회
const getPostComment = async (pid,rbbsId) => {
  console.log('pid:', pid, 'cid:', rbbsId);
  try {
    const url = `/api/bbs/${pid}/comments/${rbbsId}`;
    const result = await ajax.get(url);
    console.log(result);
    if (result.header.rtcd === 'S00') {
      console.log('pid:', pid, 'cid:', rbbsId);
      return result.body;

    } else if(result.header.rtcd.substr(0,1) == 'E'){
        for(let key in result.header.details){
            console.log(`필드명:${key}, 오류:${result.header.details[key]}`);
        }
        console.log('pid:aa');
        return result.header.details;
    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.error(err);
  }
  console.log('pid:az');
  return null;
};

//댓글 저장
const addPostComment = async (comment,$frm) => {
  try {
    const url = `/api/bbs/${pid}/comments`;
    const result = await ajax.post(url,comment);
    console.log(result);
    if (result.header.rtcd === 'S00') {
      console.log(result.body);
      frm.reset();
      initialPage = 1; // 생성 후 1페이지로 이동
      getPostCommentList(initialPage, recordsPerPage); // 첫 페이지의 기본 레코드로 호출
      configPagination();
    } else if(result.header.rtcd.substr(0,1) == 'E'){
        for(let key in result.header.details){
            console.log(`필드명:${key}, 오류:${result.header.details[key]}`);
        }
    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.error(err);
  }
};

//댓글 삭제
const delPostComment = async (pid, rbbsId) => {
  try {
    const url = `/api/bbs/${pid}/comments/${rbbsId}`;
    const result = await ajax.delete(url);
    console.log(result);
    if (result.header.rtcd === 'S00') {
      console.log(result.body);
      getPostCommentList(currentPage, recordsPerPage);
    } else if(result.header.rtcd.substr(0,1) == 'E'){
        for(let key in result.header.details){
            console.log(`필드명:${key}, 오류:${result.header.details[key]}`);
        }
    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.error(err);
  }
};

//댓글 수정
const modifyPostComment = async (pid,rbbsId ,content) => {
  try {
    console.log('modifyPostComment 호출, pid=', rbbsId,'cid=', pid, 'body=', content);
    const url = `/api/bbs/${pid}/comments/${rbbsId}`;
    const result = await ajax.patch(url, { content });
    if (result.header.rtcd === 'S00') {
      console.log(result.body);
       return result;
    } else if(result.header.rtcd.substr(0,1) == 'E'){
        for(let key in result.header.details){
            console.log(`필드명:${key}, 오류:${result.header.details[key]}`);
        }
        console.log(result.header);
        return result;
    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.error(err.message);
  }
};

//댓글목록
const getPostCommentList = async (reqPage, reqRec) => {

  try {
    const url = `/api/bbs/${pid}/comments/paging?pageNo=${reqPage}&numOfRows=${reqRec}`;
    const result = await ajax.get(url);

    if (result.header.rtcd === 'S00') {
      currentPage = reqPage; // 현재 페이지 업데이트
      displayPostCommentList(result.body);

    } else {
      alert(result.header.rtmsg);
    }
  } catch (err) {
    console.error(err);
  }
};

async function configPagination(){
  const url = `/api/bbs/${pid}/comments/totCnt`;
  try {
    const result = await ajax.get(url);

    const totalRecords = result.body; // 전체 레코드수

    const handlePageChange = (reqPage)=>{
      return getPostCommentList(reqPage,recordsPerPage);
    };

    // Pagination UI 초기화
    var pagination = new PaginationUI('reply_pagenation', handlePageChange);

    pagination.setTotalRecords(totalRecords);       //총건수
    pagination.setRecordsPerPage(recordsPerPage);   //한페이지당 레코드수
    pagination.setPagesPerPage(pagesPerPage);       //한페이지당 페이지수

    // 첫페이지 가져오기
    pagination.handleFirstClick();

  }catch(err){
    console.error(err);
  }
}














