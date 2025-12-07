import Link from "next/link";

const Footer = () => {
  const columns = [
    {
      items: [
        { label: "Trang chủ", href: "/" },
        { label: "Ảnh", href: "/anh" },
        { label: "Infographics", href: "/infographics" },
      ],
    },
    {
      items: [
        { label: "VnE-GO", href: "/vne-go" },
        { label: "Thời sự", href: "/thoi-su" },
        { label: "Thế giới", href: "/the-gioi" },
        { label: "Kinh doanh", href: "/kinh-doanh" },
        { label: "Khoa học công nghệ", href: "/khoa-hoc" },
        { label: "Góc nhìn", href: "/goc-nhin" },
      ],
    },
    {
      items: [
        { label: "Bất động sản", href: "/bat-dong-san" },
        { label: "Sức khỏe", href: "/suc-khoe" },
        { label: "Giải trí", href: "/giai-tri" },
        { label: "Thể thao", href: "/the-thao" },
        { label: "Pháp luật", href: "/phap-luat" },
        { label: "Giáo dục", href: "/giao-duc" },
      ],
    },
    {
      items: [
        { label: "Đời sống", href: "/doi-song" },
        { label: "Xe", href: "/xe" },
        { label: "Du lịch", href: "/du-lich" },
        { label: "Ý kiến", href: "/y-kien" },
        { label: "Tâm sự", href: "/tam-su" },
        { label: "Thư giãn", href: "/thu-gian" },
      ],
    },
    {
      items: [
        { label: "Mới nhất", href: "/moi-nhat" },
        { label: "Xem nhiều", href: "/xem-nhieu" },
        { label: "Tin nóng", href: "/tin-nong" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "Lịch vạn niên", href: "/lich-van-nien" },
        { label: "Rao vặt", href: "/rao-vat" },
      ],
    },
  ];

  const columnContract = [
    {
      title: "Tải ứng dụng",
      items: [
        { label: "VnExpress", href: "/app/vnexpress" },
        { label: "International", href: "/app/international" },
      ],
    },
    {
      title: "Liên hệ",
      items: [
        { label: "Tòa soạn", href: "/toa-soan" },
        { label: "Quảng cáo", href: "/quang-cao" },
      ],
    },
    {
      title: " Đường dây nóng",
      items: [
        { label: "083.888.0123 (Hà Nội)", href: "tel:0838880123" },
        { label: "082.233.3555 (TP Hồ Chí Minh)", href: "tel:0822333555" },
      ],
    },
  ];

  return (
    <footer className="bg-[#f7f7f7] border-t border-gray-200 mt-8">
      <div className="max-w-[1130px] mx-auto px-4 py-8">
        <div className="grid grid-cols-6 gap-6 mb-6">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              <ul className="space-y-2">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#757575] hover:text-[#087cce] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            {columnContract.map((column, columnIndex) => (
              <div key={columnIndex} className="mb-4">
                <h4 className="font-bold mb-2 text-sm">{column.title}</h4>
                <div className="flex items-center gap-2">
                  {column.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#757575] hover:text-[#087cce] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-sm">VnExpress Newsletters</h3>
              </div>
              <h4 className="text-lg font-bold mb-1">
                Đừng bỏ lỡ tin tức quan trọng!
              </h4>
              <p className="text-xs text-[#757575]">
                Nhận tóm tắt tin tức nổi bật, hấp dẫn nhất 24 giờ qua trên
                VnExpress.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="thanys15970@gmail.com"
                className="px-4 py-2 border border-gray-300 rounded text-sm w-64"
                defaultValue="thanys15970@gmail.com"
              />
              <button className="text-white px-6 py-2 rounded font-bold bg-[#9f224e] hover:bg-[#8a1e44] transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
          <p className="text-xs text-[#757575] mt-2">
            *Khi đăng ký, bạn đồng ý{" "}
            <Link href="/dieu-khoan" className="text-[#087cce]">
              điều khoản
            </Link>{" "}
            của VnExpress
          </p>
        </div>

        <div className="flex justify-between border-t border-gray-300 pt-4">
          <div>VNExpress</div>
          <div className="flex gap-4 mb-3">
            <Link href="/dieu-khoan" className="hover:text-[#087cce]">
              Điều khoản sử dụng
            </Link>
            <Link href="/chinh-sach" className="hover:text-[#087cce]">
              Chính sách bảo mật
            </Link>
            <Link href="/cookies" className="hover:text-[#087cce]">
              Cookies
            </Link>
            <Link href="/rss" className="hover:text-[#087cce]">
              RSS
            </Link>
            <Link href="/theo-doi" className="hover:text-[#087cce]">
              Theo dõi VnExpress trên
            </Link>
            <div className="flex gap-3 text-lg">
              <Link
                href="https://facebook.com/vnexpress"
                className="hover:text-[#087cce]"
              >
                f
              </Link>
              <Link
                href="https://twitter.com/vnexpress"
                className="hover:text-[#087cce]"
              >
                X
              </Link>
              <Link
                href="https://youtube.com/vnexpress"
                className="hover:text-[#087cce]"
              >
                ▶
              </Link>
              <Link
                href="https://tiktok.com/@vnexpress"
                className="hover:text-[#087cce]"
              >
                ♪
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-start text-xs text-[#757575]">
            <div>
              <p className="mb-1">Báo tiếng Việt nhiều người xem nhất</p>
              <p className="mb-1">Thuộc Bộ Khoa học và Công nghệ</p>
              <p className="mb-1">Số giấy phép: 548/GP-BTTTT do Bộ Thông tin</p>
              <p>và Truyền thông cấp ngày 24/08/2021</p>
            </div>
            <div>
              <p className="mb-1">Tổng biên tập: Phạm Văn Hiếu</p>
              <p className="mb-1">
                Địa chỉ: Tầng 10, Tòa A FPT Tower, số 10 Phạm Văn Bạch,
              </p>
              <p className="mb-1">phường Cầu Giấy, Hà Nội</p>
              <p className="mb-1">Điện thoại: 024 7300 8899 - máy lẻ 4500</p>
              <p>Email: webmaster@vnexpress.net</p>
            </div>
            <div>
              <p className="text-xs text-[#757575]">
                © 1997-2025. Toàn bộ bản quyền thuộc VnExpress
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
