function formatVND(n){
    return n.toLocaleString("vi-VN") + " đ";
}

function loadReport(){
    const data = JSON.parse(localStorage.getItem("qr_order_demo_v1") || "{}");

    const orders = data.orders || [];

    // ngày tạo
    document.getElementById("rDate").textContent = new Date().toLocaleDateString("vi-VN");

    // ngày bán
    document.getElementById("rSaleDate").textContent =
        new Date().toLocaleDateString("vi-VN");

    // tổng thu
    let totalIncome = 0;
    let totalBank = 0;
    let totalCash = 0;

    let cancelCount = 0;
    let cancelValue = 0;

    orders.forEach(o => {
        if(o.paid){
            const sum = o.items.reduce((s,i)=>s+i.price*i.qty,0);
            totalIncome += sum;

            if(o.paymentMethod === "cash") totalCash += sum;
            if(o.paymentMethod === "bank") totalBank += sum;
        }

        if(o.itemsCancel){
            o.itemsCancel.forEach(c => {
                cancelCount += c.qty;
                cancelValue += c.qty * c.price;
            });
        }
    });

    document.getElementById("rIncome").textContent = formatVND(totalIncome);
    document.getElementById("rOutcome").textContent = "0 đ"; // nếu có chi thêm thì bạn bổ sung sau
    document.getElementById("rBalance").textContent = formatVND(totalIncome);

    document.getElementById("rCash").textContent = formatVND(totalCash);
    document.getElementById("rBank").textContent = formatVND(totalBank);

    document.getElementById("rOrders").textContent = orders.filter(o => o.paid).length;
    document.getElementById("rRevenue").textContent = formatVND(totalIncome);

    document.getElementById("rCancelCount").textContent = cancelCount;
    document.getElementById("rCancelValue").textContent = formatVND(cancelValue);
}

loadReport();

