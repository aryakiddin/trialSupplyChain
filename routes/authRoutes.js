const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
});

module.exports = router;
