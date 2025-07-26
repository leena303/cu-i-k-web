const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());

const multer = require('multer');
// Cấu hình Multer để giữ nguyên tên file gốc
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // đổi thành thư mục uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // giữ nguyên tên file gốc
  }
});
const upload = multer({ storage: storage });

// Cho phép truy cập file tĩnh trong thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/uploads', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Trả về đường dẫn ảnh cho FE
  res.json({ imageUrl: `/uploads/${req.file.originalname}` });
});

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Get all products
// app.get('/product', (req, res) => {
//   db.query('SELECT * FROM product', (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// API cho sản phẩm

// Tạo mới sản phẩm
app.post('/product', (req, res) => {
  const { name, price, category, trademark, status, quantity ,image, description } = req.body;

  // B1: Lấy ID lớn nhất hiện có
  const getMaxIdSql = 'SELECT MAX(id) AS maxId FROM product';
  db.query(getMaxIdSql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi lấy ID lớn nhất:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }

    const newId = (results[0].maxId || 0) + 1;

    // B2: Thêm sản phẩm với ID mới
    const insertSql = 'INSERT INTO product (id, name, price, category, trademark, status, quantity, image, description) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertSql, [newId, name, price, category, trademark, status, quantity, image, description], (err2, result) => {
      if (err2) {
        console.error('❌ Lỗi thêm sản phẩm:', err2);
        return res.status(500).json({ error: 'Lỗi khi thêm sản phẩm' });
      }

      res.json({ message: 'Thêm sản phẩm thành công', id: newId });
    });
  });
});

//sửa sản phẩm theo id
app.put('/product/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, category, trademark, status, quantity, image, description } = req.body;

  // Bước 1: Lấy dữ liệu cũ
  const selectSql = 'SELECT * FROM product WHERE id = ?';
  db.query(selectSql, [id], (err, results) => {
    if (err) {
      console.error('❌ MySQL error (select):', err);
      return res.status(500).json({ error: 'Lỗi server khi lấy dữ liệu sản phẩm' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm để cập nhật' });
    }

    // Dữ liệu cũ
    const oldProduct = results[0];

    // Bước 2: Chuẩn bị dữ liệu mới (nếu trường nào không có trong body thì giữ nguyên)
    const updatedName = name !== undefined ? name : oldProduct.name;
    const updatedPrice = price !== undefined ? price : oldProduct.price;
    const updatedCategory = category !== undefined ? category : oldProduct.category;
    const updatedTrademark = trademark !== undefined ? trademark : oldProduct.trademark;
    const updatedStatus = status !== undefined ? status : oldProduct.status;
    const updatedQuantity = quantity !== undefined ? quantity : oldProduct.quantity;
    const updatedImage = image !== undefined ? image : oldProduct.image;
    const updatedDescription = description !== undefined ? description : oldProduct.description;

    // Bước 3: Cập nhật dữ liệu
    const updateSql = `
      UPDATE product
      SET name = ?, price = ?, category = ?, trademark = ?, status = ?, quantity = ?, image = ?, description = ?
      WHERE id = ?
    `;
    const params = [updatedName, updatedPrice, updatedCategory, updatedTrademark, updatedStatus, updatedQuantity, updatedImage, updatedDescription,id];

    db.query(updateSql, params, (err2, result) => {
      if (err2) {
        console.error('❌ MySQL error (update):', err2);
        return res.status(500).json({ error: 'Lỗi server khi cập nhật sản phẩm' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm để cập nhật' });
      }
      res.json({ message: 'Cập nhật thành công' });
    });
  });
});

// xóa sản phẩm theo id
app.delete('/product/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM product WHERE id=?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Xóa thành công' });
  });
});

//lấy chi tiết sản phẩm theo id
app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM product WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }
    res.json(results[0]);
  });
});

app.get('/product', (req, res) => {
  const { name, category, trademark, page = 1, limit = 10 } = req.query;
  let sql = 'SELECT * FROM product WHERE 1=1';
  const params = [];

  if (name) {
    sql += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (trademark) {
    sql += ' AND trademark = ?';
    params.push(trademark);
  }

  // Sắp xếp theo id giảm dần (sản phẩm mới nhất lên đầu)
  sql += ' ORDER BY id ASC';

  // Phân trang 
  const offset = (parseInt(page) - 1) * parseInt(limit);
  sql += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});















// API cho danh mục

//lấy tất cả danh mục
// app.get('/category', (req, res) => {
//   db.query('SELECT * FROM category', (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   }
// );
// });

// Lấy chi tiết danh mục theo id
app.get('/category/:category_id', (req, res) => {
  const { category_id } = req.params;
  db.query('SELECT * FROM category WHERE category_id = ?', [category_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy danh mục' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy danh mục' });
    }
    res.json(results[0]);
  });
});

