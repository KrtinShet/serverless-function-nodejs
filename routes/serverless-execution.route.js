const express = require('express');
const router = express.Router();

const { executeFunction } = require('./../controllers/function-executor');

router.route("/:functionId").all(executeFunction);

module.exports = router;