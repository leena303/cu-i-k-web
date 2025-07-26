const express = require('express');
const router = express.Router();
const orderModel = require('../models/order.model');

// Lấy danh sách đơn hàng
router.get('/', (req, res) => {
  orderModel.getAllOrders((err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng' });
    res.json(results);
  });
});

// Đếm đơn hàng
router.get('/count', (req, res) => {
  orderModel.countOrders((err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy tổng số đơn hàng' });
    res.json({ total_orders: results[0].total_orders });
  });
});

// Tạo đơn hàng mới
router.post('/', (req, res) => {
  const { user_id, items, shipping_name, shipping_phone, shipping_address } = req.body;
  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  }
  orderModel.createOrder({ user_id, shipping_name, shipping_phone, shipping_address }, items, (err, result) => {
    if (err) return res.status(500).json({ error: err.message || 'Không thể tạo đơn hàng' });
    res.json({ message: 'Tạo đơn hàng thành công', ...result });
  });
});

// Lấy chi tiết đơn hàng
router.get('/detail/:orderId', (req, res) => {
  orderModel.getOrderDetail(req.params.orderId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Không thể lấy chi tiết đơn hàng' });
    if (results.length === 0) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    const order = {
      order_id: results[0].order_id,
      order_code: results[0].order_code,
      order_date: results[0].order_date,
      status: results[0].status,
      total_price: results[0].total_price,
      shipping_name: results[0].shipping_name,
      shipping_phone: results[0].shipping_phone,
      shipping_address: results[0].shipping_address,
      customer_name: results[0].customer_name,
      address: results[0].address,
      phone: results[0].phone,
      items: results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        price: row.price
      }))
    };
    res.json(order);
  });
});

// Cập nhật trạng thái đơn hàng
router.put('/:orderId/status', (req, res) => {
  orderModel.updateOrderStatus(req.params.orderId, req.body.status, (err) => {
    if (err) return res.status(500).json({ error: 'Không thể cập nhật trạng thái đơn hàng' });
    res.json({ message: 'Cập nhật trạng thái đơn hàng thành công' });
  });
});

// Lấy đơn hàng theo user
router.get('/:userId', (req, res) => {
  orderModel.getOrdersByUser(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Không thể tải lịch sử đơn hàng.' });
    res.json(results);
  });
});

// Hủy đơn hàng
router.put('/cancel/:orderId', (req, res) => {
  orderModel.cancelOrder(req.params.orderId, (err) => {
    if (err) return res.status(500).json({ error: 'Không thể hủy đơn hàng' });
    res.json({ message: 'Đã hủy đơn hàng thành công' });
  });
});

module.exports = router;