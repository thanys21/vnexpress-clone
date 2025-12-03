"use client";

const Header = (): React.ReactElement => {
  return (
    <div className="flex">
      <div className="left flex">
        <img
          src="https://s4.vnecdn.net/vnexpress/restruct/i/v9744/v2_2019/pc/graphics/logo_tagline.svg"
          alt="VnExpress - Bao tieng Viet nhieu nguoi xem nhat"
        />
        <div>Nhiệt độ</div>
        <div>Ngày</div>
      </div>
      <div className="right flex">
        <div>breaking news</div>
        <div>regional news</div>
        <div className="flex gap-4">
          <div>Search</div>
          <div>Information</div>
          <div>Notification</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
