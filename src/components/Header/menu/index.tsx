const MenuBar = () => {
  return (
    <nav className="border-b">
      <div className="max-w-[1130px] mx-auto px-4">
        <div className="flex items-center gap-6 py-3 overflow-x-auto">
          <a href="" className="text-sm hover:text-red-600 whitespace-nowrap">Trang chủ</a>
          <a href="/thoi-su" className="text-sm hover:text-red-600 whitespace-nowrap">Thời sự</a>
          <a href="/the-gioi" className="text-sm hover:text-red-600 whitespace-nowrap">Thế giới</a>
          <a href="/kinh-doanh" className="text-sm hover:text-red-600 whitespace-nowrap">Kinh doanh</a>
          <a href="/giai-tri" className="text-sm hover:text-red-600 whitespace-nowrap">Giải trí</a>
          <a href="/the-thao" className="text-sm hover:text-red-600 whitespace-nowrap">Thể thao</a>
          <a href="/phap-luat" className="text-sm hover:text-red-600 whitespace-nowrap">Pháp luật</a>
          <a href="/giao-duc" className="text-sm hover:text-red-600 whitespace-nowrap">Giáo dục</a>
          <a href="/du-lich" className="text-sm hover:text-red-600 whitespace-nowrap">Du lịch</a>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
