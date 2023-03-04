const phoneHunter = async (searchText, phoneLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, phoneLimit);
};
const displayPhone = (phones, phoneLimit) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.textContent = "";
  const showAll = document.getElementById("showAll");
  // Show All condition
  if (phoneLimit && phones.length > 9) {
    phones = phones.slice(0, 9);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // validation
  const validMsg = document.getElementById("validMsg");
  if (phones.length === 0) {
    validMsg.classList.remove("d-none");
  } else {
    validMsg.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card">
        <img src="${phone.image}" class="card-img-top p-3 rounded-3" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">details</button>
        </div>
      </div>
    `;

    cardContainer.appendChild(div);
  });
  // Loader stopper
  loadSpinner(false);
};

// Search Mobile Function here
const showAllSearch = (phoneLimit) => {
  loadSpinner(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  phoneHunter(searchText, phoneLimit);
};

const searchMobile = () => {
  // loader Start
  showAllSearch(9);
};
// Input field Enter Event Handler
document.getElementById("searchField").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      showAllSearch(9);
    }
  });

document.getElementById("showAllBtn").addEventListener("click", function () {
  showAllSearch();
});

// loader function start here
const loadSpinner = (isLoader) => {
  const spninerLoader = document.getElementById("spninerLoader");
  if (isLoader === true) {
    spninerLoader.classList.remove("d-none");
  } else {
    spninerLoader.classList.add("d-none");
  }
};

// Show Mobile Data in modal
const phoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  phoneDetailsModal(data.data);
};
// Show Mobile Data in modal call
const phoneDetailsModal = (phones) => {
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = document.getElementById("modalImg");
  modalTitle.innerText = phones.name;
  modalImg.src = phones.image;
};
phoneHunter(9);


