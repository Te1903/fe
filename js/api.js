/* ===== API & DATABASE ===== */
const APP_KEY = 'qr_order_demo_v1';

function readData() {
  return JSON.parse(localStorage.getItem(APP_KEY) || '{}');
}

function writeData(d) {
  localStorage.setItem(APP_KEY, JSON.stringify(d));
}

function formatVND(n) {
  return n.toLocaleString('vi-VN') + ' ₫';
}

/* INIT DEMO */
function initDemoData() {
  if (localStorage.getItem(APP_KEY)) return;

  const demo = {
    menu: [
      { id: 101, name: "Cà phê sữa đá", price: 25000, category: "cafe", desc: "Cà phê chuẩn gu Việt", img: IMG_CAFE_SUADA, status: "ok" },
      { id: 102, name: "Trà đào cam sả", price: 32000, category: "tra", desc: "Thanh mát", img: IMG_TRA_DAO, status: "ok" },
      { id: 103, name: "Mỳ cay hải sản", price: 45000, category: "monno", desc: "Cay nồng", img: IMG_MY_CAY, status: "ok" }
    ],
    tables: [1,2,3,4,5,6],
    orders: [],
    nextOrderId: 1
  };

  writeData(demo);
}
