const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productModel = require('../models/product.model');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Upload 1 ảnh
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Không có file được upload' });
  res.json({ imageUrl: `/uploads/${req.file.originalname}` });
});

// Upload nhiều ảnh
router.post('/upload-multi', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'Không có file được upload' });
  const imageUrls = req.files.map(file => `/uploads/${file.originalname}`);
  res.json({ imageUrls });
});

// Lấy danh sách sản phẩm (có phân trang và lọc)
router.get('/', (req, res) => {
  const { name, category, trademark, page = 1, limit = 999999 } = req.query;
  const filters = {
    name, category, trademark,
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit)
  };
  productModel.getProducts(filters, (err, results) => {
    if (err) return res.status(500).send(err);
    results.forEach(product => {
      try {
        if (product.images && product.images.trim().startsWith('[')) {
          product.images = JSON.parse(product.images);
        } else if (product.images) {
          product.images = [product.images];
        } else {
          product.images = [];
        }
      } catch (e) {
        product.images = [];
      }
    });
    res.json(results);
  });
});

// Lấy chi tiết sản phẩm theo ID
router.get('/:id', (req, res) => {
  productModel.getProductById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    const product = results[0];
    try {
      if (product.images && product.images.trim().startsWith('[')) {
        product.images = JSON.parse(product.images);
      } else if (product.images) {
        product.images = [product.images];
      } else {
        product.images = [];
      }
    } catch (e) {
      product.images = [];
    }
    res.json(product);
  });
});

// Thêm sản phẩm
router.post('/', (req, res) => {
  productModel.createProduct(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi thêm sản phẩm' });
    res.json({ message: 'Thêm sản phẩm thành công', id: result.id });
  });
});

// Cập nhật sản phẩm
router.put('/:id', (req, res) => {
  productModel.updateProduct(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi cập nhật sản phẩm' });
    if (result && result.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy sản phẩm để cập nhật' });
    res.json({ message: 'Cập nhật thành công' });
  });
});

// Xóa sản phẩm
router.delete('/:id', (req, res) => {
  productModel.deleteProduct(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa' });
    res.json({ message: 'Xóa sản phẩm thành công' });
  });
});

module.exports = router;