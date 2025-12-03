// ====== DEMO DATA 50 BÀN ======
let orders = [];

function generateDemoOrders() {
    for (let i = 1; i <= 50; i++) {
        orders.push({
            table: i,
            items: [
                { name: "Cà phê sữa", qty: Math.floor(Math.random() * 3) + 1 },
                { name: "Trà đào", qty: Math.floor(Math.random() * 2) + 1 }
            ],
            status: "Chờ chế biến"
        });
    }
}

// ========== RENDER ==========
function renderOrders() {
    const list = document.getElementById("orderList");
    list.innerHTML = "";

    orders.forEach(order => {
        const div = document.createElement("div");
        div.className = "order-box";

        div.innerHTML = `
            <h3>Bàn ${order.table}</h3>
            ${order.items.map(i => `<p>${i.name} × ${i.qty}</p>`).join("")}

            <p class="status">Trạng thái: <b>${order.status}</b></p>

            <button onclick="setStatus(${order.table}, 'Đang chế biến')">Đang chế biến</button>
            <button onclick="setStatus(${order.table}, 'Hoàn thành')">Hoàn thành</button>
            <button onclick="setStatus(${order.table}, 'Không thể chế biến')">Không thể chế biến</button>
        `;

        document.getElementById("orderList").appendChild(div);
    });
}

// ======== BUTTON CHANGE STATUS ========
function setStatus(table, status) {
    let order = orders.find(o => o.table === table);
    order.status = status;
    renderOrders();
}

// ====== FIX LỖI — DEFINE loadOrders() ======
function loadOrders() {
    generateDemoOrders();
    renderOrders();
}

// Tự chạy khi mở trang
document.addEventListener("DOMContentLoaded", () => {
    loadOrders();
});

// Đăng xuất
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}

function openChangePassword() {
    alert("Tính năng đổi mật khẩu đang phát triển!");
}

function logout() {
    window.location.href = "../../pages/login/index.html";
}
