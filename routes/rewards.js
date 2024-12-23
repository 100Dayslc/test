
// routes/rewards.js
const express = require('express');
const router = express.Router();
const { 
  getAllRewards, 
  redeemReward 
} = require('../controllers/rewardController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllRewards);
router.post('/redeem', auth, redeemReward);

module.exports = router;
