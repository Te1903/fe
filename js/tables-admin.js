const TABLE_KEY = "qr_table_data";

// Nếu chưa có dữ liệu → tạo ví dụ
if (!localStorage.getItem(TABLE_KEY)) {
    localStorage.setItem(TABLE_KEY, JSON.stringify({
        tables: [
            { id: 1, name: "Bàn 1" },
            { id: 2, name: "Bàn 2" },
            { id: 3, name: "Bàn 3" },
            { id: 4, name: "Bàn 4" }
        ]
    }));
}

function loadTables() {
    const data = JSON.parse(localStorage.getItem(TABLE_KEY));
    const tables = data.tables || [];
    const list = document.getElementById("tableList");

    list.innerHTML = "";

tables.forEach(tb => {
    list.innerHTML += `
        <div class="table-item">
            <h3>${tb.name}</h3>

            <div id="qr-${tb.id}" class="qr-box"></div>

            <button class="btn-download" onclick="downloadQR(${tb.id})">
                Tải QR
            </button>
        </div>
    `;
});

// CHỜ DOM RENDER XONG RỒI MỚI TẠO QR
setTimeout(() => {
    tables.forEach(tb => {
        const box = document.getElementById(`qr-${tb.id}`);
        if (!box) return;

        box.innerHTML = "";

        new QRCode(box, {
            text: `http://127.0.0.1:5500/order?table=${tb.id}`,
            width: 130,
            height: 130
        });
    });
}, 50);


}

function downloadQR(id) {
    const img = document.querySelector(`#qr-${id} img`);
    const url = img.src;

    const a = document.createElement("a");
    a.href = url;
    a.download = `QR-Ban-${id}.png`;
    a.click();
}


loadTables();
    