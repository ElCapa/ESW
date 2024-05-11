const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Novo Produto',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
  .then(result => {
    console.log('Produto criado com sucesso');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err); 
    res.status(500).send('Erro ao adicionar produto');
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Modificar Produto',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => {
      console.log(err); 
      res.status(500).send('Erro ao carregar detalhes do produto');
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then(result => {
      console.log('Produto atualizado com sucesso');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err); 
      res.status(500).send('Erro ao atualizar produto');
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Gerir Produtos',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err); 
      res.status(500).send('Erro ao carregar produtos');
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      return product.destroy();
    })
    .then(result => {
      console.log('Produto deletado com sucesso');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Erro ao deletar produto');
    });
};
