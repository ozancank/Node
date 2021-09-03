const express = require('express');
const router = express.Router();

const local = require('../middleware/locals');

const accountController = require('../controllers/account');

router.get('/login', local, accountController.getLogin);
router.post('/login', local, accountController.postLogin);

router.get('/register', local, accountController.getRegister);
router.post('/register', local, accountController.postRegister);

router.get('/logout', local, accountController.getLogout);

router.get('/reset-password', local, accountController.getReset);
router.post('/reset-password', local, accountController.postReset);

router.get('/reset-password/:token', local, accountController.getNewPassword);
router.post('/new-password', local, accountController.postNewPassword);

module.exports = router;
