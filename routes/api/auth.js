const express = require('express');

const router = express.Router();

const ctrl = require('../../controlers/auth');

const { validateBody, authenticate, upload } = require('../../middleweres/');

const schema = require('../../models/user');

router.post('/register', validateBody(schema.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schema.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', validateBody(schema.registerSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.getCurrent);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
