
// controllers/announcementController.js
const Announcement = require('../models/Announcement');

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      $or: [
        { userId: req.user.id },
        { type: 'general' },
      ],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements',
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { announcementId } = req.params;
    await Announcement.findByIdAndUpdate(announcementId, { read: true });

    res.json({
      success: true,
      message: 'Marked as read',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark announcement as read',
    });
  }
};