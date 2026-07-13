const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getJwtSecret = () => process.env.JWT_SECRET || 'change_this_secret_in_env';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    getJwtSecret(),
    { expiresIn: '12h' }
  );
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'El correo ya está registrado.' });
    }

    const user = new User({ email, password });
    await user.save();

    return res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error('Error en registro de usuario:', error);
    return res.status(500).json({ error: 'Error interno al registrar usuario.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = generateToken(user);
    return res.json({ token, email: user.email });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno en autenticación.' });
  }
};

module.exports = { register, login };
