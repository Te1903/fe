const APP_KEY = "qr_order_demo_v1";

function readData() {
    return JSON.parse(localStorage.getItem(APP_KEY) || "{}");
}

function formatVND(n) {
    return Number(n).toLocaleString("vi-VN") + " ₫";
}

document.getElementById("report-date").value =
    new Date().toISOString().slice(0, 10);

document.getElementById("btn-load").onclick = loadReport;
document.getElementById("btn-print").onclick = () => window.print();

function loadReport() {

    const date = document.getElementById("report-date").value;
    const data = readData();
    const orders = data.orders || [];

    // lọc theo ngày
    const start = new Date(date + "T00:00:00");
    const end = new Date(date + "T23:59:59");

    const today = orders.filter(o => {
        const t = new Date(o.createdAt);
        return t >= start && t <= end;
    });

    // tổng kết
    let revenue = 0;
    let cost = 0;
    let cancelCount = 0;
    let cancelValue = 0;

    const payStats = {};
    const topItems = {};

    today.forEach(o => {
        const total = o.items.reduce((s, i) => s + i.qty * i.price, 0);
        revenue += total;

        // thanh toán
        const method = o.paymentMethod || "Không rõ";
        if (!payStats[method]) payStats[method] = { count: 0, total: 0 };
        payStats[method].count++;
        payStats[method].total += total;

        // hủy
        if (o.status === "canceled") {
            cancelCount += o.items.reduce((s, i) => s + i.qty, 0);
            cancelValue += total;
        }

        // top món
        o.items.forEach(i => {
            if (!topItems[i.name]) topItems[i.name] = { qty: 0, revenue: 0 };
            topItems[i.name].qty += i.qty;
            topItems[i.name].revenue += i.qty * i.price;
        });
    });

    // cập nhật giao diện
    document.getElementById("sum-orders").textContent = today.length;
    document.getElementById("sum-revenue").textContent = formatVND(revenue);
    document.getElementById("sum-cost").textContent = formatVND(cost);
    document.getElementById("sum-profit").textContent = formatVND(revenue - cost);

    // phương thức thanh toán
    const payBody = document.getElementById("pay-method-body");
    payBody.innerHTML = "";
    Object.keys(payStats).forEach(m => {
        payBody.innerHTML += `
            <tr>
                <td>${m}</td>
                <td>${payStats[m].count}</td>
                <td>${formatVND(payStats[m].total)}</td>
            </tr>
        `;
    });

    // hủy món
    document.getElementById("cancel-count").textContent = cancelCount;
    document.getElementById("cancel-value").textContent = formatVND(cancelValue);

    // top món
    const topBody = document.getElementById("top-items-body");
    topBody.innerHTML = "";

    Object.entries(topItems)
        .sort((a, b) => b[1].qty - a[1].qty)
        .slice(0, 10)
        .forEach(([name, v]) => {
            topBody.innerHTML += `
                <tr>
                    <td>${name}</td>
                    <td>${v.qty}</td>
                    <td>${formatVND(v.revenue)}</td>
                </tr>
            `;
        });
}
