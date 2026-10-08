import { fetchBooks, createBook, deleteBook } from "./api.js";
import { loadFavorites, saveFavorites } from "./storage.js";
import { renderBooks, fillGenres } from "./render.js";
import { initForm } from "./form.js";

const $ = (id) => document.getElementById(id);
const grid = $("book-grid"), statusEl = $("status"), search = $("search");
const genreFilter = $("genre-filter"), favCount = $("fav-count");

let books = [];
const favorites = loadFavorites();

function visibleBooks() {
  const q = search.value.trim().toLowerCase();
  return books.filter(
    (b) => b.title.toLowerCase().includes(q) && (!genreFilter.value || b.genre === genreFilter.value)
  );
}

function update() {
  const list = visibleBooks();
  renderBooks(grid, list, favorites);
  statusEl.textContent = `Đang hiển thị ${list.length} / ${books.length} cuốn`;
  favCount.textContent = favorites.size;
}

async function init() {
  statusEl.textContent = "Đang tải…";
  try {
    books = await fetchBooks();
    fillGenres([genreFilter, $("genre")], books);
    update();
  } catch (err) {
    statusEl.textContent = `Không tải được dữ liệu: ${err.message}`;
  }
}

search.addEventListener("input", update);
genreFilter.addEventListener("change", update);

grid.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.closest(".card").dataset.id;

  if (btn.classList.contains("fav-btn")) {
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    saveFavorites(favorites);
    update();
  } else if (btn.classList.contains("delete-btn")) {
    if (!confirm("Bạn có chắc muốn xóa cuốn sách này?")) return;
    try {
      await deleteBook(id);
      books = books.filter((b) => String(b.id) !== id);
      favorites.delete(id);
      saveFavorites(favorites);
      fillGenres([genreFilter, $("genre")], books);
      update();
    } catch (err) {
      statusEl.textContent = err.message;
    }
  }
});

initForm($("book-form"), async (data) => {
  try {
    const created = await createBook(data);
    books.unshift(created); 
    fillGenres([genreFilter, $("genre")], books);
    update();
    return true;
  } catch (err) {
    statusEl.textContent = err.message;
    return false;
  }
});

const themeBtn = $("theme-toggle");
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "☀️ Sáng" : "🌙 Tối";
  localStorage.setItem("theme", t);
}
applyTheme(localStorage.getItem("theme") || "light");
themeBtn.addEventListener("click", () =>
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")
);

init();
