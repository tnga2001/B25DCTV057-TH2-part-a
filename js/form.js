import { rules } from "./validate.js";

export function initForm(form, onValid) {
  const showError = (name, msg) => {
    form.querySelector(`[data-error-for="${name}"]`).textContent = msg;
    form.elements[name].classList.toggle("invalid", Boolean(msg));
  };

  form.addEventListener("input", (e) => {
    const name = e.target.name;
    if (rules[name]) showError(name, rules[name](e.target.value));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    for (const name of Object.keys(rules)) {
      const msg = rules[name](form.elements[name].value);
      showError(name, msg);
      if (msg) ok = false;
    }
    if (!ok) return;
    const saved = await onValid({
      title: form.elements.title.value.trim(),
      author: form.elements.author.value.trim(),
      genre: form.elements.genre.value,
      year: Number(form.elements.year.value),
    });
    if (saved) form.reset();
  });
}
