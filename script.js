const grid = document.getElementById("productGrid");

// [1] 상품 데이터 렌더링
const productData = [
  {
    name: "나이키 에어포스 1 '07 로우 화이트",
    price: "100,000원",
    discount: "32%",
    img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400",
  },
  {
    name: "나이키 에어포스 1 '07 로우 트리플 블랙",
    price: "109,000원",
    discount: "26%",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
  },
];

function renderProducts() {
  grid.innerHTML = "";
  for (let i = 0; i < 15; i++) {
    const item = productData[i % productData.length];
    grid.innerHTML += `
      <div class="product-card">
        <div class="product-img"><img src="${item.img}&sig=${i}" style="width:100%; height:100%; object-fit:cover;"></div>
        <div class="product-info">
          <div class="brand-row">
            <span class="brand">Nike</span>
            <span class="material-symbols-outlined wish-icon">favorite_border</span>
          </div>
          <p class="name">${item.name}</p>
          <div class="price-row">
            ${item.discount ? `<span class="discount">${item.discount}</span>` : ""}
            <span class="price">${item.price}</span>
            <div class="extra-row">
  <span class="review">후기 1,234</span>
  <span class="wish-count">관심 2,345</span>
</div>
          </div>
        </div>
      </div>`;
  }
}
renderProducts();

// [2] 색상 데이터 생성
const colorData = [
  { name: "라벤더", hex: "#A58FCF" },
  { name: "민트", hex: "#81CBB0" },
  { name: "오렌지", hex: "#E85C2E" },
  { name: "다크핑크", hex: "#9D3E64" },
  { name: "페일 핑크", hex: "#D9B8A9" },
  { name: "골드", hex: "#E9D06D" },
  { name: "라임", hex: "#D9FF5C" },
  { name: "라이트 그린", hex: "#9ACD32" },
  { name: "다크 블루", hex: "#2E3192" },
  { name: "오트밀", hex: "#EAE7D6" },
  { name: "머스타드", hex: "#D9A53E" },
  { name: "피치", hex: "#F2BEA5" },
  { name: "딥레드", hex: "#8B0000" },
  { name: "다크 오렌지", hex: "#C45B25" },
  { name: "브릭", hex: "#9E4B44" },
  { name: "로즈골드", hex: "#B76E5B" },
  { name: "데님", hex: "#3F51B5" },
  { name: "카키 베이지", hex: "#968B4C" },
  { name: "라이트 오렌지", hex: "#FFAB91" },
  { name: "연청", hex: "#B0C4DE" },
];

const colorGrid = document.getElementById("colorSelectionGrid");
colorData.forEach((c) => {
  const div = document.createElement("div");
  div.className = "color-opt";
  div.innerHTML = `<div class="color-dot" style="background:${c.hex}"></div><span>${c.name}</span>`;
  colorGrid.appendChild(div);
});

// [3] 모달 제어
const colorBtn = document.getElementById("colorBtn");
const priceBtn = document.getElementById("priceBtn");
const sizeBtn = document.getElementById("sizeBtn");

const colorModal = document.getElementById("colorModal");
const priceModal = document.getElementById("priceModal");
const sizeModal = document.getElementById("sizeModal");

function closeAllModals() {
  colorModal.style.display = "none";
  priceModal.style.display = "none";
  sizeModal.style.display = "none";
}

colorBtn.onclick = () => {
  closeAllModals();
  colorModal.style.display = "flex";
};
priceBtn.onclick = () => {
  closeAllModals();
  priceModal.style.display = "flex";
};
sizeBtn.onclick = () => {
  closeAllModals();
  sizeModal.style.display = "flex";
};

window.onclick = (e) => {
  if (e.target.classList.contains("modal-overlay")) closeAllModals();
};
const sortBtn = document.getElementById("sortBtn");
const sortDropdown = document.getElementById("sortDropdown");

// 1. 인기순 버튼 클릭 시 드롭다운 토글
sortBtn.onclick = (e) => {
  e.stopPropagation(); // 부모로 이벤트 전파 방지
  sortDropdown.classList.toggle("show");
};

// 2. 메뉴 아이템 클릭 시 텍스트 변경 및 메뉴 닫기
document.querySelectorAll(".sort-item").forEach((item) => {
  item.onclick = (e) => {
    sortBtn.innerText = e.target.innerText + " ⇅";
    sortDropdown.classList.remove("show");
  };
});

// 3. 메뉴 외부 클릭 시 닫기
window.addEventListener("click", () => {
  sortDropdown.classList.remove("show");
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("wish-icon")) {
    e.target.classList.toggle("active");

    if (e.target.classList.contains("active")) {
      e.target.textContent = "favorite";
    } else {
      e.target.textContent = "favorite_border";
    }
  }
});
document.querySelector(".small-apply-btn").onclick = () => {
  const min = document.getElementById("minPrice").value;
  const max = document.getElementById("maxPrice").value;

  if (!min || !max) {
    alert("가격을 입력하세요");
    return;
  }

  console.log("최소 가격:", min);
  console.log("최대 가격:", max);
};
function onlyNumber(el) {
  // 숫자만 남기기
  el.value = el.value.replace(/[^0-9]/g, "");
}

// 입력할 때마다 적용
document.getElementById("minPrice").addEventListener("input", function () {
  onlyNumber(this);
});

document.getElementById("maxPrice").addEventListener("input", function () {
  onlyNumber(this);
});
document.querySelectorAll(".color-opt").forEach((item) => {
  item.addEventListener("click", function () {
    this.classList.toggle("selected");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".search-icon");
  const searchBox = document.getElementById("searchBox");
  const logo = document.querySelector(".logo");

  if (!searchIcon || !searchBox || !logo) return;

  searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    // 검색창 토글
    searchBox.style.display =
      searchBox.style.display === "block" ? "none" : "block";

    // 로고 위치로 이동
    logo.scrollIntoView({ behavior: "smooth" });
  });

  // 바깥 클릭 시 닫기
  window.addEventListener("click", () => {
    searchBox.style.display = "none";
  });
});
