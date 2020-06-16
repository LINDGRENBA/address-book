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
function Contact (firstName, lastName, phoneNumber, emailAddress, address) {
  this.firstName = firstName; 
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.address = address;
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
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".address").html(contact.address);
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

$(document).ready(function() {
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    attachContactListeners(ourAddressBook);
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedAddress = $("input#new-address").val();

    $("input#new-first-name").val('');
    $("input#new-last-name").val('');
    $("input#new-phone-number").val('');
    $("input#new-email-address").val('');
    $("input#new-address").val('');

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedAddress);
    ourAddressBook.addContact(newContact);
    displayContactDetails();
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