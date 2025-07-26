const mysql = require('mysql2');
// require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Không dùng mật khẩu
  database: 'shopapp'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('✅ Đã kết nối MySQL thành công!');
});

module.exports = connection;
