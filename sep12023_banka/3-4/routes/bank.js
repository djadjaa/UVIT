const express = require('express');

const router = express.Router();

const bankController = require('../controllers/bank');

/*Slanjem GET zahteva na stranicu
http://localhost:3000/bank/, serverski deo aplikacije treba
da prikaˇze poˇcetnu stranicu */

router.get('/', bankController.prikaziTabelu);

/*
Slanjem POST zahteva na stranicu
http://localhost:3000/bank/dodaj/, dodaje se novi nalog u
bazu. */

router.post('/dodaj', bankController.dodajNalog);

/*Slanjem GET zahteva na stranicu
http://localhost:3000/bank/bankomat */

router.get('/bankomat', bankController.prikaziBankomat);

/*Nakon ˇsto ko-
risnik klikne na dugme Submit, ˇsalje se POST zahtev na stranicu
http://localhost:3000/bank/transakcija/, nakon ˇcega se prikazuje
poˇcetna stranica uz promenu stanja u tabeli.
4 */

router.post('/transakcija', bankController.transakcija, bankController.prikaziTabelu);

module.exports = router;
