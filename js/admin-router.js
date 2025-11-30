// =============================
// SPA ROUTER ADMIN – BẢN CHUẨN 
// =============================

// MAIN CONTENT
const main = document.querySelector(".admin-main");

// SIDEBAR LINKS
const navLinks = document.querySelectorAll(".nav-link");

// CLICK EVENT
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const page = link.dataset.page;
        if (!page) return;

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        loadPage(page);
    });
});

// =============================
// LOAD PAGE
// =============================
async function loadPage(page) {

    const fullPath = `./${page}`;

    try {
        const res = await fetch(fullPath);

        if (!res.ok) {
            main.innerHTML = `<h2 style="color:red">Không thể tải trang: ${fullPath}</h2>`;
            return;
        }

        const html = await res.text();
        main.innerHTML = html;

        runPageScripts(page);

    } catch (err) {
        console.error(err);
        main.innerHTML = `<h2 style="color:red">Lỗi tải trang!</h2>`;
    }
}

// =============================
// TẢI JS THEO TRANG
// =============================
function runPageScripts(page) {

    if (page === "menu-list.html") {
        import("../js/menu-admin.js").then(() => 
            console.log("menu-admin.js loaded"));
    }

    if (page === "staff-list.html") {
        import("../../js/staff-admin.js").then(()=> {
            console.log("Staff JS loaded");
        });
    }

    if (page === "tables.html") {
    import("../../js/tables-admin.js").then(() => {
        console.log("tables-admin.js loaded");
    });
}


    if (page === "dashboard.html") {
        import("../../js/admin.js");
    }
    if (page === "account.html") {
    import("../js/account.js");
    }

}

// =============================
// LOAD PAGE MẶC ĐỊNH
// =============================
loadPage("dashboard.html");

// =============================
// SIDEBAR TOGGLE
// =============================
document.getElementById("hamburger")?.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-collapsed");
});
