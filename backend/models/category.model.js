const db = require('../db');

exports.getCategories = (filters, callback) => {
  let sql = 'SELECT * FROM category WHERE 1=1';
  const params = [];
  if (filters.name) {
    sql += ' AND name LIKE ?';
    params.push(`%${filters.name}%`);
  }
  if (filters.description) {
    sql += ' AND description LIKE ?';
    params.push(`%${filters.description}%`);
  }
  sql += ' LIMIT ? OFFSET ?';
  params.push(filters.limit, filters.offset);
  db.query(sql, params, callback);
};

exports.getCategoryById = (category_id, callback) => {
  db.query('SELECT * FROM category WHERE category_id = ?', [category_id], callback);
};

exports.createCategory = (category, callback) => {
  const getMaxIdSql = 'SELECT MAX(category_id) AS maxId FROM category';
  db.query(getMaxIdSql, (err, results) => {
    if (err) return callback(err);
    const newCategoryId = (results[0].maxId || 0) + 1;
    const insertSql = 'INSERT INTO category (category_id, name, description) VALUES (?, ?, ?)';
    db.query(insertSql, [newCategoryId, category.name, category.description], (err2, result) => {
      if (err2) return callback(err2);
      callback(null, { categoryId: newCategoryId });
    });
  });
};

exports.updateCategory = (category_id, category, callback) => {
  db.query('SELECT * FROM category WHERE category_id = ?', [category_id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    const current = results[0];
    const newName = category.name || current.name;
    const newDescription = category.description || current.description;
    db.query(
      'UPDATE category SET name = ?, description = ? WHERE category_id = ?',
      [newName, newDescription, category_id],
      callback
    );
  });
};

exports.deleteCategory = (category_id, callback) => {
  db.query('DELETE FROM category WHERE category_id = ?', [category_id], callback);
};