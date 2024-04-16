const fs = require('fs').promises;
const path = require('path');
const nanoid = require('nanoid-esm');

const contactsPath = path.join(__dirname, 'db/contacts.json');



function listContacts() {
    fs.readFile(contactsPath)
        .then(data => console.table(JSON.parse(data)))
        .catch(err => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(data => {
      const contact = JSON.parse(data).filter(item => item.id === contactId);
      if (contact.length !== 0) {
        console.table(contact);
      } else {
        console.warn("\x1B[31m No contact matching id!");
      }
    })
    .catch(err => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(data => {
      const newContactList = JSON.parse(data).filter(item => item.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newContactList))
        .then(console.log("removed"))
        .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data);
      const contact = {id: nanoid(), name, email, phone};
      contacts.push(contact);
      fs.writeFile(contactsPath, JSON.stringify(contacts))
        .then(console.log("added"))
        .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}