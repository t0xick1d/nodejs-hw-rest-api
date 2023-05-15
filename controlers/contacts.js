const { nanoid } = require('nanoid');

const contacts = require('../models/contacts');

const { HttpError } = require('../helper');
const { ctrlWrapper } = require('../helper');

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    console.log(HttpError);
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const body = req.body;
  const id = nanoid();
  const newContact = await contacts.addContact({ id, ...body });
  res.status(201).json(newContact);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await contacts.removeContact(contactId);
  if (!deleteContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (!contactId) {
    throw HttpError(400, 'missing fields');
  }
  const updateContact = await contacts.updateContact(contactId, body);
  if (!updateContact) {
    throw HttpError(400, 'missing fields');
  }
  res.status(200).json(updateContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
