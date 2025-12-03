import qrcode

# Đường dẫn file HTML
url = "https://github.com/Te1903/index.html"


# Tạo mã QR
qr = qrcode.QRCode(
    version=1,
    box_size=10,
    border=4
)
qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="red", back_color="white")
img.save("QR_Order.png")

print("Đã tạo mã QR: order.png")

