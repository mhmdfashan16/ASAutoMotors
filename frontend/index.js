const images = [
  "Home images/bike-hero.png",
  "Home images/bike1.png",
  "Home images/bike2.png",
  "Home images/bike3.png"
];

let index = 0;
const container = document.querySelector(".hero-right");

function changeImage() {
  const oldImage = document.getElementById("hero-image");
  if (oldImage) oldImage.remove();

  const img = document.createElement("img");
  img.src = images[index];
  img.id = "hero-image";
  img.alt = "Hero Bike";
  container.appendChild(img);

  index = (index + 1) % images.length;
}

changeImage();
setInterval(changeImage, 6000);
