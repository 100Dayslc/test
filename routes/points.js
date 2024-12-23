
// routes/points.js
const express = require('express');
const router = express.Router();
const { addPoints, getPoints } = require('../controllers/pointsController');
const auth = require('../middleware/auth');

router.post('/add', auth, addPoints);
router.get('/', auth, getPoints);

module.exports = router;
