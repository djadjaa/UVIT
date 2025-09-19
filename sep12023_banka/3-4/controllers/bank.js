const accountModel = require('../models/account');

module.exports.prikaziTabelu = async function (req, res, next) {
    try {    
      let account = await accountModel.getAccounts()    
      res.render('pocetna.ejs',{account:account})
    } catch (err) {
        next(err);
    }
};

module.exports.dodajNalog = async function (req, res, next) {
  try {        
    /*
    <input type="text" name="imeiprezime" placeholder="Ime i Prezime">
    <input type="text" name="stanje" placeholder="Stanje na racunu">
    */

    //kako je zahtev post umesto get, koristimo req body umesto req query
    let parsed = req.body.imeiprezime.split(' ');
    let stanje = req.body.stanje;
    await accountModel.createAccount(parsed[0],parsed[1],stanje);
    res.redirect('/bank'); //vracamo se na pocetnu
    //next();
    //res.render('pocetna.ejs',{account:account, list:null})
  } catch (err) {
      next(err);
  }
};

module.exports.prikaziBankomat = async function (req, res, next) {
  try {        
    let account = await accountModel.getAccounts();
    res.render('bankomat.ejs', {account:account})
  } catch (err) {
      next(err);
  }
};

module.exports.transakcija = async function (req, res, next) {
  try {        
    /*_id, kolicina, tip */
    //ponovo imamo post zahtev pa koristimo req.body
    await accountModel.executeTransaction(req.body.osoba, req.body.kolicina, req.body.opcija) //name nam je pod parametrima fje
    res.redirect('/bank'); //vracamo se na pocetnu sa azuriranim podacima
  } catch (err) {
      next(err);
  }
};