// Tạo mới danh mục (tự động tăng category_id)
app.post('/category', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Thiếu tên hoặc mô tả danh mục' });
  }

  // Lấy category_id lớn nhất hiện có
  const getMaxIdSql = 'SELECT MAX(category_id) AS maxId FROM category';
  db.query(getMaxIdSql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi lấy category_id lớn nhất:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }

    const newCategoryId = (results[0].maxId || 0) + 1;

    // Thêm danh mục với category_id mới
    const insertSql = 'INSERT INTO category (category_id, name, description) VALUES (?, ?, ?)';
    db.query(insertSql, [newCategoryId, name, description], (err2, result) => {
      if (err2) {
        console.error('❌ Lỗi khi thêm danh mục:', err2);
        return res.status(500).json({ error: 'Lỗi khi thêm danh mục' });
      }
      res.json({
        message: 'Thêm danh mục thành công',
        categoryId: newCategoryId
      });
    });
  });
});


// Sửa danh mục theo id
app.put('/category/:category_id', (req, res) => {
  const { category_id } = req.params;
  const { name, description } = req.body;

  // Lấy dữ liệu cũ trước
  db.query('SELECT * FROM category WHERE category_id = ?', [category_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy danh mục' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy danh mục' });
    }

    const current = results[0];
    const newName = name || current.name;
    const newDescription = description || current.description;

    db.query(
      'UPDATE category SET name = ?, description = ? WHERE category_id = ?',
      [newName, newDescription, category_id],
      (err2) => {
        if (err2) {
          console.error('❌ Lỗi khi cập nhật danh mục:', err2);
          return res.status(500).json({ error: 'Lỗi server khi cập nhật danh mục' });
        }
        res.json({ message: 'Cập nhật danh mục thành công' });
      }
    );
  });
});

// Xóa danh mục theo id
app.delete('/category/:category_id', (req, res) => {
  const { category_id } = req.params;
  db.query('DELETE FROM category WHERE category_id = ?', [category_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi xóa danh mục' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy danh mục để xóa' });
    }
    res.json({ message: 'Xóa danh mục thành công' });
  });
});

// Tìm kiếm, lọc, phân trang danh mục
app.get('/category', (req, res) => {
  const { name, description, page = 1, limit = 10 } = req.query;

  let sql = 'SELECT * FROM category WHERE 1=1';
  const params = [];

  if (name) {
    sql += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }

  if (description) {
    sql += ' AND description LIKE ?';
    params.push(`%${description}%`);
  }

  // Phân trang
  const offset = (parseInt(page) - 1) * parseInt(limit);
  sql += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json(results);
  });
});




//API cho tài khoản người dùng
// Đăng ký tài khoản khách hàng
//npm install bcrypt cài đặt thư viện 
const bcrypt = require('bcrypt'); // khai báo bcrypt để mã hóa mật khẩu

app.post('/users/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Thiếu thông tin đăng ký' });
  }

  // Mã hóa mật khẩu
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Chỉ cho phép đăng ký với role là customer
  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';

  db.query(sql, [username, email, hashedPassword, 'customer'], (err, result) => {
    if (err) {
      // Kiểm tra lỗi trùng username/email
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Tài khoản hoặc email đã tồn tại' });
      }

      console.error('❌ Lỗi đăng ký:', err);
      return res.status(500).json({ error: 'Lỗi server khi đăng ký' });
    }

    res.status(201).json({ message: 'Đăng ký thành công', userId: result.insertId });
  });
});


// Đăng nhập tài khoản khách hàng
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Thiếu thông tin đăng nhập' });
  }

  // Lấy thông tin người dùng theo email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('❌ Lỗi đăng nhập:', err);
      return res.status(500).json({ error: 'Lỗi server khi đăng nhập' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Tài khoản không tồn tại' });
    }

    const user = results[0];

    // So sánh mật khẩu
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mật khẩu không đúng' });
    }

    // Trả về thông tin người dùng (trừ mật khẩu)
    const { password: _, ...userInfo } = user;
    res.json(userInfo);
  });
});

