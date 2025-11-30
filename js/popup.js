
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