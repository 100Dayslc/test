
// routes/announcements.js
const express = require('express');
const router = express.Router();
const { 
  getAnnouncements, 
  markAsRead 
} = require('../controllers/announcementController');
const auth = require('../middleware/auth');

router.get('/', auth, getAnnouncements);
router.put('/:announcementId/read', auth, markAsRead);

module.exports = router;