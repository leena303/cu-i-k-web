const db = require('../db');
const crypto = require('crypto');

exports.getAllOrders = (callback) => {
  const sql = `
    SELECT o.id AS order_id, o.order_code, o.order_date, o.total_price, o.status,
           u.username AS customer_name
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.order_date DESC
  `;
  db.query(sql, callback);
};

exports.countOrders = (callback) => {
  db.query('SELECT COUNT(*) AS total_orders FROM orders', callback);
};

exports.createOrder = (order, items, callback) => {
  const productIds = items.map(item => item.product_id);
  const getPriceSql = `SELECT id, price, quantity FROM product WHERE id IN (${productIds.map(() => '?').join(',')})`;
  db.query(getPriceSql, productIds, (err, products) => {
    if (err) return callback(err);
    const priceMap = {};
    const quantityMap = {};
    products.forEach(p => {
      priceMap[p.id] = p.price;
      quantityMap[p.id] = p.quantity;
    });
    for (const item of items) {
      if (item.quantity > (quantityMap[item.product_id] || 0)) {
        return callback(new Error(`Sản phẩm ID ${item.product_id} không đủ số lượng tồn kho`));
      }
    }
    let totalPrice = 0;
    const orderItemsData = items.map(item => {
      const price = priceMap[item.product_id] || 0;
      totalPrice += price * item.quantity;
      return [null, item.product_id, item.quantity, price];
    });
    const orderCode = 'ORD' + crypto.randomBytes(3).toString('hex').toUpperCase();
    const insertOrderSql = 'INSERT INTO orders (user_id, order_code, total_price, shipping_name, shipping_phone, shipping_address) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertOrderSql, [order.user_id, orderCode, totalPrice, order.shipping_name, order.shipping_phone, order.shipping_address], (err, orderResult) => {
      if (err) return callback(err);
      const orderId = orderResult.insertId;
      orderItemsData.forEach(item => { item[0] = orderId; });
      const insertItemsSql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
      db.query(insertItemsSql, [orderItemsData], (err2) => {
        if (err2) return callback(err2);
        const updateQuantitySql = `
          UPDATE product
          SET quantity = CASE id
            ${items.map(item => `WHEN ${item.product_id} THEN quantity - ${item.quantity}`).join(' ')}
            ELSE quantity
          END
          WHERE id IN (${productIds.join(',')})
        `;
        db.query(updateQuantitySql, (err3) => {
          if (err3) return callback(err3);
          callback(null, { order_id: orderId, order_code: orderCode, total_price: totalPrice });
        });
      });
    });
  });
};

exports.getOrderDetail = (orderId, callback) => {
  const sql = `
    SELECT 
      o.id AS order_id, o.order_code, o.order_date, o.status, o.total_price, o.shipping_name, o.shipping_phone, o.shipping_address,
      u.username AS customer_name, u.address, u.phone,
      p.name AS product_name, oi.quantity, oi.price
    FROM orders o
    JOIN users u ON o.user_id = u.id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
    WHERE o.id = ?
  `;
  db.query(sql, [orderId], callback);
};

exports.updateOrderStatus = (orderId, status, callback) => {
  db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId], callback);
};

exports.getOrdersByUser = (userId, callback) => {
  const sql = `
    SELECT
      o.id AS order_id, o.order_code, o.user_id, o.order_date AS createdAt, o.status, o.total_price,
      oi.product_id, oi.quantity, p.id AS product_id_fk, p.name AS product_name, p.price, p.image, p.description AS product_description
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.order_date DESC, o.id DESC
  `;
  db.query(sql, [userId], callback);
};

exports.cancelOrder = (orderId, callback) => {
  db.query('UPDATE orders SET status = ? WHERE id = ?', ['Đã hủy', orderId], callback);
};