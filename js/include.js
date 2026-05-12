async function loadIncludes() {
  const elements = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...elements].map(async (element) => {
      const file = element.dataset.include;

      try {
        const response = await fetch(file);

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        element.innerHTML = await response.text();
      } catch (error) {
        console.error(`Include failed: ${file}`, error);
        element.innerHTML = "";
      }
    })
  );

  setActiveNavigation();
}

function normalizePath(path) {
  if (path === "/" || path === "") return "/index.html";

  return path
    .replace(/\/$/, "/index.html")
    .replace(/\/index\.html$/, "/index.html");
}

function setActiveNavigation() {
  const currentPath = normalizePath(window.location.pathname);
  const navLinks = document.querySelectorAll("[data-nav-link]");

  navLinks.forEach((link) => {
    const linkPath = normalizePath(new URL(link.href).pathname);
    const isActive = linkPath === currentPath;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

document.addEventListener("DOMContentLoaded", loadIncludes);
