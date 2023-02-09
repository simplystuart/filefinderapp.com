function getGalleryConstants() {
  var width = document.querySelector("div.gallery-item").clientWidth;
  return width == 400
    ? { step: 416, upperBound: 832 }
    : { step: 380, upperBound: 955 };
}

function getGalleryTranslateX() {
  var gallery = document.getElementById("gallery");
  return new DOMMatrix(window.getComputedStyle(gallery).transform).e;
}

function setGallaryTranslateX(translateX) {
  var gallerConstants = getGalleryConstants();
  var gallery = document.getElementById("gallery");
  var leftArrow = document.getElementById("gallery-left-arrow");
  var rightArrow = document.getElementById("gallery-right-arrow");

  gallery.style.transform = "translateX(" + translateX + "px)";

  translateX == gallerConstants.upperBound
    ? leftArrow.classList.add("disabled")
    : leftArrow.classList.remove("disabled");

  translateX == gallerConstants.upperBound * -1
    ? rightArrow.classList.add("disabled")
    : rightArrow.classList.remove("disabled");
}

function toggleActiveGalleryItem(item) {
  var browserWidth = document.documentElement.clientWidth;
  var domRect = item.getBoundingClientRect();

  console.log({
    x: domRect.x,
    browserWidth: browserWidth,
    width: domRect.width,
  });

  if (domRect.x > 0 && browserWidth > domRect.x + domRect.width) {
    item.classList.add("active-gallery-item");
  } else {
    item.classList.remove("active-gallery-item");
  }
}

document.getElementById("down-arrow").addEventListener("click", function (_) {
  window.scrollBy({ top: window.innerHeight, left: 0, behavior: "smooth" });
});

window.addEventListener(
  "scroll",
  function (_) {
    widdow.pageYOffset > 0
      ? document.getElementById("down-arrow").classList.add("hidden")
      : document.getElementById("down-arrow").classList.remove("hidden");
  },
  true
);

document.querySelectorAll("div.gallery-item").forEach(function (item) {
  item.addEventListener("click", function (_) {
    if (document.documentElement.clientWidth > 599) {
      document.getElementById("modal-content").innerHTML = item.innerHTML;
      document.getElementById("modal").showModal();
      document.body.classList.add("noscroll");
    }
  });

  toggleActiveGalleryItem(item);
});

document
  .getElementById("gallery-left-arrow")
  .addEventListener("click", function (_) {
    var galleryConstants = getGalleryConstants();
    var offset = getGalleryTranslateX();

    var translateX =
      offset < galleryConstants.upperBound
        ? offset + galleryConstants.step
        : offset;

    setGallaryTranslateX(translateX);

    setTimeout(function () {
      document
        .querySelectorAll("div.gallery-item")
        .forEach(toggleActiveGalleryItem);
    }, 600);
  });

document
  .getElementById("gallery-right-arrow")
  .addEventListener("click", function (_) {
    var galleryConstants = getGalleryConstants();
    var offset = getGalleryTranslateX();

    var translateX =
      offset > galleryConstants.upperBound * -1
        ? offset - galleryConstants.step
        : offset;

    setGallaryTranslateX(translateX);

    setTimeout(function () {
      document
        .querySelectorAll("div.gallery-item")
        .forEach(toggleActiveGalleryItem);
    }, 600);
  });

window.addEventListener("resize", function (_) {
  if (document.documentElement.clientWidth > 599)
    document.getElementById("gallery").transform = "";

  document
    .querySelectorAll("div.gallery-item")
    .forEach(toggleActiveGalleryItem);
});

document
  .getElementById("gallery-modal")
  .addEventListener("close", function (_) {
    document.body.classList.remove("noscroll");
  });

document
  .getElementById("gallery-modal-close")
  .addEventListener("click", function (_) {
    document.getElementById("gallery-modal").close();
  });

/* FORM */

document.querySelectorAll("a.ask-link").forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("ask-modal").showModal();
  });
});

document.getElementById("ask-modal").addEventListener("close", function (_) {
  document.body.classList.remove("noscroll");
});

document
  .getElementById("ask-modal-close")
  .addEventListener("click", function (_) {
    document.getElementById("ask-modal").close();
  });
