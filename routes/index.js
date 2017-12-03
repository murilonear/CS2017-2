const express = require('express');
const router = express.Router();

// Requisições feitas no URL "/" irão renderizar o index
router.get('/', (req, res) => {
    const name = req.cookies.username;
    res.render('index');
});

module.exports = router;