const db = require('../db');

exports.getProducts = (filters, callback) => {
  let sql = 'SELECT * FROM product WHERE 1=1';
  const params = [];
  if (filters.name) {
    sql += ' AND name LIKE ?';
    params.push(`%${filters.name}%`);
  }
  if (filters.category) {
    sql += ' AND category = ?';
    params.push(filters.category);
  }
  if (filters.trademark) {
    sql += ' AND trademark = ?';
    params.push(filters.trademark);
  }
  sql += ' ORDER BY id ASC LIMIT ? OFFSET ?';
  params.push(filters.limit, filters.offset);
  db.query(sql, params, callback);
};

exports.getProductById = (id, callback) => {
  db.query('SELECT * FROM product WHERE id = ?', [id], callback);
};

exports.createProduct = (product, callback) => {
  const getMaxIdSql = 'SELECT MAX(id) AS maxId FROM product';
  db.query(getMaxIdSql, (err, results) => {
    if (err) return callback(err);
    const newId = (results[0].maxId || 0) + 1;
    const insertSql = 'INSERT INTO product (id, name, price, category, trademark, status, quantity, image, images, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertSql, [
      newId, product.name, product.price, product.category, product.trademark, product.status,
      product.quantity, product.image, JSON.stringify(product.images), product.description
    ], (err2, result) => {
      if (err2) return callback(err2);
      callback(null, { id: newId });
    });
  });
};

exports.updateProduct = (id, product, callback) => {
  const selectSql = 'SELECT * FROM product WHERE id = ?';
  db.query(selectSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    const oldProduct = results[0];
    const updatedImages = product.images !== undefined ? JSON.stringify(product.images) : oldProduct.images;
    const updatedImage = product.image !== undefined ? product.image : oldProduct.image;
    const updateSql = `
      UPDATE product
      SET name = ?, price = ?, category = ?, trademark = ?, status = ?, quantity = ?, images = ?, image = ?, description = ?
      WHERE id = ?
    `;
    const params = [
      product.name !== undefined ? product.name : oldProduct.name,
      product.price !== undefined ? product.price : oldProduct.price,
      product.category !== undefined ? product.category : oldProduct.category,
      product.trademark !== undefined ? product.trademark : oldProduct.trademark,
      product.status !== undefined ? product.status : oldProduct.status,
      product.quantity !== undefined ? product.quantity : oldProduct.quantity,
      updatedImages,
      updatedImage,
      product.description !== undefined ? product.description : oldProduct.description,
      id
    ];
    db.query(updateSql, params, callback);
  });
};

exports.deleteProduct = (id, callback) => {
  db.query('DELETE FROM product WHERE id = ?', [id], callback);
};