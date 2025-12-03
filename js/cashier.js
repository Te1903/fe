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
function openBill(table) {
    const items = TEST_BILLS[table] || [];

    const list = document.getElementById("bill-items");
    list.innerHTML = "";

    let total = 0;

    items.forEach(item => {
        const row = document.createElement("div");
        row.className = "bill-row";

        const money = item.qty * item.price;
        total += money;

        row.innerHTML = `
            <p>${item.name} × ${item.qty}</p>
            <span>${money.toLocaleString()} đ</span>
        `;

        list.appendChild(row);
    });

    document.getElementById("bill-total").innerText = total.toLocaleString() + " đ";
    document.getElementById("bill-table").innerText = table;

    document.getElementById("bill-popup").classList.remove("hide");
}

/* ===========================
   ĐÓNG POPUP
=========================== */
window.closeBill = function () {
    document.getElementById("bill-popup").classList.add("hide");
};

/* ===========================
   TÍNH TIỀN THỪA
=========================== */
// Tự động tính tiền thừa khi nhập tiền khách đưa
document.getElementById("customer-money").addEventListener("input", () => {
    const total = currentBillTotal;  // tổng tiền của bàn → bạn đã có biến này
    const money = Number(document.getElementById("customer-money").value);

    let change = money - total;
    if (change < 0) change = 0;

    document.getElementById("change-amount").textContent = change.toLocaleString() + " đ";
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

// =========================
// Dữ liệu TEST hóa đơn
// =========================
const TEST_BILLS = {
    1: [
        { name: "Cà phê sữa", qty: 2, price: 25000 },
        { name: "Trà đào", qty: 1, price: 30000 }
    ],
    5: [
        { name: "Bánh ngọt", qty: 3, price: 20000 },
        { name: "Sinh tố xoài", qty: 1, price: 45000 }
    ],
    12: [
        { name: "Hồng trà kem cheese", qty: 2, price: 35000 }
    ]
};
