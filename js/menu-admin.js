console.log("menu-admin.js loaded");

const APP_KEY = "qr_order_demo_v1";

// =============== HÀM LẤY DỮ LIỆU ===============
function getData() {
    return JSON.parse(localStorage.getItem(APP_KEY)) || { menu: [] };
}

function saveData(data) {
    localStorage.setItem(APP_KEY, JSON.stringify(data));
}

function formatVND(v) {
    return Number(v).toLocaleString("vi-VN") + " ₫";
}

// =============== RENDER DANH SÁCH ===============
function renderAdminMenu() {
    const search = document.getElementById("searchMenu")?.value.toLowerCase() || "";
    const cat = document.getElementById("filterCategory")?.value || "all";
    const tbody = document.getElementById("menuBody");

    const data = getData();
    let items = data.menu;

    // SEARCH
    if (search) items = items.filter(m => m.name.toLowerCase().includes(search));

    // FILTER CATEGORY
    if (cat !== "all") items = items.filter(m => m.category === cat);

    // RENDER
    tbody.innerHTML = items.map(m => `
        <tr>
            <td><img src="${m.img}" style="width:60px;height:60px;border-radius:6px;object-fit:cover"></td>
            <td>${m.name}</td>
            <td>${formatVND(m.price)}</td>
            <td>${m.category}</td>
            <td>${m.status === "ok" ? "<span style='color:green'>Còn hàng</span>" : "<span style='color:red'>Hết hàng</span>"}</td>
            <td>
                <button class="btn-edit" onclick="openMenuModal('edit', ${m.id})">Sửa</button>
                <button class="btn-delete" onclick="deleteMenu(${m.id})">Xóa</button>
            </td>
        </tr>
    `).join("");
}

window.renderAdminMenu = renderAdminMenu;

// =============== XÓA MÓN ===============
window.deleteMenu = function (id) {
    if (!confirm("Bạn có chắc muốn xóa món này?")) return;

    const data = getData();
    data.menu = data.menu.filter(m => m.id !== id);
    saveData(data);

    renderAdminMenu();
};

// =============== MODAL ===============
const modal = document.getElementById("menuModal");
const btnClose = document.getElementById("btnClose");

let editId = null;

window.openMenuModal = function (mode, id) {
    modal.classList.remove("hide");

    const mName = document.getElementById("mName");
    const mPrice = document.getElementById("mPrice");
    const mDesc = document.getElementById("mDesc");
    const mImg = document.getElementById("mImg");
    const mStatus = document.getElementById("mStatus");

    if (mode === "add") {
        document.getElementById("modalTitle").textContent = "Thêm món mới";
        editId = null;

        mName.value = "";
        mPrice.value = "";
        mDesc.value = "";
        mImg.value = "";
        m.status === "Đang bán"


    } else {
        document.getElementById("modalTitle").textContent = "Chỉnh sửa món";

        const data = getData();
        const item = data.menu.find(x => x.id === id);

        editId = id;

        mName.value = item.name;
        mPrice.value = item.price;
        mDesc.value = item.desc || "";
        mImg.value = item.img;
        mStatus.value = item.status;
    }
};

btnClose.onclick = () => modal.classList.add("hide");

// =============== LƯU MÓN (ADD + EDIT) ===============
document.getElementById("btnSave").onclick = function () {
    const data = getData();

    const name = document.getElementById("mName").value.trim();
    const price = Number(document.getElementById("mPrice").value);
    const desc = document.getElementById("mDesc").value.trim();
    const img = document.getElementById("mImg").value.trim();
    const status = document.getElementById("mStatus").value;

    if (!name || !price || !img) {
        alert("Vui lòng nhập đầy đủ tên / giá / hình ảnh");
        return;
    }

    if (editId === null) {
        // thêm mới
        data.menu.push({
            id: Date.now(),
            name,
            price,
            desc,
            img,
            status,
            category: document.getElementById("mCategory")?.value || "cafe"
        });
    } else {
        // chỉnh sửa
        const item = data.menu.find(m => m.id === editId);

        item.name = name;
        item.price = price;
        item.desc = desc;
        item.img = img;
        item.status = status;
    }

    saveData(data);
    modal.classList.add("hide");
    renderAdminMenu();
};

// =============== SỰ KIỆN SEARCH + FILTER ===============
setTimeout(() => {
    if (document.getElementById("searchMenu"))
        document.getElementById("searchMenu").oninput = renderAdminMenu;

    if (document.getElementById("filterCategory"))
        document.getElementById("filterCategory").onchange = renderAdminMenu;

    renderAdminMenu();
}, 200);
