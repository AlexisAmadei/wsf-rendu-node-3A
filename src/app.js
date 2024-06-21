const express = require('express');
const app = express();

const userRoutes = require('./userBackend/userRoutes');
const authRoutes = require('./authBackend/authRoutes');
const productRoutes = require('./productBackend/productRoutes');
const adminRoutes = require('./userBackend/adminRoutes');
const ordersRoutes = require('./ordersBackend/ordersRoutes');

app.use(express.json());
app.use('/usr', userRoutes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/admin', adminRoutes);
app.use('/orders', ordersRoutes);

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Le serveur Express écoute sur le port ${PORT}`);
});