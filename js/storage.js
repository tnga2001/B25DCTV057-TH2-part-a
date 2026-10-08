const KEY = "favorites";

export function loadFavorites() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY)) || []);
  } catch {
    return new Set();
  }
}

export function saveFavorites(set) {
  localStorage.setItem(KEY, JSON.stringify([...set]));
}
