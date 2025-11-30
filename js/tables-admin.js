document.addEventListener("DOMContentLoaded", () => {
    const tableList = document.getElementById("tableList");
    const orderItems = document.getElementById("orderItems");

    const TOTAL_TABLES = 20;

    // load bàn
    for (let i = 1; i <= TOTAL_TABLES; i++) {
        let div = document.createElement("div");
        div.className = "table-card";
        div.innerText = "Bàn " + i;

        div.onclick = () => showOrder(i, div);

        tableList.appendChild(div);
    }

    function showOrder(tableNumber, element) {
        document.querySelectorAll(".table-card").forEach(t => t.classList.remove("active"));
        element.classList.add("active");

        let data = JSON.parse(localStorage.getItem("orders")) || {};

        if (!data[tableNumber]) {
            orderItems.innerHTML = "<p>🟦 Chưa có món nào</p>";
            return;
        }

        let html = "";
        data[tableNumber].forEach(item => {
            html += `
                <div class="order-line">
                    <strong>${item.name}</strong> x ${item.qty}
                    <span>${item.price * item.qty} đ</span>
                </div>
            `;
        });

        orderItems.innerHTML = html;
    }
});
