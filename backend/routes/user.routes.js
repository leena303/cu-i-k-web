const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

// Đăng ký
router.post('/register', async (req, res) => {
  const { username, email, password, role = 'customer', address } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
  }
  userModel.createUser({ username, email, password, role, address }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server khi đăng ký.' });
    res.status(201).json({ message: 'Đăng ký thành công!', userId: result.insertId });
  });
});

// Đăng nhập
router.post('/login', (req, res) => {
  const { emailOrUsername, password, role } = req.body;
  if (!emailOrUsername || !password || !role) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin đăng nhập.' });
  }
  userModel.findByEmailOrUsername(emailOrUsername, role, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server khi kiểm tra thông tin đăng nhập.' });
    if (results.length === 0) return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác hoặc sai vai trò.' });
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác hoặc sai vai trò.' });
    const { password: _, ...userInfo } = user;
    res.status(200).json({ message: 'Đăng nhập thành công!', user: userInfo });
  });
});

// Đổi mật khẩu
router.put('/update-password/:id', async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Thiếu mật khẩu cũ hoặc mới' });
  }
  userModel.findByEmailOrUsername(id, 'customer', async (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy thông tin người dùng' });
    if (results.length === 0) return res.status(404).json({ error: 'Không tìm thấy khách hàng' });
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Mật khẩu cũ không đúng' });
    userModel.updatePassword(id, newPassword, (err2) => {
      if (err2) return res.status(500).json({ error: 'Lỗi server khi cập nhật mật khẩu' });
      res.json({ message: 'Cập nhật mật khẩu thành công' });
    });
  });
});

// Xóa user
router.delete('/:id', (req, res) => {
  userModel.deleteUser(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi xóa người dùng' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy người dùng để xóa' });
    res.json({ message: 'Xóa người dùng thành công' });
  });
});

// Đếm user
router.get('/count', (req, res) => {
  userModel.countUsers((err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy tổng số khách hàng' });
    res.json({ total: results[0].total });
  });
});

// Lấy danh sách user
router.get('/', (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy danh sách khách hàng' });
    res.json(results);
  });
});

module.exports = router;