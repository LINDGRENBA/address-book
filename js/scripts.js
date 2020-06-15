//Business Logic for AddressBook (#1)------
function AddressBook () {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact){
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function(contact) {
  this.currentId += 1;
  return this.currentId;
}

//Business Logic for Contacts (#2)-----
function Contact (firstName, lastName, phoneNumber) {
  this.firstName = firstName; 
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

let addressBook = new AddressBook(); //Adds a new object for #1
let contact = new Contact("Ada", "Lovelace", "503-555-0100"); //Adds a new object for #2
let contact2 = new Contact("Grace", "Hopper", "503-555-0199"); //Adds a new object for #2
addressBook.addContact(contact); //takes the new object for #2 and puts it into object #1 using obejct #1's method add contact
addressBook.addContact(contact2); //""
