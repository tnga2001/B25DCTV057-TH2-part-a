export function createBookCard(book, isFav) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = book.id;

  const title = document.createElement("h3");
  title.textContent = book.title;
  const author = document.createElement("p");
  author.textContent = `Tác giả: ${book.author}`;
  const info = document.createElement("p");
  info.textContent = `${book.genre} • ${book.year}`;

  const actions = document.createElement("div");
  actions.className = "actions";
  const fav = document.createElement("button");
  fav.type = "button";
  fav.className = "fav-btn" + (isFav ? " active" : "");
  fav.textContent = isFav ? "♥ Đã thích" : "♡ Yêu thích";
  const del = document.createElement("button");
  del.type = "button";
  del.className = "delete-btn";
  del.textContent = "Xóa";
  actions.append(fav, del);

  card.append(title, author, info, actions);
  return card;
}

export function renderBooks(container, books, favorites) {
  container.replaceChildren(...books.map((b) => createBookCard(b, favorites.has(String(b.id)))));
}

export function fillGenres(selects, books) {
  const genres = [...new Set(books.map((b) => b.genre))].sort();
  selects.forEach((sel) => {
    const keep = sel.value;
    while (sel.options.length > 1) sel.remove(1);
    genres.forEach((g) => sel.add(new Option(g, g)));
    sel.value = genres.includes(keep) ? keep : "";
  });
}
