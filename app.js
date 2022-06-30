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
    // we are adding here edit and delete event listeners because when list load then only we will able to see the button
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

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
    editElement.innerHTML = value;
    displayAlert("item changed and added", "success");
    // edit local storage
    editLocalStorage(editId, value);
    setBackToDefault();
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
  setBackToDefault();
  // localStorage.remove("list")
}
//delete function
function deleteItem(e) {
  console.log(e.currentTarget.parentElement.parentElement);
  const element = e.currentTarget.parentElement.parentElement;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  let id = e.currentTarget.parentElement.parentElement.dataset.id;
  //removeFromLocalStorage(id)
  displayAlert("item got deleted", "danger");

  //console.log(e.currentTarget.parentElement.parentElement.dataset.id);
}
function editItem(e) {
  console.log(e.currentTarget.parentElement.parentElement);
  const element = e.currentTarget.parentElement.parentElement;

  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  console.log(editElement);
  // setting value in input
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}
// edit function
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
// remove from local storage
function removeFromLocalStorage(id) {
  console.log(id);
}
// edit local storage
function editLocalStorage(id, value) {}
// ****** SETUP ITEMS **********
