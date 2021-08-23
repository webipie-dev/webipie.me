const express = require('express');
const router = express.Router();

healthCheck = async (req, res) => {

  res.status(200).send({message: "success"});
}

// health check
router.get('', healthCheck)

module.exports = router;
