const express = require('express');
const app = express();

const userRoutes = require('./userBackend/userRoutes');
const authRoutes = require('./authBackend/authRoutes');
const productRoutes = require('./productBackend/productRoutes');
// const contentRoutes = require('./contentBackend/contentRoutes');

app.use(express.json());
app.use('/usr', userRoutes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
// app.use('/content', contentRoutes);

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Le serveur Express écoute sur le port ${PORT}`);
});