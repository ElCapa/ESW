const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const conexaoBD = require('./util/dataBase');

const app = express();

const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

conexaoBD.authenticate()
  .then(() => {
    console.log('Conexao a BD ok!');
    conexaoBD.sync()
      .then(() => {
        console.log('Modelos sincronizados com sucesso!');
        return User.sync();
      })
      .then(() => {
        console.log('Modelo de usuário sincronizado com sucesso!');
        app.listen(8000);
      })
      .catch(erro => {
        console.log(erro);
      });

  })
  .catch((erro) => {
    console.log(erro.message);
    process.exit(1);
  });

