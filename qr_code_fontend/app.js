/* ===== QR ORDER SYSTEM - BẢN SẠCH ===== */
const APP_KEY = 'qr_order_demo_v1';

/* Demo images (bạn có thể đổi thành ảnh local nếu muốn) */
const IMG_CAFE_SUADA    = "https://lh6.googleusercontent.com/proxy/LcrQvf5VlPKjyIVgH6UUURhh9HPOorCMbr091cGQwkF78pqw6TtPnLT1zlsPJA87rvAxSrntSrJhT6F2u_O6N3i2pK4y32kEZ7cvDpHA9DwHhvnLNozl_5EPfQzpwpgVHbaMky5_rdUqjAzGmGNY6VYeZDhmFDfDpk8d20z8Q9bX-OYGaTeiXuiaA4M";
const IMG_TRA_DAO       = "https://product.hstatic.net/200000791069/product/lord-50_5221e714bef5444aaab6759e2a219146_master.jpg";
const IMG_MY_CAY        = "https://haisanloccantho.com/wp-content/uploads/2024/11/mi-cay-hai-san.jpg";
const IMG_BANH_FLAN     = "https://monngonmoingay.com/wp-content/uploads/2024/08/cach-lam-banh-flan-bang-noi-chien-khong-dau-1-1.jpg";
const IMG_BANH_BONG_LAN = "https://www.huongnghiepaau.com/wp-content/uploads/2019/07/banh-bong-lan-pho-mai-dai-loan.jpg";
const IMG_MATCHA        = "https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg";
const IMG_NUOC_CAM      = "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/2/19/cach-lam-nuoc-cam-ep-ngon-va-thom-ket-hop-voi-le-va-gung-5-1645248090817401855254.jpg";
const IMG_KHOAI_TAY     = "https://cdn.tgdd.vn/2021/07/CookProduct/khoai-tay-chien-bao-nhieu-calo-an-khoai-lang-hay-khoai-tay-chien-tot-hon-00-1200x676.jpg";

/* Categories (dùng cho filter nếu cần) */
const CATEGORIES = [
  { id: 'all',    name: 'Tất cả',       icon: '📋' },
  { id: 'cafe',   name: 'Cà phê',       icon: '☕' },
  { id: 'tra',    name: 'Trà trái cây', icon: '🍵' },
  { id: 'trasua', name: 'Trà sữa',      icon: '🧋' },
  { id: 'nuocep', name: 'Nước ép',      icon: '🍊' },
  { id: 'banh',   name: 'Bánh ngọt',    icon: '🍰' },
  { id: 'monno',  name: 'Món no',       icon: '🍛' },
  { id: 'snack',  name: 'Ăn vặt',       icon: '🍟' }
];

/* ----------------- INIT DEMO DATA (CHỈ LẦN ĐẦU) ----------------- */
function initDemoData(){
  if (localStorage.getItem(APP_KEY)) return;   // ❗ KHÔNG XÓA NỮA

  const demo = {
    menu: [
      { id: 101, name: "Cà phê sữa đá",     price: 25000, category: "cafe",   desc: "Cà phê chuẩn gu Việt", img: IMG_CAFE_SUADA,    status: "ok" },
      { id: 102, name: "Trà đào cam sả",    price: 32000, category: "tra",    desc: "Thanh mát, thơm vị đào", img: IMG_TRA_DAO,   status: "ok" },
      { id: 103, name: "Mỳ cay hải sản",    price: 45000, category: "monno",  desc: "Cay nồng, nhiều hải sản", img: IMG_MY_CAY,   status: "ok" },
      { id: 104, name: "Bánh flan",         price: 22000, category: "banh",   desc: "Mềm mịn, béo thơm", img: IMG_BANH_FLAN,      status: "ok" },
      { id: 105, name: "Bông lan phô mai",  price: 30000, category: "banh",   desc: "Xốp mềm, phô mai béo", img: IMG_BANH_BONG_LAN,status: "ok" },
      { id: 106, name: "Matcha Latte",      price: 35000, category: "trasua", desc: "Matcha chuẩn Nhật", img: IMG_MATCHA,         status: "ok" },
      { id: 107, name: "Nước ép cam",       price: 20000, category: "nuocep", desc: "Cam vắt tươi mỗi ngày", img: IMG_NUOC_CAM,  status: "ok" },
      { id: 108, name: "Khoai tây chiên",   price: 18000, category: "snack",  desc: "Giòn rụm nóng hổi", img: IMG_KHOAI_TAY,      status: "ok" }
    ],
    tables: [1,2,3,4,5,6],
    orders: [],
    nextOrderId: 1
  };
  localStorage.setItem(APP_KEY, JSON.stringify(demo));
}

