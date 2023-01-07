document.querySelectorAll("#gallery div.gallery-item").forEach(function (item) {
  item.addEventListener("click", function (_) {
    document.getElementById("modal-content").innerHTML = item.innerHTML;
    document.getElementById("modal").showModal();
    document.body.classList.add("noscroll");
  });
});

document.getElementById("modal").addEventListener("close", function (_) {
  document.body.classList.remove("noscroll");
});

document.getElementById("modal-close").addEventListener("click", function (_) {
  document.getElementById("modal").close();
});

window.addEventListener(
  "scroll",
  function (_) {
    document.querySelector("i.si-chevron-down").classList.add("hidden");
  },
  true
);
