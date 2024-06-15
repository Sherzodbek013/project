const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить все продукты
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error retrieving products from database:', err);
            res.status(500).send('Error retrieving products from database');
        } else {
            res.json(results);
        }
    });
});

// Получить продукт по ID
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error retrieving product from database:', err);
            res.status(500).send('Error retrieving product from database');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Product not found');
            }
        }
    });
});

// Создать новый продукт
router.post('/', (req, res) => {
    const { name, price } = req.body;
    db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, results) => {
        if (err) {
            console.error('Error adding product to database:', err);
            res.status(500).send('Error adding product to database');
        } else {
            res.status(201).json({ id: results.insertId, name, price });
        }
    });
});

// Обновить продукт по ID
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const { name, price } = req.body;
    db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, productId], (err, results) => {
        if (err) {
            console.error('Error updating product in database:', err);
            res.status(500).send('Error updating product in database');
        } else {
            res.sendStatus(204);
        }
    });
});

// Удалить продукт по ID
router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    db.query('DELETE FROM products WHERE id = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error deleting product from database:', err);
            res.status(500).send('Error deleting product from database');
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;






