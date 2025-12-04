// DEMO dữ liệu Thu ngân (sau này bạn thay bằng API)
const cashierAccount = {
  name: "Huỳnh Kim Cương",
  username: "bep",
  role: "Bếp ",
  email: "bep01@gmail.com",
  phone: "0988 0556 366",
  created: "30/12/2025",
};

// Load dữ liệu
document.getElementById("accName").innerText = cashierAccount.name;
document.getElementById("accUsername").innerText = cashierAccount.username;
document.getElementById("accRole").innerText = cashierAccount.role;
document.getElementById("accEmail").innerText = cashierAccount.email;
document.getElementById("accPhone").innerText = cashierAccount.phone;
document.getElementById("accCreated").innerText = cashierAccount.created;

function goChangePass() {
  window.location.href = "../change-pass/index.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "../login/index.html";
}

