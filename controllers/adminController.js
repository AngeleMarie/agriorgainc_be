import Admin from '../models/admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Register Admin
 const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, role, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    // Create and save the new admin
    const admin = new Admin({ fullName, email, phoneNumber, role, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

// Login Admin
 const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

// Reset Password
 const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // Hash and update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};
export default {loginAdmin,registerAdmin}