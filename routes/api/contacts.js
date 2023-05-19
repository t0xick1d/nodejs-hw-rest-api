const express = require('express');

const router = express.Router();

const ctrl = require('../../controlers/contacts');

const { validateBody, isValidId } = require('../../middleweres/');

const { schema } = require('../../models/contact');

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.deleteById);

router.put('/:contactId', isValidId, validateBody(schema), ctrl.updateById);

module.exports = router;
