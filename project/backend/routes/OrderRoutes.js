const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить все заказы
router.get('/', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) {
            console.error('Error retrieving orders from database:', err);
            res.status(500).send('Error retrieving orders from database');
        } else {
            res.json(results);
        }
    });
});

// Получить заказ по ID
router.get('/:id', (req, res) => {
    const orderId = req.params.id;
    db.query('SELECT * FROM orders WHERE id = ?', [orderId], (err, results) => {
        if (err) {
            console.error('Error retrieving order from database:', err);
            res.status(500).send('Error retrieving order from database');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Order not found');
            }
        }
    });
});

// Создать новый заказ
router.post('/', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    db.query('INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity], (err, results) => {
        if (err) {
            console.error('Error adding order to database:', err);
            res.status(500).send('Error adding order to database');
        } else {
            res.status(201).json({ id: results.insertId, user_id, product_id, quantity });
        }
    });
});

// Обновить заказ по ID
router.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const { user_id, product_id, quantity } = req.body;
    db.query('UPDATE orders SET user_id = ?, product_id = ?, quantity = ? WHERE id = ?', [user_id, product_id, quantity, orderId], (err, results) => {
        if (err) {
            console.error('Error updating order in database:', err);
            res.status(500).send('Error updating order in database');
        } else {
            res.sendStatus(204);
        }
    });
});

// Удалить заказ по ID
router.delete('/:id', (req, res) => {
    const orderId = req.params.id;
    db.query('DELETE FROM orders WHERE id = ?', [orderId], (err, results) => {
        if (err) {
            console.error('Error deleting order from database:', err);
            res.status(500).send('Error deleting order from database');
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;