// Cập nhật mật khẩu cho khách hàng
app.put('/users/update-password/:id', (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Thiếu mật khẩu cũ hoặc mới' });
  }

  // Lấy thông tin user theo id
  db.query('SELECT * FROM users WHERE id = ? AND role = ?', [id, 'customer'], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy thông tin người dùng' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy khách hàng' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mật khẩu cũ không đúng' });
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, id], (err2) => {
      if (err2) return res.status(500).json({ error: 'Lỗi server khi cập nhật mật khẩu' });
      res.json({ message: 'Cập nhật mật khẩu thành công' });
    });
  });
});

// Lấy tổng số tài khoản khách hàng
app.get('/users/count', (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM users WHERE role = ?', ['customer'], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy tổng số khách hàng' });
    res.json({ total: results[0].total });
  });
});

// Lấy danh sách khách hàng
app.get('/users', (req, res) => {
  db.query('SELECT id, username, email, role FROM users WHERE role = ?', ['customer'], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy danh sách khách hàng' });
    res.json(results);
  });
});




// API Admin
// Đăng ký tài khoản admin
app.post('/users/register-admin', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Thiếu thông tin đăng ký' });
  }

  // Mã hóa mật khẩu
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Đăng ký với role là admin
  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, hashedPassword, 'admin'], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Tài khoản hoặc email đã tồn tại' });
      }
      console.error('❌ Lỗi đăng ký admin:', err);
      return res.status(500).json({ error: 'Lỗi server khi đăng ký admin' });
    }
    res.status(201).json({ message: 'Đăng ký admin thành công', userId: result.insertId });
  });
});

// Cập nhật mật khẩu cho admin
app.put('/users/update-password-admin/:id', (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Thiếu mật khẩu cũ hoặc mới' });
  }

  // Lấy thông tin admin theo id
  db.query('SELECT * FROM users WHERE id = ? AND role = ?', [id, 'admin'], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy thông tin admin' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy admin' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mật khẩu cũ không đúng' });
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, id], (err2) => {
      if (err2) return res.status(500).json({ error: 'Lỗi server khi cập nhật mật khẩu' });
      res.json({ message: 'Cập nhật mật khẩu admin thành công' });
    });
  });
});

// đơn hàng
//lấy tất cả đơn hàng
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) return res.status
      .status(500)
      .json({ error: 'Lỗi server khi lấy danh sách đơn hàng' });
    res.json(results);
  });
});


// tạo đơn hàng
app.post('/orders', (req, res) => {
  const { user_id, items } = req.body;

  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  }

  // Tính tổng tiền
  let totalPrice = 0;
  items.forEach(item => {
    totalPrice += item.price * item.quantity;
  });

  // Bắt đầu thêm đơn hàng
  const insertOrderSql = 'INSERT INTO orders (user_id, total_price) VALUES (?, ?)';
  db.query(insertOrderSql, [user_id, totalPrice], (err, orderResult) => {
    if (err) {
      console.error('❌ Lỗi khi tạo đơn hàng:', err);
      return res.status(500).json({ error: 'Không thể tạo đơn hàng' });
    }

    const orderId = orderResult.insertId;

    // Chuẩn bị dữ liệu cho order_items
    const orderItemsData = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
    const insertItemsSql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';

    db.query(insertItemsSql, [orderItemsData], (err2) => {
      if (err2) {
        console.error('❌ Lỗi khi thêm chi tiết đơn hàng:', err2);
        return res.status(500).json({ error: 'Không thể thêm chi tiết đơn hàng' });
      }

      res.json({ message: 'Tạo đơn hàng thành công', order_id: orderId });
    });
  });
});

//xem danh sách đơn hàng của 1 người theo id
app.get('/orders/:userId', (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT o.id AS order_id, o.order_date, o.status, o.total_price,
           p.name AS product_name, oi.quantity, oi.price
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.order_date DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('❌ Lỗi lấy đơn hàng:', err);
      return res.status(500).json({ error: 'Không thể lấy đơn hàng' });
    }

    res.json(results);
  });
});

//Cập nhật trạng thái đơn hàng
app.put('/orders/:orderId/status', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const sql = 'UPDATE orders SET status = ? WHERE id = ?';
  db.query(sql, [status, orderId], (err) => {
    if (err) {
      console.error('❌ Lỗi cập nhật trạng thái:', err);
      return res.status(500).json({ error: 'Không thể cập nhật trạng thái' });
    }

    res.json({ message: 'Cập nhật trạng thái đơn hàng thành công' });
  });
});







app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});