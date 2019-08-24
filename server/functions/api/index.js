const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, res) => {
        return res.json({ 'api': 'working' });
    });
    return router;
}