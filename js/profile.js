const APP_KEY = 'qr_order_demo_v1';

function loadProfile() {
    const users = JSON.parse(localStorage.getItem(STAFF_KEY))?.staff || [];
    const cur = users[0]; // tạm thời lấy nhân viên đầu tiên

    if (!cur) return;

    document.getElementById("pUsername").value = cur.username;
    document.getElementById("pName").value = cur.name;
    document.getElementById("pRole").value = cur.role;
    document.getElementById("pStatus").value = cur.status === "active" ? "Đang làm" : "Nghỉ làm";
    document.getElementById("pPassword").value = cur.password;

    document.getElementById("showP").onclick = () => {
        const p = document.getElementById("pPassword");
        p.type = p.type === "password" ? "text" : "password";
    };
}

loadProfile();
