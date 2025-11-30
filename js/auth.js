function handleLogin() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // ---- TÀI KHOẢN MẶC ĐỊNH ----
    if (user === "admin" && pass === "123") {
        localStorage.setItem("role", "admin");
        window.location.href = "../../pages/admin/index.html";
        return;
    }

    if (user === "cashier" && pass === "123") {
        localStorage.setItem("role", "cashier");
        window.location.href = "../../pages/cashier/index.html";
        return;
    }

    alert("Sai tài khoản hoặc mật khẩu!");
}
