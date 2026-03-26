document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-container input");
  const searchIcon = document.querySelector(".search-icon");
  const recentList = document.getElementById("recentList");

  // 검색어를 리스트에 추가하는 함수
  function addSearchKeyword() {
    const keyword = searchInput.value.trim();

    if (keyword !== "") {
      // 1. 새로운 li 요소 생성
      const li = document.createElement("li");
      li.innerHTML = `
        ${keyword}
        <span class="material-symbols-outlined close-btn">close</span>
      `;

      // 2. 리스트의 맨 앞(최상단)에 추가
      recentList.insertBefore(li, recentList.firstChild);

      // 3. 입력창 비우기
      searchInput.value = "";

      // 4. 새로 추가된 삭제(X) 버튼에 이벤트 연결
      li.querySelector(".close-btn").addEventListener("click", () => {
        li.remove();
      });
    } else {
      alert("검색어를 입력해주세요!");
    }
  }

  // 엔터 키를 눌렀을 때 실행
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addSearchKeyword();
    }
  });

  // 돋보기 아이콘을 클릭했을 때 실행
  searchIcon.addEventListener("click", () => {
    addSearchKeyword();
  });

  // 기존에 HTML에 이미 있던 삭제(X) 버튼들도 작동하게 설정
  const existingCloseBtns = document.querySelectorAll(".close-btn");
  existingCloseBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest("li").remove();
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-container input");
  const searchIcon = document.querySelector(".search-icon");
  const recentList = document.getElementById("recentList"); // <ul> 또는 검색어 감싸는 부모 요소

  // [기능 1] 검색어 추가 함수
  function addSearchKeyword() {
    const keyword = searchInput.value.trim();

    if (keyword !== "") {
      // 새로운 검색어 태그(li) 생성
      const li = document.createElement("li");
      li.innerHTML = `
                ${keyword}
                <span class="material-symbols-outlined close-btn">close</span>
            `;

      // 리스트의 맨 앞에 추가
      recentList.insertBefore(li, recentList.firstChild);

      // 입력창 초기화
      searchInput.value = "";

      // 새로 생긴 X 버튼에 삭제 이벤트 연결
      const newCloseBtn = li.querySelector(".close-btn");
      newCloseBtn.addEventListener("click", () => {
        li.remove();
      });
    }
  }

  // [기능 2] 최근 기록 삭제 이벤트 연결 (기존 항목들)
  // 화면에 이미 그려져 있는 X 버튼들도 작동하게 합니다.
  const setupDeleteEvents = () => {
    const closeBtns = document.querySelectorAll(".close-btn");
    closeBtns.forEach((btn) => {
      btn.onclick = function () {
        // 버튼을 감싸고 있는 가장 가까운 li(검색어 박스)를 삭제
        const targetItem = this.closest("li");
        if (targetItem) {
          targetItem.remove();
        }
      };
    });
  };

  // [이벤트 리스너]
  // 1. 엔터키 입력 시
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addSearchKeyword();
  });

  // 2. 돋보기 아이콘 클릭 시
  if (searchIcon) {
    searchIcon.addEventListener("click", addSearchKeyword);
  }

  // 3. 초기 실행 (페이지 로드 시 기존 버튼들 이벤트 연결)
  setupDeleteEvents();
});
