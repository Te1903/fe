/* ========== MENU TRANG CHỦ – BẢN RÚT GỌN ========== */

/* ========== ẢNH DEMO ========== */
const IMG_CAFE_SUADA =
  "https://lh6.googleusercontent.com/proxy/LcrQvf5VlPKjyIVgH6UUURhh9HPOorCMbr091cGQwkF78pqw6TtPnLT1zlsPJA87rvAxSrntSrJhT6F2u_O6N3i2pK4y32kEZ7cvDpHA9DwHhvnLNozl_5EPfQzpwpgVHbaMky5_rdUqjAzGmGNY6VYeZDhmFDfDpk8d20z8Q9bX-OYGaTeiXuiaA4M";
const IMG_TRA_DAO =
  "https://product.hstatic.net/200000791069/product/lord-50_5221e714bef5444aaab6759e2a219146_master.jpg";
const IMG_MY_CAY =
  "https://haisanloccantho.com/wp-content/uploads/2024/11/mi-cay-hai-san.jpg";
const IMG_BANH_FLAN =
  "https://monngonmoingay.com/wp-content/uploads/2024/08/cach-lam-banh-flan-bang-noi-chien-khong-dau-1-1.jpg";
const IMG_BANH_BONG_LAN =
  "https://www.huongnghiepaau.com/wp-content/uploads/2019/07/banh-bong-lan-pho-mai-dai-loan.jpg";
const IMG_MATCHA =
  "https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg";
const IMG_NUOC_CAM =
  "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/2/19/cach-lam-nuoc-cam-ep-ngon-va-thom-ket-hop-voi-le-va-gung-5-1645248090817401855254.jpg";
const IMG_KHOAI_TAY =
  "https://cdn.tgdd.vn/2021/07/CookProduct/khoai-tay-chien-bao-nhieu-calo-an-khoai-lang-hay-khoai-tay-chien-tot-hon-00-1200x676.jpg";
const IMG_CUA_SOT_ME =
"https://ngochuong.vn/upload/image/data/Nhung/Menu/Cua/Cua-rang-me-5be.jpg"
const IMG_GOI_CUON =
"https://maisonmando.com/wp-content/uploads/2020/06/goi-cuon-tom-thit.jpg"
const IMG_GA_NUONG=
"https://maisonmando.com/wp-content/uploads/2020/06/ga-nuong-la-chanh-1536x1152.jpg"
const IMG_BANH_MI=
"https://maisonmando.com/wp-content/uploads/2020/06/banh-mi.png"
const IMG_CHA_CA=
"https://maisonmando.com/wp-content/uploads/2020/06/cha-muc-ha-long-1536x969.jpg"


/* ========== DANH MỤC ========== */
const CATEGORIES = [
  { id: "all", name: "Tất cả", icon: "📋" },
  { id: "cafe", name: "Cà phê", icon: "☕" },
  { id: "tra", name: "Trà trái cây", icon: "🍵" },
  { id: "trasua", name: "Trà sữa", icon: "🧋" },
  { id: "nuocep", name: "Nước ép", icon: "🍊" },
  { id: "banh", name: "Bánh ngọt", icon: "🍰" },
  { id: "monno", name: "Món no", icon: "🍛" },
  { id: "snack", name: "Ăn vặt", icon: "🍟" }
];

