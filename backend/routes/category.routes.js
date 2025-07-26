const express = require('express');
const router = express.Router();
const categoryModel = require('../models/category.model');

// Lấy danh sách danh mục
router.get('/', (req, res) => {
  const { name, description, page = 1, limit = 999999 } = req.query;
  const filters = {
    name, description,
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit)
  };
  categoryModel.getCategories(filters, (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server' });
    res.json(results);
  });
});

// Lấy chi tiết danh mục
router.get('/:category_id', (req, res) => {
  categoryModel.getCategoryById(req.params.category_id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy danh mục' });
    if (results.length === 0) return res.status(404).json({ error: 'Không tìm thấy danh mục' });
    res.json(results[0]);
  });
});

// Thêm danh mục
router.post('/', (req, res) => {
  categoryModel.createCategory(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi thêm danh mục' });
    res.json({ message: 'Thêm danh mục thành công', categoryId: result.categoryId });
  });
});

// Cập nhật danh mục
router.put('/:category_id', (req, res) => {
  categoryModel.updateCategory(req.params.category_id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi cập nhật danh mục' });
    if (result && result.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy danh mục để cập nhật' });
    res.json({ message: 'Cập nhật danh mục thành công' });
  });
});

// Xóa danh mục
router.delete('/:category_id', (req, res) => {
  categoryModel.deleteCategory(req.params.category_id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi xóa danh mục' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy danh mục để xóa' });
    res.json({ message: 'Xóa danh mục thành công' });
  });
});

module.exports = router;