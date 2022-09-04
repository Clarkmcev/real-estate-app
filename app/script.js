console.log("Ca marche");

// New offer page styling

const buttonSale = document.getElementById("sale-button");
const buttonRent = document.getElementById("rent-button");
const valueTypeOffer = document.getElementById("value-type-rent");

buttonSale.addEventListener("click", updateButtonSale);
buttonRent.addEventListener("click", updateButtonRent);

function updateButtonSale() {
  valueTypeOffer.value = "sale";
}

function updateButtonRent() {
  valueTypeOffer.value = "rent";
  if (buttonRent.style.backgroundColor === "#1a1e21") {
    buttonRent.style.backgroundColor = null;
    valueTypeOffer.value = null;
  } else {
    buttonSale.style.backgroundColor = null;
    buttonSale.style.borderColor = null;
    buttonRent.style.backgroundColor = "#1a1e21";
    buttonRent.style.borderColor = "#E1D89F";
  }
}

function updateButtonSale() {
  valueTypeOffer.value = "sale";
  if (buttonSale.style.backgroundColor === "#1a1e21") {
    buttonSale.style.backgroundColor = null;
    valueTypeOffer.value = null;
  } else {
    buttonRent.style.backgroundColor = null;
    buttonRent.style.borderColor = null;
    buttonSale.style.backgroundColor = "#1a1e21";
    buttonSale.style.borderColor = "#E1D89F";
  }
}

const buttonHouse = document.getElementById("house-button");
const buttonFlat = document.getElementById("flat-button");
const valueType = document.getElementById("value-type");

function updateButtonHouse() {
  valueType.value = "flat";
  if (buttonHouse.style.backgroundColor === "#1a1e21") {
    buttonHouse.style.backgroundColor = null;
    valueType.value = null;
  } else {
    buttonFlat.style.backgroundColor = null;
    buttonFlat.style.borderColor = null;
    buttonHouse.style.backgroundColor = "#1a1e21";
    buttonHouse.style.borderColor = "#E1D89F";
  }
}

function updateButtonFlat() {
  valueType.value = "house";
  if (buttonFlat.style.backgroundColor === "#1a1e21") {
    buttonFlat.style.backgroundColor = null;
    valueType.value = null;
  } else {
    buttonHouse.style.backgroundColor = null;
    buttonHouse.style.borderColor = null;
    buttonFlat.style.backgroundColor = "#1a1e21";
    buttonFlat.style.borderColor = "#E1D89F";
  }
}

buttonHouse.addEventListener("click", updateButtonHouse);
buttonFlat.addEventListener("click", updateButtonFlat);

// List search filter query

