export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: "1", name: "Thời sự", slug: "thoi-su" },
  { id: "2", name: "Kinh doanh", slug: "kinh-doanh" },
  { id: "3", name: "Thể thao", slug: "the-thao" },
  { id: "4", name: "Giải trí", slug: "giai-tri" },
  { id: "5", name: "Pháp luật", slug: "phap-luat" },
  { id: "6", name: "Giáo dục", slug: "giao-duc" },
  { id: "7", name: "Du lịch", slug: "du-lich" },
  { id: "8", name: "Khoa học", slug: "khoa-hoc" },
  { id: "9", name: "Sức khỏe", slug: "suc-khoe" },
  { id: "10", name: "Đời sống", slug: "doi-song" },
];
