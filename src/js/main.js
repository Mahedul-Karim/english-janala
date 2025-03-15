const navContainer = document.querySelector(".nav-container");
const header = document.getElementById("header");

const headerHeight = header.clientHeight;

navContainer.addEventListener("click", function (e) {
  const button = e.target.closest(".nav-btn");

  if (!button) return;

  const sectionId = button.dataset.id;

  const section = document.getElementById(sectionId);

  window.scrollTo({
    top: section.offsetTop - headerHeight,
    behavior: "smooth",
  });
});
