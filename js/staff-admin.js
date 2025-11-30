console.log("staff-admin.js loaded");
const APP_KEY = "qr_order_demo_v1";

/* GET + SET */
function getData() {
    const data = JSON.parse(localStorage.getItem(APP_KEY)) || {};
    if (!data.staff) data.staff = [];
    return data;
}

function saveData(data) {
    localStorage.setItem(APP_KEY, JSON.stringify(data));
}

/* INIT */
export function staffManagerInit() {
    const search = document.getElementById("searchStaff");
    const filter = document.getElementById("filterRole");
    const tbody  = document.getElementById("staffBody");

    function render() {
        let data = getData();
        let list = data.staff;

        const q = search.value.toLowerCase();
        if (q) list = list.filter(s => s.name.toLowerCase().includes(q));

        const r = filter.value;
        if (r !== "all") list = list.filter(s => s.role === r);

        tbody.innerHTML = list.map((s,i)=> `
            <tr>
                <td>${i+1}</td>
                <td>${s.name}</td>
                <td>${s.username}</td>
                <td>${formatRole(s.role)}</td>
                <td>${s.status === "active" ? "Đang làm" : "Nghỉ làm"}</td>
                <td>
                    <button class="btn-edit" onclick="openStaffModal('edit', ${s.id})">Sửa</button>
                    <button class="btn-delete" onclick="deleteStaff(${s.id})">Xóa</button>
                </td>
            </tr>
        `).join("");
    }

    window.refreshStaffTable = render;
    search.oninput = render;
    filter.onchange = render;
    render();
}

function formatRole(r){
    return r === "admin" ? "Quản trị"
         : r === "cashier" ? "Thu ngân"
         : "Nhân viên";
}

/* DELETE */
window.deleteStaff = id => {
    const data = getData();
    data.staff = data.staff.filter(s => s.id !== id);
    saveData(data);
    refreshStaffTable();
};

/* MODAL */
const modal = document.getElementById("staffModal");
let editId = null;

window.openStaffModal = (mode, id) => {
    modal.classList.remove("hide");

    const sName = document.getElementById("sName");
    const sUsername = document.getElementById("sUsername");
    const sPassword = document.getElementById("sPassword");
    const sRole = document.getElementById("sRole");
    const sStatus = document.getElementById("sStatus");

    if (mode === "add") {
        editId = null;
        sName.value = "";
        sUsername.value = "";
        sPassword.value = "";
        sRole.value = "staff";
        sStatus.value = "active";
        return;
    }

    const data = getData();
    const st = data.staff.find(s => s.id === id);
    editId = id;

    sName.value = st.name;
    sUsername.value = st.username;
    sPassword.value = st.password;
    sRole.value = st.role;
    sStatus.value = st.status;
};

document.getElementById("btnCloseStaff").onclick = () =>
    modal.classList.add("hide");

/* SAVE */
document.getElementById("btnSaveStaff").onclick = () => {
    const sName = document.getElementById("sName").value.trim();
    const sUsername = document.getElementById("sUsername").value.trim();
    const sPassword = document.getElementById("sPassword").value.trim();
    const sRole = document.getElementById("sRole").value;
    const sStatus = document.getElementById("sStatus").value;

    if (!sName || !sUsername || !sPassword) {
        alert("Vui lòng nhập đủ thông tin!");
        return;
    }

    const data = getData();

    if (editId === null) {
        data.staff.push({
            id: Date.now(),
            name: sName,
            username: sUsername,
            password: sPassword,
            role: sRole,
            status: sStatus
        });

    } else {
        const st = data.staff.find(s => s.id === editId);
        st.name = sName;
        st.username = sUsername;
        st.password = sPassword;
        st.role = sRole;
        st.status = sStatus;
    }

    saveData(data);
    modal.classList.add("hide");
    refreshStaffTable();
};

/* ADD BUTTON */
document.getElementById("btnAddStaff").onclick = () => openStaffModal("add");
