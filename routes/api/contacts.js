const express = require('express');

const router = express.Router();

const ctrl = require('../../controlers/contacts');

const { validateBody } = require('../../middleweres/');

const { schema } = require('../../schemas/contacts');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schema), ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validateBody(schema), ctrl.updateById);

module.exports = router;
