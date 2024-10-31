// Constant
const blackRadio = document.getElementById("black");
const whiteRadio = document.getElementById("white");
const userNameInput = document.getElementById("userName");
const range1 = document.getElementById("range1");
const range2 = document.getElementById("range2");
const images = document.querySelectorAll(".images img");
const dropper = document.getElementById("dropper");

const nameOnShirt = document.createElement("div");
nameOnShirt.classList.add("name-on-shirt");
nameOnShirt.innerText = "Title";

const tshirtImage = document.getElementById("tshirt-image");
tshirtImage.parentElement.appendChild(nameOnShirt);

let draggedImage = null;

// Function Update Text Color
let nameElement;
function updateTextColor() {
  if (blackRadio.checked) {
    nameOnShirt.style.color = "white";
    if (nameElement) {
      nameElement.style.color = "white";
    }
  } else if (whiteRadio.checked) {
    nameOnShirt.style.color = "black";
    if (nameElement) {
      nameElement.style.color = "black";
    }
  }
}

updateTextColor();

// Function Change T-shirt
blackRadio.addEventListener("change", function () {
  if (this.checked) {
    tshirtImage.src = "./src/images/t-shirt_black.png";
    updateTextColor();
  }
});

whiteRadio.addEventListener("change", function () {
  if (this.checked) {
    tshirtImage.src = "./src/images/t-shirt_white.png";
    updateTextColor();
  }
});

// Function name t-shirt
userNameInput.addEventListener("input", function () {
  nameOnShirt.textContent = userNameInput.value || "Title";
});

// Function move name with input type range
range1.addEventListener("input", function () {
  const offsetY = (range1.value - 0) * 2;
  nameOnShirt.style.transform = `translateY(${offsetY}px)`;
});

range2.addEventListener("input", function () {
  const offsetX = (range2.value - 0) * 2;
  nameOnShirt.style.transform = `translateX(${offsetX}px)`;
});

// Drag and drop
images.forEach((image) => {
  image.addEventListener("dragstart", (event) => {
    draggedImage = image.src;
  });
});

dropper.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropper.addEventListener("drop", (event) => {
  event.preventDefault();
  if (draggedImage) {
    addImageToDropper(draggedImage);
    draggedImage = null;
  }
});

// Click
function handleImageClick(image) {
  const imageUrl = image.src;
  addImageToDropper(imageUrl);
}

// Function to add image to dropper
function addImageToDropper(imageUrl) {
  const imageName = imageUrl.split("/").pop().split(".")[0].toUpperCase();

  const existingImages = dropper.querySelectorAll(".dropped-image");
  existingImages.forEach((img) => img.remove());
  const existingName = dropper.querySelector(".name-on-image");
  if (existingName) existingName.remove();

  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.className = "dropped-image";

  const smallImgElement = document.createElement("img");
  smallImgElement.src = imageUrl;
  smallImgElement.className = "dropped-image small";

  dropper.appendChild(imgElement);
  dropper.appendChild(smallImgElement);

  nameElement = document.createElement("div");
  nameElement.className = "name-on-image";
  nameElement.textContent = imageName;
  updateTextColor();
  dropper.appendChild(nameElement);
}

// Add click event to images for mobile
images.forEach((image) => {
  image.addEventListener("click", () => handleImageClick(image));
});
