const express = require('express');

const router = express.Router();
//treci pod b
const userListController = require('../controllers/userList');
router.get('/user/',userListController.obrisiKorisnika) //treci pod c
router.get('/',userListController.prikaziPocetnu)
//----------------------------------
router.post('/starost',userListController.filtrirajKorisnike)//cetvrti
module.exports = router;
