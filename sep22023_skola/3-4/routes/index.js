const express = require("express");

const router = express.Router();

const controller = require('../controller/ucenik');

router.get('/', controller.prikaziPocetnu);
router.get('/ucenikoveOcene',controller.prikaziOcene);
router.post('/unos', controller.unesiOcenu);
module.exports = router;
