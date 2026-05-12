async function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');

  for (const element of elements) {
    const file = element.getAttribute('data-include');

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Could not load ${file}`);
      }

      element.innerHTML = await response.text();
    } catch (error) {
      element.innerHTML = `<p>Include error: ${error.message}</p>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', includeHTML);