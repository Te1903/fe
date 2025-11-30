// ======================= KEY LOCAL STORAGE =======================
const STAFF_KEY = "qr_staff_data";

// ======================= KHỞI TẠO DỮ LIỆU DEMO =======================
function initDemoStaff() {
    if (localStorage.getItem(STAFF_KEY)) return;

    const demo = {
        staff: [
            { id: 1, name: "Nguyễn Văn A", username: "admin", password: "123", role: "admin", status: "active" },
            { id: 2, name: "Trần Thị B", username: "cashier1", password: "123", role: "cashier", status: "active" },
            { id: 3, name: "Lê Văn C", username: "staff1", password: "123", role: "staff", status: "inactive" }
        ]
    };

    localStorage.setItem(STAFF_KEY, JSON.stringify(demo));
}

// ======================= ĐỌC DỮ LIỆU =======================
function getStaff() {
    const data = JSON.parse(localStorage.getItem(STAFF_KEY));
    return data?.staff || [];
}

function saveStaff(list) {
    localStorage.setItem(STAFF_KEY, JSON.stringify({ staff: list }));
}

// ======================= RENDER LIST =======================
function renderStaffList() {
    const tbody = document.getElementById("staffBody");
    if (!tbody) return;

    const search = document.getElementById("searchStaff").value.toLowerCase();
    const role = document.getElementById("filterRole").value;

    let list = getStaff();

    if (search) list = list.filter(s => s.name.toLowerCase().includes(search));
    if (role !== "all") list = list.filter(s => s.role === role);

    tbody.innerHTML = list.map((s, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${s.name}</td>
            <td>${s.username}</td>
            <td>${s.role}</td>
            <td>${s.status === "active" ? "Đang làm" : "Nghỉ làm"}</td>
            <td>
                <button onclick="openStaffModal('edit', ${s.id})">Sửa</button>
                <button onclick="deleteStaff(${s.id})">Xóa</button>
            </td>
        </tr>
    `).join("");
}

// ======================= MODAL THÊM / SỬA =======================
let editingId = null;

function openStaffModal(type, id = null) {
    const modal = document.getElementById("staffModal");
    const title = document.getElementById("staffModalTitle");

    modal.classList.remove("hide");

    if (type === "add") {
        title.textContent = "Thêm nhân viên";
        editingId = null;

        document.getElementById("sName").value = "";
        document.getElementById("sUsername").value = "";
        document.getElementById("sPassword").value = "";
        document.getElementById("sRole").value = "staff";
        document.getElementById("sStatus").value = "active";

    } else {
        title.textContent = "Sửa nhân viên";
        editingId = id;

        const staff = getStaff().find(s => s.id === id);

        document.getElementById("sName").value = staff.name;
        document.getElementById("sUsername").value = staff.username;
        document.getElementById("sPassword").value = staff.password;
        document.getElementById("sRole").value = staff.role;
        document.getElementById("sStatus").value = staff.status;
    }
}

function closeStaffModal() {
    document.getElementById("staffModal").classList.add("hide");
}

// ======================= LƯU NHÂN VIÊN =======================
document.addEventListener("click", function (e) {
    if (e.target.id === "btnSaveStaff") {
        const list = getStaff();

        const obj = {
            id: editingId ?? Date.now(),
            name: document.getElementById("sName").value,
            username: document.getElementById("sUsername").value,
            password: document.getElementById("sPassword").value,
            role: document.getElementById("sRole").value,
            status: document.getElementById("sStatus").value,
        };

        if (editingId) {
            const index = list.findIndex(s => s.id === editingId);
            list[index] = obj;
        } else {
            list.push(obj);
        }

        saveStaff(list);
        closeStaffModal();
        renderStaffList();
    }

    if (e.target.id === "btnCloseStaff") {
        closeStaffModal();
    }
});

// ======================= XÓA =======================
function deleteStaff(id) {
    if (!confirm("Xóa nhân viên này?")) return;

    const list = getStaff().filter(s => s.id !== id);
    saveStaff(list);
    renderStaffList();
}

function initStaffPage() {
    initDemoStaff();
    renderStaffList();

    document.getElementById("searchStaff").oninput = renderStaffList;
    document.getElementById("filterRole").onchange = renderStaffList;
    document.getElementById("btnAddStaff").onclick = () => openStaffModal("add");
}

initStaffPage(); // chạy ngay
