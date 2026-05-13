import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export async function register(req, res) {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password, role });
  if (!user) return res.status(400).json({ message: 'Invalid user data' });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  console.log("🔐 Login attempt for email:", email);

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ User not found in database");
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  console.log("✅ User found:", user.email);

  const isMatch = await user.matchPassword(password);
  console.log("🔑 Password match result:", isMatch);

  if (isMatch) {
    console.log("✅ Login successful, generating token...");
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } else {
    console.log("❌ Password mismatch");
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

export async function me(req, res) {
  res.json(req.user);
}