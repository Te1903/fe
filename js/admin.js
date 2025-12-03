// admin-router.js
const basePath = window.location.pathname.replace(/\/pages\/admin\/.*$/,'') + '/pages/admin/';
const contentEl = document.getElementById('appContent');

function loadPage(page) {
  fetch(page)
    .then(r => {
      if (!r.ok) throw new Error('Cannot load ' + page);
      return r.text();
    })
    .then(html => {
      contentEl.innerHTML = html;
      // nếu fragment muốn file JS đặc thù, nạp file tương ứng
      if (page.includes('menu-list.html')) {
        loadScript('../../js/menu.js');
      }
      if (page.includes('staff.html')) {
        // load staff.js nếu cần
      }
    })
    .catch(err => {
      contentEl.innerHTML = `<div style="padding:20px;color:#b00">Lỗi tải trang: ${err.message}</div>`;
      console.error(err);
    });
}

function loadScript(src) {
  // remove previous menu.js nếu đã nạp
  const prev = document.querySelector(`script[src="${src}"]`);
  if (prev) prev.remove();
  const s = document.createElement('script');
  s.src = src;
  document.body.appendChild(s);
}

// init: gắn sự kiện nav-link
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
    const page = a.getAttribute('data-page') || 'dashboard.html';
    // page là filename trong cùng folder
    loadPage(page);
  });
});

// auto load menu page khi mở admin
window.addEventListener('DOMContentLoaded', () => {
  const active = document.querySelector('.nav-link.active') || document.querySelector('.nav-link');
  const page = active.getAttribute('data-page') || 'dashboard.html';
  loadPage(page);
  // hamburger toggle
  const hamb = document.getElementById('hamburger');
  hamb?.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-collapsed');
  });
});

