const express = require('express');
const router = express.Router();

const {
  getServerlessFunction,
  updateServerlessFunction,
  createServerlessFunction,
  deleteServerlessFunction,
  getAllServerlessFunction,
} = require("./../controllers/serverless-function")

router.route("/")
  .get(getAllServerlessFunction)

router.route("/:functionId")
  .get(getServerlessFunction)
  .post(createServerlessFunction)
  .put(updateServerlessFunction)
  .delete(deleteServerlessFunction);

module.exports = router;