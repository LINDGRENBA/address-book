//Business Logic for AddressBook (#1)------
function AddressBook () {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i]
      }
    }
  }
  return false; 
}

AddressBook.prototype.deleteContact = function (id) {
  for (let i = 0; i <this.contacts.length; i ++) {
    if (this.contacts [i]){
    if (this.contacts[i].id == id){
      delete this.contacts[i];
      return true;
    }
    }
  };
  return false; 
}

// AddressBook.prototype.findEmptyEmergencyContact = function (){
//   for (let i = 0; i<this.contacts.length; i++) {
//     if (this.contacts[i]) {
//       if (emergencyContact = " ") {
//         alert(this.contacts[i].firstName + "Fill in your Emergency Contact Info");
//       }
//     }
//   };
//   return false; 
// }

// AddressBook.prototype.addEmergencyContactAll = function () {
  
//   for (let i = 0; i <this.contacts.length; i ++) {
//     if (this.contacts[i]){
//     this.contacts[i].emergencyContact = " ";
//     }
//   };
// }

//Business Logic for Contacts (#2)-----
function Contact (firstName, lastName, workPhone, personalPhone, workEmail, personalEmail, workAddress, personalAddress) {
  this.firstName = firstName; 
  this.lastName = lastName;
  this.phoneNumber = new Address(workPhone, personalPhone);
  this.emailAddress = new Address(workEmail, personalEmail);
  this.address = new Address(workAddress, personalAddress);
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Contact.prototype.update = function (favoriteColor) {
//   return this.favoriteColor = favoriteColor; 
//   // return this.favoriteColor;
// }

Contact.prototype.newFirstName = function(newFirstName) {
  this.firstName = newFirstName;
}

//business logic for addresses ----
function Address(work, personal) {
  this.work = work;
  this.personal = personal;
}

Address.prototype.addAddress = function(addressType, actualAddress) {
  if (addressType === 'work') {
    this.work = actualAddress;
  } else if (addressType === 'personal') {
    this.personal = actualAddress;
  }
}

//user interface logic
let ourAddressBook = new AddressBook();

function displayContactDetails() {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  ourAddressBook.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li class=" + contact.id + ">" + contact.fullName() + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = ourAddressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".work-phone-number").html(contact.phoneNumber.work);
  $(".personal-phone-number").html(contact.phoneNumber.personal);
  $(".work-email-address").html(contact.emailAddress.work);
  $(".personal-email-address").html(contact.emailAddress.personal);
  $(".work-address").html(contact.address.work);
  $(".personal-address").html(contact.address.personal);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append(`<button class='deleteButton ${contact.id}'>Delete</button>`);
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact($(this).attr("class"));
  });
  $("#buttons").on('click', ".deleteButton", function() {
    ourAddressBook.deleteContact($(this).attr('class').slice(12));
    $("#show-contact").hide();
    displayContactDetails();
  });
}

function pullInputData() {
  const inputtedFirstName = $("input#new-first-name").val();
  const inputtedLastName = $("input#new-last-name").val();
  const inputtedWorkPhoneNumber = $("input#new-work-phone-number").val();
  const inputtedPersonalPhoneNumber = $("input#new-personal-phone-number").val();
  const inputtedWorkEmailAddress = $("input#new-work-email-address").val();
  const inputtedPersonalEmailAddress = $("input#new-personal-email-address").val();
  const inputtedWorkAddress = $("input#new-work-address").val();
  const inputtedPersonalAddress = $("input#new-personal-address").val();
  return [inputtedFirstName, inputtedLastName, inputtedWorkPhoneNumber, inputtedPersonalPhoneNumber, inputtedWorkEmailAddress, inputtedPersonalEmailAddress, inputtedWorkAddress, inputtedPersonalAddress]
}

function clearDataInputs() {
  $("input#new-first-name").val('');
  $("input#new-last-name").val('');
  $("input#new-work-phone-number").val('');
  $("input#new-personal-phone-number").val('');
  $("input#new-work-email-address").val('');
  $("input#new-personal-email-address").val('');
  $("input#new-work-address").val('');
  $("input#new-personal-address").val('');
}

function addNewContact(dataArray) {
  let newContact = new Contact(dataArray[0], dataArray[1], dataArray[2], dataArray[3], dataArray[4], dataArray[5], dataArray[6], dataArray[7]);
  ourAddressBook.addContact(newContact);
}

$(document).ready(function() {
  $("button#formSubmit").click(function(event) {
    event.preventDefault();
    attachContactListeners(ourAddressBook);
    dataArray = pullInputData();
    addNewContact(dataArray);

    clearDataInputs();
    displayContactDetails();
    $(".hiddenInput").hide();
  })
  $("button#addInputField").click(function(event) {
    event.preventDefault();
    const newField = $("select#inputField").val();

    $(`div#${newField}`).show();
  })
})










//Code Written on Monday with no User Interface or form input
// let addressBook = new AddressBook(); //Adds a new object for #1 --> the new address book = addressBook
// let contact = new Contact("Ada", "Lovelace", "503-555-0100"); //Adds a new object for #2
// let contact2 = new Contact("Grace", "Hopper", "503-555-0199"); //Adds a new object for #2
// let contact3 = new Contact("Mars", "Lindgren", "360-756-6999");
// addressBook.addContact(contact); //takes the new object for #2 and puts it into object #1 using obejct #1's method add contact
// addressBook.addContact(contact2); //""

// addressBook.addContact(contact3);
// console.log(contact3);
// let contact4 = new Contact ("Mary", "Rosinski", "827-343-2324");
// addressBook.addContact(contact4);
// console.log(contact4);
// console.log (contact2);


/*
contact2.update() = "blue";
console.log(contact2); 
let favoriteColor = "blue";
addressBook.update(contact2);*/

// contact2.update("blue");
// console.log(contact2);
// contact2.newFirstName("Betty");
// console.log(contact2);
// addressBook.addEmergencyContactAll();
// addressBook.findEmptyEmergencyContact();