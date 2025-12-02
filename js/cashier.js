/* ==========================
      THU NGÂN — GU22
========================== */

const APP_KEY = "qr_order_demo_v1";

/* ----------------- DB HELPERS ----------------- */
function readData() {
    let d = JSON.parse(localStorage.getItem(APP_KEY) || '{}');

    // khởi tạo lần đầu
    if (!Array.isArray(d.tables)) d.tables = [...Array(50)].map((_, i) => i + 1);
    if (!Array.isArray(d.orders)) d.orders = [];

    return d;
}

function writeData(d) {
    localStorage.setItem(APP_KEY, JSON.stringify(d));
}

/* ===========================
   HIỂN THỊ DANH SÁCH BÀN
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const wrap = document.getElementById("cashier-tables");
    if (!wrap) return;

    const data = readData();

    const tables = Array.isArray(data.tables) && data.tables.length
        ? data.tables
        : [...Array(50)].map((_, i) => i + 1);

    wrap.innerHTML = tables.map(t => `
        <div class="table-box" onclick="openBill(${t})">Bàn ${t}</div>
    `).join("");
});

/* ===========================
   MỞ HÓA ĐƠN BÀN
=========================== */
window.openBill = function (table) {
    const data = readData();
    const popup = document.getElementById("bill-popup");

    const order = data.orders.find(o => o.table == table && !o.paid);

    document.getElementById("bill-table").textContent = table;

    if (!order) {
        document.getElementById("bill-items").innerHTML =
            "<i>Bàn này chưa có đơn hoặc đã thanh toán.</i>";
        document.getElementById("bill-total").textContent = "0 đ";
        popup.dataset.total = 0;
        popup.classList.remove("hide");
        return;
    }

    document.getElementById("bill-items").innerHTML = order.items.map(i => `
        <div>${i.name} x${i.qty} — <b>${formatVND(i.qty * i.price)}</b></div>
    `).join("");

    const total = order.items.reduce((s, i) => s + i.qty * i.price, 0);

    document.getElementById("bill-total").textContent = formatVND(total);
    popup.dataset.orderId = order.id;
    popup.dataset.total = total;
    popup.classList.remove("hide");
};

/* ===========================
   ĐÓNG POPUP
=========================== */
window.closeBill = function () {
    document.getElementById("bill-popup").classList.add("hide");
};

/* ===========================
   TÍNH TIỀN THỪA
=========================== */
document.getElementById("customer-money")?.addEventListener("input", () => {
    const val = Number(document.getElementById("customer-money").value);
    const total = Number(document.getElementById("bill-popup").dataset.total);

    const change = Math.max(0, val - total);
    document.getElementById("change-amount").textContent = formatVND(change);
});

/* ===========================
   XÁC NHẬN THANH TOÁN
=========================== */
document.getElementById("confirm-pay")?.addEventListener("click", () => {
    const popup = document.getElementById("bill-popup");
    const method = document.getElementById("payment-method").value;
    const orderId = popup.dataset.orderId;

    const data = readData();
    const order = data.orders.find(o => o.id == orderId);

    if (order) {
        order.paid = true;
        order.status = "done";
        order.paymentMethod = method;
        writeData(data);
        alert("Thanh toán thành công!");
    }

    closeBill();
});

/* ===========================
   FORMAT TIỀN
=========================== */
const menuBtn = document.getElementById("cashierMenuBtn");
const menuBox = document.getElementById("cashierMenu");

menuBtn.addEventListener("click", () => {
    menuBox.style.display = menuBox.style.display === "flex" ? "none" : "flex";
});

// Bấm ra ngoài thì đóng
document.addEventListener("click", (e) => {
    if (!menuBox.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBox.style.display = "none";
    }
});
