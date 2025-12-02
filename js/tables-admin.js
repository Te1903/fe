console.log("tables-admin.js loaded");

const APP_KEY = "qr_order_demo_v1";
const listBox = document.getElementById("tableList");

function renderTables() {
    const data = JSON.parse(localStorage.getItem(APP_KEY)) || {};

    const tables = data.tables || [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]; // Nếu chưa có thì tạo 6 bàn mẫu

    listBox.innerHTML = tables.map(n => `
        <div class="table-item">
            <h3>Bàn ${n}</h3>

            <button class="btn-show" onclick="toggleQR(${n})">Xem QR</button>

            <div id="qr-${n}" class="qr-box"></div>

            <button class="btn-download" onclick="downloadQR(${n})">Tải QR</button>
        </div>
    `).join("");

    tables.forEach(n => {
        const qrDiv = document.getElementById(`qr-${n}`);
        new QRCode(qrDiv, {
            text: `http://127.0.0.1:5500/order?table=${n}`,
            width: 150,
            height: 150
        });
    });
}

window.toggleQR = function(tableId){
    const box = document.getElementById(`qr-${tableId}`);
    box.style.display = (box.style.display === "block") ? "none" : "block";
};

window.downloadQR = function(tableId){
    const img = document.querySelector(`#qr-${tableId} img`);
    const link = document.createElement("a");
    link.href = img.src;
    link.download = `QR_Ban_${tableId}.png`;
    link.click();
};

renderTables();
