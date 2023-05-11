const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return contactId;
};

const addContact = async ({ name, email, phone, id }) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  const updateContact = contacts[index];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
