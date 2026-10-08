export const API_URL = "";

export async function fetchBooks() {
  const res = await fetch(API_URL || "./books.json");
  if (!res.ok) throw new Error(`Lỗi máy chủ (${res.status})`);
  return res.json();
}

export async function createBook(book) {
  if (!API_URL) return { ...book, id: String(Date.now()) };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error(`Không thêm được sách (${res.status})`);
  return res.json();
}

export async function deleteBook(id) {
  if (!API_URL) return;
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Không xóa được sách (${res.status})`);
}
