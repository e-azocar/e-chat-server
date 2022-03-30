import { genSalt, hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { verifyToken } from '../helpers/verifyToken';
import User from '../models/User';

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({
      error: true,
      message: 'All fields are required',
      auth: false,
      token: null,
    });

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({
        error: true,
        message: 'Invalid data',
        auth: false,
        token: null,
      });
    }

    const validPassword = await compare(password, user.password)

    if (!validPassword) {
      return res.status(401).send({
        error: true,
        message: 'Invalid data',
        auth: false,
        token: null,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 30,
    })
    res.status(200).json({ auth: true, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ auth: true, token, message: 'Server Error', error: false })
  }
}

export const registerController = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const existingUser = await User.findOne({ username })

    if (!name || !username || !password) return res.status(400).json({
      error: true,
      message: 'All fields are required',
      auth: false,
      token: null,
    })

    if (existingUser) return res.status(400).json({
      error: true,
      message: 'The username already exists',
      auth: false,
      token: null,
    })

    const user = new User({
      username,
      name,
      password,
      avatar: 'default.jpg'
    });

    const salt = await genSalt(10)
    const passwordHash = await hash(password, salt)

    user.password = passwordHash

    await user.save();
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 30,
    })

    res.json({ auth: true, token, error: false })
  } catch (e) {
    console.log(e);
    res.status(500).json({ auth: true, token, message: 'Server Error', error: false })
  }
}

export const getUser = (req, res) => {
  res.json({ msg: 'User' })
}

export const getMe = async (req, res) => {
  try {
    const verify = verifyToken(req)

    if (!verify) return res.status(401).json({
      error: true,
      message: 'Unauthorized',
    })

    const user = await User.findById(verify.id)

    if (!user) return res.status(401).json({
      error: true,
      message: 'User not found',
    })

    res.json({ name: user.name, username: user.username, avatar: user.avatar, createdAt: user.createdAt })

  } catch (error) {
    console.log(e);
    res.status(500).json({ auth: true, token, message: 'Server Error', error: false })
  }
}