import Image from "next/image";

const Header = (): React.ReactElement => {
  return (
    <header className="bg-white border-b">
      <div className="left flex items-center gap-6">
            <Image
              src="https://s4.vnecdn.net/vnexpress/restruct/i/v9744/v2_2019/pc/graphics/logo_tagline.svg"
              alt="VnExpress - Bao tieng Viet nhieu nguoi xem nhat"
              width={200}
              height={32}
              className="h-8"
            />
            <div className="text-sm">26°</div>
            <div className="text-sm text-gray-600">Thứ tư, 3/12/2025</div>
          </div>
          <div className="right flex items-center gap-6">
            <div className="text-sm hover:text-red-600 cursor-pointer">Mới nhất</div>
            <div className="text-sm text-gray-600">Tin theo khu vực</div>
            <div className="flex gap-3">
              <button className="p-2 hover:bg-gray-100 rounded">Search</button>
              <button className="p-2 hover:bg-gray-100 rounded">Notification</button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                T
              </div>
            </div>
          </div>
    </header>
  );
};

export default Header;
