// START: Middleware – middleware/verifyToken.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Kein Token vorhanden' });

  try {
    const decoded = jwt.verify(token, 'dein_geheimer_schluessel');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Ungültiger Token' });
  }
};
// END: verifyToken.js


// START: Backend – server.js (Ausschnitt zur Einbindung)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
// END