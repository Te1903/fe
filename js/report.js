// =========================
// 📌 DEMO DỮ LIỆU DOANH THU
// =========================
const demoReports = {
    "2025-03-01": {
        dateCreate: "01/03/2025",
        creator: "Admin",
        saleDate: "01/03/2025",

        income: 1500000,
        outcome: 200000,
        cash: 900000,
        bank: 600000,

        orders: 32,
        revenue: 1500000,

        cancelCount: 3,
        cancelValue: 45000
    },

    "2025-03-02": {
        dateCreate: "02/03/2025",
        creator: "Admin",
        saleDate: "02/03/2025",

        income: 1750000,
        outcome: 120000,
        cash: 1000000,
        bank: 750000,

        orders: 41,
        revenue: 1750000,

        cancelCount: 1,
        cancelValue: 15000
    }
};


// =========================
// 📌 HÀM FORMAT TIỀN
// =========================
function formatMoney(num) {
    return num.toLocaleString("vi-VN") + " ₫";
}


// =========================
// 📌 LOAD BÁO CÁO THEO NGÀY
// =========================
function loadReportByDate() {
    const dateInput = document.getElementById("reportDate").value;

    if (!dateInput) return;

    const report = demoReports[dateInput];

    if (!report) {
        alert("❌ Không có dữ liệu cho ngày này!");
        return;
    }

    // Gán dữ liệu vào trang
    document.getElementById("rDate").innerText = report.dateCreate;
    document.getElementById("rCreator").innerText = report.creator;
    document.getElementById("rSaleDate").innerText = report.saleDate;

    document.getElementById("rIncome").innerText = formatMoney(report.income);
    document.getElementById("rOutcome").innerText = formatMoney(report.outcome);

    document.getElementById("rBalance").innerText = 
        formatMoney(report.income - report.outcome);

    document.getElementById("rCash").innerText = formatMoney(report.cash);
    document.getElementById("rBank").innerText = formatMoney(report.bank);

    document.getElementById("rOrders").innerText = report.orders;
    document.getElementById("rRevenue").innerText = formatMoney(report.revenue);

    document.getElementById("rCancelCount").innerText = report.cancelCount;
    document.getElementById("rCancelValue").innerText = formatMoney(report.cancelValue);
}

