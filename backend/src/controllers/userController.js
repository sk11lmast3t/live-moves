import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName: firstName || '',
      lastName: lastName || '',
    });

    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, language, theme } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        firstName,
        lastName,
        bio,
        'preferences.language': language,
        'preferences.theme': theme,
      },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('watchlist.contentId');
    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const { contentId } = req.params;
    const user = await User.findById(req.user.id);

    // Check if already in watchlist
    const exists = user.watchlist.some((item) => item.contentId.toString() === contentId);
    if (exists) {
      return res.status(400).json({ message: 'Already in watchlist' });
    }

    user.watchlist.push({ contentId });
    await user.save();

    res.status(201).json({ message: 'Added to watchlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const { contentId } = req.params;
    const user = await User.findById(req.user.id);

    user.watchlist = user.watchlist.filter((item) => item.contentId.toString() !== contentId);
    await user.save();

    res.status(200).json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
