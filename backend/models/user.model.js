const db = require('../db');
const bcrypt = require('bcrypt');

exports.getAllUsers = (callback) => {
  db.query('SELECT id, username, email, role FROM users WHERE role = ?', ['customer'], callback);
};

exports.countUsers = (callback) => {
  db.query('SELECT COUNT(*) AS total FROM users WHERE role = ?', ['customer'], callback);
};

exports.createUser = async (user, callback) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  db.query(
    'INSERT INTO users (username, email, password, role, address) VALUES (?, ?, ?, ?, ?)',
    [user.username, user.email, hashedPassword, user.role || 'customer', user.address || null],
    callback
  );
};

exports.findByEmailOrUsername = (emailOrUsername, role, callback) => {
  db.query(
    'SELECT * FROM users WHERE (email = ? OR username = ?) AND role = ?',
    [emailOrUsername, emailOrUsername, role],
    callback
  );
};

exports.updatePassword = async (id, newPassword, callback) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, id], callback);
};

exports.deleteUser = (id, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [id], callback);
};