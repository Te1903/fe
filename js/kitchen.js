/* ================= KITCHEN PAGE ================= */

function renderKitchenPage() {
  const data = readData();
  const wrap = document.getElementById("orders-list");
  if (!wrap) return;

  if (!data.orders || data.orders.length === 0) {
    wrap.innerHTML = `<div class="small">Chưa có order</div>`;
    return;
  }

  const sorted = data.orders
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  wrap.innerHTML = sorted
    .map((o) => {
      const statusText =
        o.status === "new"
          ? "🟡 Mới nhận"
          : o.status === "preparing"
          ? "🟠 Đang chế biến"
          : o.status === "done"
          ? "🟢 Hoàn thành"
          : o.status === "failed"
          ? "🔴 Không thể làm"
          : "⚫ Không xác định";

      return `
      <div class="order-card">
        <div style="display:flex; justify-content:space-between;">
          <strong>Đơn #${o.id}</strong>
          <span class="small">${new Date(o.createdAt).toLocaleString()}</span>
        </div>

        <div>Bàn: <b>${o.table}</b></div>

        <div style="margin-top:8px">
          ${o.items.map((it) => `<div>${it.name} x${it.qty}</div>`).join("")}
        </div>

        <div class="status-box">${statusText}</div>

        <div class="actions">
          ${o.status === "new"
            ? `<button onclick="updateOrderStatus(${o.id}, 'preparing')">Bắt đầu</button>`
            : ""}
          
          ${o.status === "preparing"
            ? `<button onclick="updateOrderStatus(${o.id}, 'done')">Hoàn thành</button>`
            : ""}
          
          ${o.status === "preparing"
            ? `<button class="btn-danger" onclick="updateOrderStatus(${o.id}, 'failed')">Không thể làm</button>`
            : ""}
        </div>
      </div>
      `;
    })
    .join("");
}

function updateOrderStatus(id, status) {
  const data = readData();
  const o = data.orders.find((x) => x.id === id);
  if (!o) return alert("Không tìm thấy đơn!");

  o.status = status;
  writeData(data);

  renderKitchenPage();
}