/* ----------------- DB HELPERS ----------------- */
function readData(){ return JSON.parse(localStorage.getItem(APP_KEY) || '{}'); }
function writeData(d){ localStorage.setItem(APP_KEY, JSON.stringify(d)); }
function formatVND(n){ return n.toLocaleString('vi-VN') + ' ₫'; }

/* ----------------- CART (SESSION) ----------------- */
function getCart(){ return JSON.parse(sessionStorage.getItem('qr_cart') || '[]'); }
function setCart(c){ sessionStorage.setItem('qr_cart', JSON.stringify(c)); updateBottomCart(); }
function clearCart(){ sessionStorage.removeItem('qr_cart'); updateBottomCart(); }

/* ----------------- CUSTOMER MENU ----------------- */
function renderCategories(){
  const wrap = document.getElementById('cat-row');
  if (!wrap) return;
  wrap.innerHTML = '';
  CATEGORIES.forEach(cat=>{
    const btn = document.createElement('div');
    btn.className = 'cat-chip' + (cat.id==='all' ? ' active':'');
    btn.dataset.cat = cat.id;
    btn.textContent = cat.icon + ' ' + cat.name;
    btn.onclick = ()=>{
      document.querySelectorAll('.cat-chip').forEach(c=>c.classList.remove('active'));
      btn.classList.add('active');
      renderMenuList(cat.id);
    };
    wrap.appendChild(btn);
  });
}

function renderMenuList(catId='all'){
  const data = readData();
  const wrap = document.getElementById('menu-list');
  if (!wrap) return;

  // Ẩn món hết hàng với khách
  let items = data.menu.filter(m => m.status !== 'out');
  if (catId !== 'all') items = items.filter(m => m.category === catId);

  if (items.length === 0){
    wrap.innerHTML = `<div class="small">Chưa có món trong danh mục này.</div>`;
    return;
  }

  wrap.innerHTML = items.map(m=>`
    <div class="menu-card" onclick="openPopup(${m.id})">
      <div class="card-media"><img src="${m.img}" alt="${m.name}"></div>
      <div class="card-body">
        <div class="menu-name">${m.name}</div>
        <div class="menu-desc">${m.desc || ''}</div>
        <div class="menu-price">${formatVND(m.price)}</div>
      </div>
    </div>
  `).join('');
}

/* Chỉ cho ĐẶT MÓN nếu có ?table=... (quét QR), còn xem menu thì thoải mái */
function requireQR(){
  const table = new URLSearchParams(location.search).get('table');
  if (!table || table === 'demo'){
    alert("Vui lòng quét mã QR tại bàn để gọi món!");
    return false;
  }
  return true;
}

/* ----------------- POPUP CHỌN MÓN ----------------- */
let popupState = { id:null, qty:1 };

function openPopup(menuId){
  // khách chỉ xem menu thì bạn có 2 lựa chọn:
  // 1. Không cho mở popup luôn:
  // if (!requireQR()) return;
  // hoặc 2. Cho xem, nhưng khi bấm "Thêm giỏ" mới chặn:
  const data = readData();
  const m = data.menu.find(x=>x.id===menuId);
  if (!m) return alert("Món không tồn tại");

  popupState.id = m.id;
  popupState.qty = 1;

  const img  = document.getElementById('popup-img');
  const name = document.getElementById('popup-title');
  const desc = document.getElementById('popup-desc');
  const price= document.getElementById('popup-price');
  const qty  = document.getElementById('popup-qty');
  const box  = document.getElementById('popup');

  if (!box) return;
  if (img)   img.src = m.img;
  if (name)  name.textContent = m.name;
  if (desc)  desc.textContent = m.desc || '';
  if (price) price.textContent = formatVND(m.price);
  if (qty)   qty.textContent = popupState.qty;

  box.style.display = 'flex';
}

function closePopup(){
  const box = document.getElementById('popup');
  if (box) box.style.display = 'none';
  popupState.id = null;
  popupState.qty = 1;
}

function popupChangeQty(delta){
  popupState.qty = Math.max(1, popupState.qty + delta);
  const qty = document.getElementById('popup-qty');
  if (qty) qty.textContent = popupState.qty;
}

