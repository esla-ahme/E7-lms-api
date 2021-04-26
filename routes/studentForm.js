const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.json());

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/student.html'));
})
module.exports = router;