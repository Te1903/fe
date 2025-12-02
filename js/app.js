/* ==================== APP KEY ==================== */
const APP_KEY = "qr_order_demo_v1";

/* Đọc dữ liệu */
function readData() {
    return JSON.parse(localStorage.getItem(APP_KEY) || "{}");
}

/* Lưu dữ liệu */
function saveData(data) {
    localStorage.setItem(APP_KEY, JSON.stringify(data));
}

/* Format tiền */
function formatVND(n) {
    return Number(n).toLocaleString("vi-VN") + " ₫";
}

/* ==================== DEMO MENU ==================== */
const DEMO_MENU = [
    { id: 101, name: "Cà phê sữa đá", price: 25000, category: "cafe", desc:"Cà phê chuẩn gu Việt", img: IMG_CAFE_SUADA },
    { id: 102, name: "Trà đào cam sả", price: 32000, category: "tra", desc:"Thanh mát, thơm vị đào", img: IMG_TRA_DAO },
    { id: 103, name: "Mỳ cay hải sản", price: 45000, category: "monno", desc:"Cay nồng, hấp dẫn", img: IMG_MY_CAY },
    { id: 104, name: "Bánh flan", price: 22000, category: "banh", desc:"Mềm mịn, thơm béo", img: IMG_BANH_FLAN },
    { id: 105, name: "Bông lan phô mai", price: 30000, category: "banh", desc:"Xốp mềm, phô mai béo", img: IMG_BANH_BONG_LAN },
    { id: 106, name: "Matcha Latte", price: 35000, category: "trasua", desc:"Matcha chuẩn Nhật", img: IMG_MATCHA },
    { id: 107, name: "Nước ép cam", price: 20000, category: "nuocep", desc:"Cam vắt tươi", img: IMG_NUOC_CAM },
    { id: 108, name: "Khoai tây chiên", price: 18000, category: "snack", desc:"Giòn rụm nóng hổi", img: IMG_KHOAI_TAY }
];

/* ==================== GHÉP DEMO + ADMIN MENU ==================== */
function mergeMenu() {
    let data = readData();

    if (!data.menu) data.menu = [];

    // Lấy id tất cả món admin
    const existingIds = new Set(data.menu.map(m => m.id));

    // Thêm demo nếu chưa tồn tại
    DEMO_MENU.forEach(item => {
        if (!existingIds.has(item.id)) {
            data.menu.push(item);
        }
    });

    saveData(data);
}

/* ==================== KHỞI TẠO ==================== */
document.addEventListener("DOMContentLoaded", () => {
    mergeMenu();  // 🔥 Quan trọng nhất
});
