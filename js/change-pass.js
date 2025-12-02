const APP_KEY = "qr_order_demo_v1";


function changePassword() {
    const data = JSON.parse(localStorage.getItem(STAFF_KEY)) || {};
    const users = data.staff || [];
    const cur = users[0]; // tạm thời dùng user đầu tiên

    if (!cur) {
        alert("Không tìm thấy tài khoản!");
        return;
    }

    const oldPass = document.getElementById("oldPass").value.trim();
    const newPass = document.getElementById("newPass").value.trim();
    const confirmPass = document.getElementById("confirmPass").value.trim();

    if (!oldPass || !newPass || !confirmPass) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (oldPass !== cur.password) {
        alert("Mật khẩu hiện tại không đúng!");
        return;
    }

    if (newPass.length < 3) {
        alert("Mật khẩu mới phải ít nhất 3 ký tự!");
        return;
    }

    if (newPass !== confirmPass) {
        alert("Mật khẩu nhập lại không trùng khớp!");
        return;
    }

    // Cập nhật mật khẩu
    cur.password = newPass;
    localStorage.setItem(STAFF_KEY, JSON.stringify(data));

    alert("Đổi mật khẩu thành công!");
    window.location.href = "account.html";
}

document.getElementById("btnChange").onclick = changePassword;