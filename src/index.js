// Create Element function shortcut
// function createEl(tag, attobj) {
//   const elm = document.createElement(tag);
//   for (const key of Object.keys(attobj)) {
//     elm[key] = attobj[key];
//   }
//   return elm;
// }

const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");
const mainEl = document.querySelector(".view-section")

const state = {
  contacts: [],
  selectedContact: null
};

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;
      console.log(state.contacts)

      renderContactsList();
    });
}

function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    // [TODO] Write Code
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function listenNewContactButton() {

  let btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {
    // [TODO] Write Code
    formEl = document.createElement(`form`)
    formEl.setAttribute(`class`, `form-stack`)
    formEl.classList.add( `light-shadow`, `center`, `contact-form`)

    h1El = document.createElement(`h1`)
    h1El.innerText = "Create contact" 

    // FIRST NAME
    labelFirstNameEl = document.createElement(`label`)
    labelFirstNameEl.setAttribute(`for`, `first-name-input`)
    labelFirstNameEl.innerText = "First Name:"
    
    inputFirstNameEl = document.createElement(`input`)
    inputFirstNameEl.setAttribute(`id`, `first-name-input`)
    inputFirstNameEl.setAttribute(`name`, `first-name-input`)
    inputFirstNameEl.setAttribute(`type`, `text`)

    //LAST NAME
    labelLastNameEl = document.createElement(`label`)
    labelLastNameEl.setAttribute(`for`, `last-name-input`)
    labelLastNameEl.innerText = "Last Name:"

    inputLastNameEl = document.createElement(`input`)
    inputLastNameEl.setAttribute(`id`, `last-name-input`)
    inputLastNameEl.setAttribute(`name`, `last-name-input`)
    inputLastNameEl.setAttribute(`type`, `text`)

    //STREET
    labelStreetEl = document.createElement(`label`)
    labelStreetEl.setAttribute(`for`, `street-input`)
    labelStreetEl.innerText = "street:"

    inputStreetEl = document.createElement(`input`)
    inputStreetEl.setAttribute(`id`, `street-input`)
    inputStreetEl.setAttribute(`name`, `street-input`)
    inputStreetEl.setAttribute(`type`, `text`)

    //CITY
    labelCityEl = document.createElement(`label`)
    labelCityEl.setAttribute(`for`, `city-input`)
    labelCityEl.innerText = "City:"

    inputCityEl = document.createElement(`input`)
    inputCityEl.setAttribute(`id`, `city-input`)
    inputCityEl.setAttribute(`name`, `city-input`)
    inputCityEl.setAttribute(`type`, `text`)

    //POST CODE
    labelPostcodeEl = document.createElement(`label`)
    labelPostcodeEl.setAttribute(`for`, `post-code-input`)
    labelPostcodeEl.innerText = "Post Code:"

    inputPostcodeEl = document.createElement(`input`)
    inputPostcodeEl.setAttribute(`id`, `post-code-input`)
    inputPostcodeEl.setAttribute(`name`, `post-code-input`)
    inputPostcodeEl.setAttribute(`type`, `text`)

    //CHECKBOX SECTION
    checkboxSection = document.createElement(`div`)
    checkboxSection.setAttribute(`class`, `checkbox-section`)

    //BLOCK CHECKBOX
    blockInputEl = document.createElement(`input`)
    blockInputEl.setAttribute(`id`, `block-checkbox`)
    blockInputEl.setAttribute(`name`, `block-checkbox`)
    blockInputEl.setAttribute(`type`, `checkbox`)

    blockLabelEl = document.createElement(`label`)
    blockLabelEl.setAttribute(`for`, `block-checkbox`)
    blockLabelEl.innerText = "Block"

    //ACTION SECTION
    actionSectionEl = document.createElement(`div`)
    actionSectionEl.setAttribute(`class`, `actions-section`)

    //ACTION BUTTON
    btnCreate = document.createElement(`button`)
    btnCreate.setAttribute(`class`, `button`)
    btnCreate.classList.add(`blue`)
    btnCreate.innerText = "Block"
    btnCreate.setAttribute(`type`, `submit`)
    btnCreate.innerText = "Create"

    formEl.addEventListener(`submit`, function(e) {
      e.preventDefault()
      // add contact to State
      // update SERVER
      // call f render
      
      let newContact = {
        blockContact: false,
        firstName: formEl["first-name-input"].value,
        lastName: formEl["last-name-input"].value,
        // addressId: ????
      }

      let newAddress = {
          city: formEl["city-input"].value,
          postCode: formEl["post-code-input"].value,
          street: formEl["street-input"].value
        }

      fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Now contacts-data in Server are", data);
        });
    
      fetch("http://localhost:3000/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      })
        .then((response) => response.json())
        .then((data) => {
        console.log("Now addresses-data in Server are", data);
        });
      const contactsListEl = document.querySelector(".contacts-list");
      contactsListEl.innerHTML = "";
      main();      
      }//f of 2nd argument
    ) //submit arguments

    //APPENDING:
    actionSectionEl.append(btnCreate)

    checkboxSection.append(blockInputEl, blockLabelEl)

    formEl.append(h1El, 
      labelFirstNameEl, 
      inputFirstNameEl, 
      labelLastNameEl, 
      inputLastNameEl,
      labelStreetEl,
      inputStreetEl,
      labelCityEl,
      inputCityEl,
      labelPostcodeEl,
      inputPostcodeEl,
      checkboxSection,
      actionSectionEl)

    mainEl.append(formEl)
  })//eventListener
} //function

// [TODO] Write Code

function main() {
  listenNewContactButton();
  getContacts();
}

main();
