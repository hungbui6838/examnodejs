const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect('mongodb://localhost/product_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Cài đặt EJS làm view engine
app.set('view engine', 'ejs');

// Sử dụng body-parser để xử lý dữ liệu POST
app.use(bodyParser.urlencoded({ extended: true }));

// Định nghĩa model sản phẩm
const Product = mongoose.model('Product', {
  ProductCode: String,
  ProductName: String,
  ProductDate: String,
  ProductOriginPrice: Number,
  Quantity: Number,
  ProductStoreCode: String
});

// Controllers: Định nghĩa logic xử lý các tương tác với sản phẩm
const productController = require('./controllers/productController')(Product);

// Routes: Định nghĩa các route cho ứng dụng
app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProduct);
app.post('/products', productController.addProduct);
app.delete('/products/:id', productController.deleteProduct);

// Views: Tạo trang chủ hiển thị danh sách sản phẩm
app.get('/', (req, res) => {
  res.render('index');
});

// Khởi động ứng dụng trên cổng 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