function popupAddToCart(){
  if (!requireQR()) return;        // chặn gọi món nếu chưa scan QR
  if (!popupState.id) return;

  const data = readData();
  const m = data.menu.find(x=>x.id===popupState.id);
  if (!m) return;

  let cart = getCart();
  const ex = cart.find(x=>x.menuId === m.id);
  if (ex) ex.qty += popupState.qty;
  else cart.push({ menuId:m.id, name:m.name, price:m.price, qty:popupState.qty, img:m.img });

  setCart(cart);
  closePopup();
  toast("Đã thêm " + m.name + " vào giỏ");
}

/* ----------------- TOAST ----------------- */
function toast(msg){
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.classList.add('show'), 20);
  setTimeout(()=>{
    t.classList.remove('show');
    setTimeout(()=> t.remove(), 300);
  }, 1500);
}

/* ----------------- BOTTOM CART ----------------- */
function updateBottomCart(){
  const bar = document.getElementById('bottom-cart');
  if (!bar) return;

  const cart = getCart();
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+i.qty*i.price,0);

  if (count === 0){
    bar.style.display = 'none';
  } else {
    const c = document.getElementById('bottom-count');
    const t = document.getElementById('bottom-total');
    if (c) c.textContent = count;
    if (t) t.textContent = formatVND(total);
    bar.style.display = 'flex';
  }
}

/* MỞ CỬA SỔ GIỎ HÀNG */
function openCart(){
  const cart = getCart();
  if (cart.length === 0) return alert("Giỏ hàng trống");

  let html = `<h2>Giỏ hàng</h2>`;
  cart.forEach(it=>{
    html += `<div>${it.name} x${it.qty} — ${formatVND(it.qty * it.price)}</div>`;
  });
  const total = cart.reduce((s,i)=>s + i.qty*i.price,0);
  html += `
    <hr>
    <div><strong>Tổng: ${formatVND(total)}</strong></div>
    <br>
    <button onclick="window.opener.placeOrder(); window.close();">Gửi order</button>
    <button onclick="window.opener.clearCart(); window.close();" style="margin-left:8px;">Xóa giỏ</button>
  `;

  const w = window.open('', '_blank', 'width=420,height=680');
  w.document.write(`<body style="font-family:Inter;padding:16px;">${html}</body>`);
}

/* GỬI ORDER */
function placeOrder(){
  const cart = getCart();
  if (cart.length === 0) return alert("Giỏ hàng trống!");

  const params = new URLSearchParams(location.search);
  const table = params.get('table');
  if (!table || table === 'demo'){
    alert("Vui lòng quét QR đúng bàn trước khi gửi order!");
    return;
  }

  const data = readData();
  const order = {
    id: data.nextOrderId++,
    table,
    items: cart.map(c => ({ name:c.name, qty:c.qty, price:c.price })),
    status: 'new',
    paid: false,
    createdAt: new Date().toISOString()
  };

  data.orders.push(order);
  writeData(data);
  setCart([]);
  alert("Gửi order thành công! Mã đơn: " + order.id);
}

/* HỦY ĐƠN (thu ngân hoặc admin gọi) */
function cancelOrder(id){
  const data = readData();
  const o = data.orders.find(x=>x.id===id);
  if (!o) return alert("Không tìm thấy đơn");
  if (!confirm("Hủy đơn #" + id + " ?")) return;

  o.status = 'canceled';
  writeData(data);
  if (document.getElementById('cashier-orders')) renderCashierPage();
  if (document.getElementById('orders-list')) renderKitchenPage();
}

/* ----------------- KITCHEN PAGE ----------------- */
/* Kitchen page: render orders and allow status update */
function renderKitchenPage() {
  const data = readData();
  const list = document.getElementById("orders-list");
  if (!list) return;

  if (!data.orders || data.orders.length === 0) {
    list.innerHTML = `<div class="small">Chưa có order</div>`;
    return;
  }

  const sorted = data.orders.slice().sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));

  list.innerHTML = sorted.map(o => {
    const statusText =
      o.status === "new" ? "🟡 Mới nhận" :
      o.status === "preparing" ? "🟠 Đang chế biến" :
      o.status === "done" ? "🟢 Hoàn thành" :
      o.status === "failed" ? "🔴 Không thể chế biến" :
      "⚫ Không xác định";

    return `
      <div class="order-card">
        <div style="display:flex; justify-content:space-between;">
          <strong>Đơn #${o.id}</strong>
          <span class="small">${new Date(o.createdAt).toLocaleString()}</span>
        </div>

        <div>Bàn: <b>${o.table}</b></div>

        <div style="margin-top:8px">
          ${o.items.map(it=> `<div>${it.name} x${it.qty}</div>`).join("")}
        </div>

        <div class="status-box">${statusText}</div>

        <div class="actions">
          ${o.status === "new" ? `<button onclick="updateOrderStatus(${o.id}, 'preparing')">Bắt đầu</button>` : ""}
          ${o.status === "preparing" ? `<button onclick="updateOrderStatus(${o.id}, 'done')">Hoàn thành</button>` : ""}
          ${o.status === "preparing" ? `<button class="btn-danger" onclick="updateOrderStatus(${o.id}, 'failed')">Không thể làm</button>` : ""}
        </div>
      </div>
    `;
  }).join("");
}


