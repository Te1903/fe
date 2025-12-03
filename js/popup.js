/* ================== STATE POPUP ================== */
const popupState = {
  id: null,
  qty: 1
};

/* ================== ĐÓNG POPUP ================== */
function closePopup() {
  const pop = document.getElementById("popup");
  if (pop) pop.style.display = "none";
}

/* ================== ĐỔI SỐ LƯỢNG ================== */
function popupChangeQty(delta) {
  popupState.qty += delta;
  if (popupState.qty < 1) popupState.qty = 1;

  const qtyEl = document.getElementById("popup-qty");
  if (qtyEl) qtyEl.textContent = popupState.qty;
}

/* ================== THÊM VÀO GIỎ ================== */
function popupAddToCart() {
  // kiểm tra đã chọn món chưa
  if (!popupState.id) {
    alert("Chưa chọn món!");
    return;
  }

  const data = readData();   // từ app.js
  if (!data.menu) data.menu = [];
  if (!data.cart) data.cart = [];

  // tìm món trong menu
  const item = data.menu.find(m => m.id === popupState.id);
  if (!item) {
    alert("Không tìm thấy món trong menu!");
    return;
  }

  // kiểm tra xem trong giỏ đã có chưa
  const exist = data.cart.find(c => c.id === item.id);

  if (exist) {
    exist.qty += popupState.qty;
  } else {
    data.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      qty: popupState.qty
    });
  }

  // lưu lại
  saveData(data);

  // cập nhật giỏ ở dưới
  updateBottomCart();

  // feedback cho user
  alert("✅ Đã thêm vào giỏ!");

  // đóng popup
  closePopup();
}

/* ================== CẬP NHẬT GIỎ DƯỚI ================== */
function updateBottomCart() {
  const countEl = document.getElementById("bottom-count");
  const totalEl = document.getElementById("bottom-total");

  // nếu trang này không có bottom-cart (ví dụ trang khác) thì bỏ qua
  if (!countEl || !totalEl) return;

  const data = readData();
  const cart = data.cart || [];

  let totalQty = 0;
  let totalMoney = 0;

  cart.forEach(i => {
    totalQty += i.qty;
    totalMoney += i.qty * i.price;
  });

  countEl.textContent = totalQty;
  totalEl.textContent = formatVND(totalMoney);
}

/* ================== MỞ TRANG GIỎ ================== */
function openCart() {
  // nếu đang ở /pages/menu/index.html -> nhảy qua /pages/cart/index.html
  if (location.pathname.includes("/pages/menu/")) {
    window.location.href = "../cart/index.html";
  } else {
    // fallback: nếu mở từ root
    window.location.href = "./pages/cart/index.html";
  }
}

/* ================== KHI LOAD TRANG XONG ================== */
document.addEventListener("DOMContentLoaded", () => {
  updateBottomCart();
});
