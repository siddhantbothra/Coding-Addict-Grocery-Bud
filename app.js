// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editId = "";
// ****** EVENT LISTENERS **********
form.addEventListener("submit", addItem);
// clear item button
clearBtn.addEventListener("click", clearItem);
// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  console.log(grocery.value);
  const id = new Date().getTime();
  const value = grocery.value;
  if (value && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    // append child
    list.appendChild(element);
    // display alert
    displayAlert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    console.log("editing");
  } else {
    displayAlert("Please enter a value", "danger");
  }
}

// display Alert function

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setInterval(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
// clear item functioln
function clearItem() {
  console.log("clear");
  // clearing item from the list also
  const items = document.querySelectorAll(".grocery-item");
  console.log(items);
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("list is empty now", "danger");
}
// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  console.log("added to local storage ");
}
// ****** SETUP ITEMS **********
