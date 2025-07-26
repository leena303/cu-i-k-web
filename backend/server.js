const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API đang chạy');
});

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});