/* ========== KHỞI TẠO DỮ LIỆU DEMO ========== */
function initDemoMenu() {
  if (localStorage.getItem(APP_KEY)) return;

  const demo = {
    menu: [
      { id: 101, name: "Cà phê sữa đá", price: 25000, category: "cafe", desc:"Cà phê chuẩn gu Việt", img: IMG_CAFE_SUADA },
      { id: 102, name: "Trà đào cam sả", price: 32000, category: "tra", desc:"Thanh mát, thơm vị đào", img: IMG_TRA_DAO },
      { id: 103, name: "Mỳ cay hải sản", price: 45000, category: "monno", desc:"Cay nồng, hấp dẫn", img: IMG_MY_CAY },
      { id: 104, name: "Bánh flan", price: 22000, category: "banh", desc:"Mềm mịn, thơm béo", img: IMG_BANH_FLAN },
      { id: 105, name: "Bông lan phô mai", price: 30000, category: "banh", desc:"Xốp mềm, phô mai béo", img: IMG_BANH_BONG_LAN },
      { id: 106, name: "Matcha Latte", price: 35000, category: "trasua", desc:"Matcha chuẩn Nhật", img: IMG_MATCHA },
      { id: 107, name: "Nước ép cam", price: 20000, category: "nuocep", desc:"Cam vắt tươi", img: IMG_NUOC_CAM },
      { id: 108, name: "Khoai tây chiên", price: 18000, category: "snack", desc:"Giòn rụm nóng hổi", img: IMG_KHOAI_TAY },
      { id: 109, name: "Cua Sốt Me", price: 108000, category: "mono", desc:"Cua sốt me thơm ngát", img: IMG_CUA_SOT_ME },
      { id: 110, name: "Gỏi Cuốn Nhà Gu", price: 98000, category: "mono", desc:"Đặc sản miền nam", img: IMG_GOI_CUON },
      { id: 111, name: "Gà Nướng", price: 108000, category: "mono", desc:"Gà Nướng thơm ngát", img: IMG_GA_NUONG },
      { id: 112, name: "Bánh Mì", price: 38000, category: "mono", desc:"Đặc Sản Việt Nam", img: IMG_BANH_MI },
      { id: 113, name: "Chả Cá", price: 208000, category: "mono", desc:"Chả Cá Việt Nam", img:  IMG_CHA_CA}




    ]
  };

  localStorage.setItem(APP_KEY, JSON.stringify(demo));
}

/* ========== RENDER CATEGORY ========== */
function renderCategories() {
  const wrap = document.getElementById("cat-row");
  wrap.innerHTML = "";

  CATEGORIES.forEach(cat => {
    const btn = document.createElement("div");
    btn.className = "cat-chip" + (cat.id === "all" ? " active" : "");
    btn.textContent = cat.icon + " " + cat.name;
    btn.dataset.cat = cat.id;

    btn.onclick = () => {
      document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      renderMenuList(cat.id);
    };

    wrap.appendChild(btn);
  });
}

/* ========== RENDER MENU ========== */
function renderMenuList(catId = "all") {
  const data = readData();
  const wrap = document.getElementById("menu-list");
  if (!wrap || !data.menu) return;

  let list = data.menu;
  if (catId !== "all") list = list.filter(m => m.category === catId);

  wrap.innerHTML = list.map(m => `
    <div class="menu-card" onclick="openPopup(${m.id})">
      <div class="card-media"><img src="${m.img}"></div>
      <div class="card-body">
        <div class="menu-name">${m.name}</div>
        <div class="menu-desc">${m.desc}</div>
        <div class="menu-price">${formatVND(m.price)}</div>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenuList();
});


/* ========== POPUP ========== */
function openPopup(menuId){
  const data = readData();
  const m = data.menu.find(x=>x.id===menuId);
  if (!m) return;

  popupState.id = m.id;
  popupState.qty = 1;

  document.getElementById('popup-img').src = m.img;
  document.getElementById('popup-title').textContent = m.name;
  document.getElementById('popup-desc').textContent = m.desc || '';
  document.getElementById('popup-price').textContent = formatVND(m.price);
  document.getElementById('popup-qty').textContent = '1';

  document.getElementById('popup').style.display = 'flex';
}

/* ========== START ========== */
document.addEventListener("DOMContentLoaded", () => {
  initDemoMenu();
  renderCategories();
  renderMenuList();

  // tắt popup khi bấm nền
  const pop = document.getElementById("popup");
  if (pop) {
    pop.addEventListener("click", e => {
      if (e.target === pop) closePopup();
    });
  }
});