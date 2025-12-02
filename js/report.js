console.log("report.js loaded");

// --- TẠO DỮ LIỆU MẪU ---
const demoReport = {
    dateCreated: "01/12/2025",
    creator: "Admin",
    saleDate: "01/12/2025",

    income: 520000,
    outcome: 120000,
    cash: 300000,
    bank: 220000,

    totalOrders: 18,
    estimatedRevenue: 520000,

    cancelCount: 2,
    cancelValue: 45000
};

// Lưu vào localStorage (nếu chưa có)
if (!localStorage.getItem("daily_report")) {
    localStorage.setItem("daily_report", JSON.stringify(demoReport));
}

// ---- LOAD LÊN HTML ----
const r = JSON.parse(localStorage.getItem("daily_report"));

function formatVND(n) {
    return n.toLocaleString("vi-VN") + " ₫";
}

document.getElementById("rDate").textContent = r.dateCreated;
document.getElementById("rCreator").textContent = r.creator;
document.getElementById("rSaleDate").textContent = r.saleDate;

document.getElementById("rIncome").innerHTML = formatVND(r.income);
document.getElementById("rOutcome").innerHTML = formatVND(r.outcome);
document.getElementById("rBalance").innerHTML = formatVND(r.income - r.outcome);

document.getElementById("rCash").innerHTML = formatVND(r.cash);
document.getElementById("rBank").innerHTML = formatVND(r.bank);

document.getElementById("rOrders").textContent = r.totalOrders;
document.getElementById("rRevenue").innerHTML = formatVND(r.estimatedRevenue);

document.getElementById("rCancelCount").textContent = r.cancelCount;
document.getElementById("rCancelValue").innerHTML = formatVND(r.cancelValue);
