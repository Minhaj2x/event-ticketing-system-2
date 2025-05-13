const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public
router.post('/register', register);
router.post('/login', login);

// Protected “me” route
router.get('/me', verifyToken, (req, res) => {
  res.json({
    message: 'You are authorized',
    user: { id: req.user.id, role: req.user.role }
  });
});

module.exports = router;
