const STAFF_KEY = "qr_staff_data";

function loadProfile() {
    const data = JSON.parse(localStorage.getItem(STAFF_KEY));
    const users = data?.staff || [];
    const cur = users[0]; // tạm thời test

    if (!cur) return;

    document.getElementById("accUser").value   = cur.username;
    document.getElementById("accName").value   = cur.name;
    document.getElementById("accRole").value   = cur.role;
    document.getElementById("accStatus").value = cur.status === "active" ? "Đang làm" : "Nghỉ làm";
    document.getElementById("accPass").value   = cur.password;
}

loadProfile();
