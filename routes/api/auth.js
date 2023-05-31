const express = require('express');

const router = express.Router();

const ctrl = require('../../controlers/auth');

const { validateBody, authenticate } = require('../../middleweres/');

const schema = require('../../models/user');

router.post('/register', validateBody(schema.registerSchema), ctrl.register);

router.post('/login', validateBody(schema.registerSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.getCurrent);

module.exports = router;
