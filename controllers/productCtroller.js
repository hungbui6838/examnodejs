module.exports = (Product) => {
    const getProducts = (req, res) => {
      // Lấy tất cả sản phẩm từ cơ sở dữ liệu
      Product.find({}, (err, products) => {
        if (err) res.send(err);
        res.json(products);
      });
    };
  
    const getProduct = (req, res) => {
      // Lấy một sản phẩm theo ID
      Product.findById(req.params.id, (err, product) => {
        if (err) res.send(err);
        res.json(product);
      });
    };
  
    const addProduct = (req, res) => {
      // Tạo một sản phẩm mới từ dữ liệu gửi lên
      const newProduct = new Product(req.body);
      newProduct.save((err, product) => {
        if (err) res.send(err);
        res.json(product);
      });
    };
  
    const deleteProduct = (req, res) => {
      // Xóa một sản phẩm theo ID
      Product.deleteOne({ _id: req.params.id }, (err) => {
        if (err) res.send(err);
        res.json({ message: 'Product successfully deleted' });
      });
    };
  
    return {
      getProducts,
      getProduct,
      addProduct,
      deleteProduct,
    };
  };
  