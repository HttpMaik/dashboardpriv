// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  avatar: {
    type: String,
    default: '', // Hier kannst du z.B. eine Default-Avatar-URL setzen
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
  lastEdited: { type: Date, default: null },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch(err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);