/* ----------------- CASHIER PAGE ----------------- */
function renderCashierPage(filter='all'){
  const data = readData();
  const wrap = document.getElementById('cashier-orders');
  if (!wrap) return;

  let orders = data.orders.slice().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
  if (filter === 'paid')     orders = orders.filter(o=>o.paid);
  else if (filter === 'unpaid') orders = orders.filter(o=>!o.paid);

  if (orders.length === 0){
    wrap.innerHTML = "<div class='small'>Chưa có đơn</div>";
    return;
  }

  wrap.innerHTML = orders.map(o=>{
    const total = o.items.reduce((s,it)=>s+it.qty*it.price,0);
    const cls = o.status + (o.paid ? ' paid':'');
    const itemsHtml = o.items.map(it=>`${it.name} x${it.qty}`).join(', ');
    return `
      <div class="cashier-card ${cls}">
        <strong>Đơn #${o.id}</strong> — Bàn ${o.table}<br>
        <div class="small">${new Date(o.createdAt).toLocaleString()}</div>
        <div style="margin-top:6px">${itemsHtml}</div>
        <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
          <strong>Tổng: ${formatVND(total)}</strong>
          <div class="order-actions">
            ${!o.paid ? `<button class="btn-primary" onclick="markPaid(${o.id})">Thanh toán</button>` : ""}
            <button class="btn-cancel" onclick="cancelOrder(${o.id})">Hủy</button>
            <button onclick="printInvoice(${o.id})">🖨 In</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function markPaid(id){
  const data = readData();
  const o = data.orders.find(x=>x.id===id);
  if (!o) return;
  o.paid = true;
  writeData(data);
  renderCashierPage();
}

function printInvoice(id){
  const data = readData();
  const o = data.orders.find(x=>x.id===id);
  if (!o) return;
  const total = o.items.reduce((s,it)=>s+it.qty*it.price,0);
  const text = `
HÓA ĐƠN — ĐƠN #${o.id}
Bàn: ${o.table}

${o.items.map(it=>`${it.name} x${it.qty} — ${formatVND(it.price*it.qty)}`).join('\n')}

Tổng: ${formatVND(total)}
Trạng thái thanh toán: ${o.paid ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}
`;
  const w = window.open('', '_blank','width=420,height=680');
  w.document.write(`<pre style="font-family:monospace;padding:16px;">${text}</pre>`);
  w.print();
}

/* ----------------- MENU ADMIN (CARD LỚN) ----------------- */
/*
  menu-admin.html gọi: renderAdminPage(), openMenuModal(), submitMenuForm(), closeMenuModal()
*/
let adminModalMode = 'add';
let adminEditingId = null;

function renderAdminPage(){
  const data = readData();
  const wrap = document.getElementById('admin-menu');
  if (!wrap) return;

  if (!data.menu || data.menu.length === 0){
    wrap.innerHTML = "<div class='small'>Chưa có món nào</div>";
    return;
  }

  wrap.innerHTML = data.menu.map(m=>`
    <div class="admin-card">
      <img src="${m.img}" alt="${m.name}">
      <div class="admin-card-body">
        <div class="admin-name">${m.name}</div>
        <div class="admin-desc">${m.desc || ''}</div>
        <div class="admin-price">${formatVND(m.price)}</div>
        <div class="status-tag ${m.status==='out'?'off':'on'}">
          ${m.status==='out' ? 'HẾT HÀNG' : 'CÒN HÀNG'}
        </div>
        <div style="margin-top:8px" class="admin-actions">
          <button class="btn-small" onclick="adminToggleStatus(${m.id})">
            ${m.status==='out' ? 'Mở bán' : 'Hết hàng'}
          </button>
          <button class="btn-small" onclick="openMenuModal('edit', ${m.id})">Sửa</button>
          <button class="btn-small btn-del" onclick="adminDeleteMenu(${m.id})">Xóa</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* Dùng cho admin.html cũ (nếu có nút onclick="adminAddMenu()") */
function adminAddMenu(){
  openMenuModal('add');
}

function openMenuModal(mode, id){
  adminModalMode = mode;
  adminEditingId = id || null;

  const data = readData();
  const modal = document.getElementById('menu-modal');
  const title = document.getElementById('menu-modal-title');
  const err   = document.getElementById('menu-error');

  if (!modal) return;

  err.textContent = '';

  if (mode === 'edit'){
    const m = data.menu.find(x=>x.id===id);
    if (!m) return alert("Không tìm thấy món");
    title.textContent = 'Sửa món';
    document.getElementById('menu-name').value     = m.name;
    document.getElementById('menu-price').value    = m.price;
    document.getElementById('menu-category').value = m.category || 'cafe';
    document.getElementById('menu-img').value      = m.img || '';
    document.getElementById('menu-desc').value     = m.desc || '';
  } else {
    title.textContent = 'Thêm món mới';
    document.getElementById('menu-name').value     = '';
    document.getElementById('menu-price').value    = '';
    document.getElementById('menu-category').value = 'cafe';
    document.getElementById('menu-img').value      = '';
    document.getElementById('menu-desc').value     = '';
  }

  modal.style.display = 'flex';
}

function closeMenuModal(){
  const modal = document.getElementById('menu-modal');
  const err   = document.getElementById('menu-error');
  if (modal) modal.style.display = 'none';
  if (err) err.textContent = '';
}

function submitMenuForm(e){
  e.preventDefault();
  const name     = document.getElementById('menu-name').value.trim();
  const price    = +document.getElementById('menu-price').value;
  const category = document.getElementById('menu-category').value;
  const img      = document.getElementById('menu-img').value.trim();
  const desc     = document.getElementById('menu-desc').value.trim();
  const err      = document.getElementById('menu-error');

  if (!name){
    err.textContent = "Tên món không được trống";
    return;
  }
  if (isNaN(price) || price <= 0){
    err.textContent = "Giá phải là số dương";
    return;
  }

  const data = readData();

  // kiểm tra trùng tên (trừ món đang sửa)
  const lower = name.toLowerCase();
  const existed = data.menu.find(m =>
    m.name.toLowerCase() === lower &&
    (adminModalMode === 'add' || m.id !== adminEditingId)
  );
  if (existed){
    err.textContent = "Tên món đã tồn tại";
    return;
  }

  if (adminModalMode === 'add'){
    const id = Date.now();
    data.menu.push({
      id, name, price, category, img, desc, status:'ok'
    });
  } else {
    const m = data.menu.find(x=>x.id===adminEditingId);
    if (!m) return alert("Không tìm thấy món");
    m.name     = name;
    m.price    = price;
    m.category = category;
    m.img      = img;
    m.desc     = desc;
  }

  writeData(data);
  renderAdminPage();
  closeMenuModal();
}

function adminDeleteMenu(id){
  if (!confirm("Xóa món này?")) return;
  const data = readData();
  data.menu = data.menu.filter(x=>x.id!==id);
  writeData(data);
  renderAdminPage();
}

function adminToggleStatus(id){
  const data = readData();
  const m = data.menu.find(x=>x.id===id);
  if (!m) return;
  m.status = (m.status === 'out') ? 'ok' : 'out';
  writeData(data);
  renderAdminPage();
}

/* ----------------- BÀN (DÙNG CHO ADMIN ĐƠN GIẢN) ----------------- */
function adminAddTable(){
  const t = +prompt("Thêm số bàn:");
  if (!t) return;
  const data = readData();
  if (data.tables.includes(t)) return alert("Bàn đã tồn tại!");
  data.tables.push(t);
  writeData(data);
  if (typeof renderAdminPage === 'function') renderAdminPage();
}
function adminDeleteTable(t){
  if (!confirm("Xóa bàn này?")) return;
  const data = readData();
  data.tables = data.tables.filter(x=>x!==t);
  writeData(data);
  if (typeof renderAdminPage === 'function') renderAdminPage();
}

/* ----------------- ENTRY POINT ----------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  initDemoData();

  // Trang menu khách
  if (document.getElementById('menu-list')){
    if (document.getElementById('cat-row')) renderCategories();
    renderMenuList('all');
    updateBottomCart();
  }

  // Bếp
  if (document.getElementById('orders-list')){
    renderKitchenPage();
  }

  // Thu ngân
  if (document.getElementById('cashier-orders')){
    renderCashierPage();
  }

  // Menu admin (card)
  if (document.getElementById('admin-menu')){
    renderAdminPage();
  }

  // Click ra ngoài để tắt popup món
  const pop = document.getElementById('popup');
  if (pop){
    pop.addEventListener('click', e=>{
      if (e.target === pop) closePopup();
    });
  }
});

