const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'procurementManager', 'inspectionManager'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
