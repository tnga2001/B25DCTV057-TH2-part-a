export const rules = {
  title: (v) => (v.trim().length < 3 ? "Tên sách phải từ 3 ký tự" : ""),
  author: (v) => (v.trim() ? "" : "Tác giả là bắt buộc"),
  genre: (v) => (v ? "" : "Vui lòng chọn thể loại"),
  year: (v) => {
    const n = Number(v);
    const max = new Date().getFullYear();
    return v !== "" && Number.isInteger(n) && n >= 1900 && n <= max
      ? ""
      : `Năm phải từ 1900 đến ${max}`;
  },
};
