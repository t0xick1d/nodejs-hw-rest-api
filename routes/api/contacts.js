const express = require('express');

const router = express.Router();

const ctrl = require('../../controlers/contacts');

const { validateBody, isValidId, authenticate } = require('../../middleweres/');

const { schema, updateFavoriteSchema } = require('../../models/contact');

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schema), ctrl.add);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);

router.put('/:contactId', authenticate, isValidId, validateBody(schema), ctrl.updateById);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact,
);

module.exports = router;
