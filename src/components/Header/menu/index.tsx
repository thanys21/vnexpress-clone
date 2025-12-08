import Link from "next/link";

const MenuBar = () => {
  return (
    <nav className="border-b">
      <div className="max-w-[1130px] mx-auto px-4">
        <div className="flex items-center gap-6 py-3 overflow-x-auto">
          <Link href="/" className="text-sm hover:text-red-600 whitespace-nowrap">Trang chủ</Link>
          <Link href="/thoi-su" className="text-sm hover:text-red-600 whitespace-nowrap">Thời sự</Link>
          <Link href="/the-gioi" className="text-sm hover:text-red-600 whitespace-nowrap">Thế giới</Link>
          <Link href="/kinh-doanh" className="text-sm hover:text-red-600 whitespace-nowrap">Kinh doanh</Link>
          <Link href="/giai-tri" className="text-sm hover:text-red-600 whitespace-nowrap">Giải trí</Link>
          <Link href="/the-thao" className="text-sm hover:text-red-600 whitespace-nowrap">Thể thao</Link>
          <Link href="/phap-luat" className="text-sm hover:text-red-600 whitespace-nowrap">Pháp luật</Link>
          <Link href="/giao-duc" className="text-sm hover:text-red-600 whitespace-nowrap">Giáo dục</Link>
          <Link href="/du-lich" className="text-sm hover:text-red-600 whitespace-nowrap">Du lịch</Link>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
