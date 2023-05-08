const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res) {
  try {
    const { email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
     // Create a new user
     const newUser = new User({
        email,
        password: hashedPassword,
        role,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error during user registration:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare the passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Create and sign a JWT token
      const token = jwt.sign(
        { user: { id: user._id, role: user.role } },
        process.env.secretKey,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ token });
    } catch (err) {
      console.error('Error during user login:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  module.exports = { register, login };
