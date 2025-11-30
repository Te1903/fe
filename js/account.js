const APP_KEY = 'qr_order_demo_v1';

document.getElementById("userMenuBtn").onclick = () => {
    document.getElementById("userMenu").classList.toggle("hide");
};

// Tự ẩn dropdown khi click ra ngoài
document.addEventListener("click", function(e){
    if (!e.target.closest(".user-right")) {
        document.getElementById("userMenu").classList.add("hide");
    }
});

