// KEY localStorage
const STAFF_KEY = "qr_staff_data";

// lấy user đang đăng nhập
const currentUser = JSON.parse(localStorage.getItem("current_user"));

function getStaffData() {
    const data = JSON.parse(localStorage.getItem(STAFF_KEY));
    return data?.staff || [];
}

document.addEventListener("DOMContentLoaded", () => {

    if (!currentUser) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "../login/index.html";
        return;
    }

    // tìm đúng user trong danh sách nhân viên
    const list = getStaffData();
    const staff = list.find(s => s.username === currentUser.username);

    if (!staff) {
        alert("Không tìm thấy thông tin nhân viên!");
        return;
    }

    // Đẩy dữ liệu ra giao diện
    document.getElementById("accUser").value = staff.username;
    document.getElementById("accName").value = staff.name;
    document.getElementById("accRole").value = staff.role;
    document.getElementById("accStatus").value = staff.status;
    document.getElementById("accPass").value = staff.password;
});
document.getElementById("togglePass").onclick = function () {
    const input = document.getElementById("accPass");

    if (input.type === "password") {
        input.type = "text";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    }
};

