import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    // Patikrinam ar yra pilnametis
    const age = Math.floor((Date.now() - new Date(req.body.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));

    if (age < 18) {
      return res.status(400).json({ message: 'You must be at least 18 years old to register' });
    }
    // Apsaugom slaptazodi
    const encryptPwd = await bcrypt.hash(req.body.password, 10);

    // Sukuriame nauja vartotoja su apsaugotu slaptazodziu
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: encryptPwd,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      role: req.body.role
    });

    // Issaugom nauja vartotoja
    const result = await user.save();
    res.status(201).json({
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    // Rasti vartotoja pagal email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Auth failed' });
    }

    // Patikriname ar slaptazodis atitinka
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Auth failed' });
    }

    // Sukuriame token 2 valandom
    const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' }); // Pakankamai laiko atlikt veiksmus, minimaliai data leako

    // Atvaizduojame rezultata
    res.status(200).json({
      message: 'Auth successful',
      token: token,
      userId: user._id,
      role: user.role,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;
