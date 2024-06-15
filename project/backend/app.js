const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Маршрут для корневого URL
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Подключение маршрутов
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Подключение к базе данных
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

