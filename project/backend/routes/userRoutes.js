const express = require('express');
const router = express.Router();
const db = require('../db');  // Путь к вашему файлу с настройками базы данных

// Маршрут для получения всех пользователей
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users from database:', err);
            res.status(500).json({ error: 'Error retrieving users from database' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
