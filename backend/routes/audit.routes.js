const express = require("express");
const { sqlScan, mongoScan } = require("../controllers/audit.controller");
const router = express.Router();

router.post('/audit/sql', sqlScan)
router.post('/audit/mongodb', mongoScan)

module.exports = router;