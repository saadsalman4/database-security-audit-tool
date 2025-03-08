const express = require("express");
const { scan } = require("../controllers/audit.controller");
const router = express.Router();

router.post('/scan', scan)

module.exports = router;