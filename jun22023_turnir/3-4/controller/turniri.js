const mongoose = require('mongoose');
const turniriModel = require('../model/turniri');


async function prikaziPocetnu(req, res, next) {
    try {
        let turniri = await turniriModel.dohvatiTurnire();
        res.render('pocetna.ejs',{turniri:turniri})
    } catch(err){
        next(err);
    }
}


async function prikaziTurnir(req, res, next) {
    try {
        //sadrži GET query parametre iz URL-a kada smo poslali zahtev da pretrazimo turnire
        let igre = await turniriModel.dohvatiIgreZaTurnir(req.query.turnir);
        res.render('turnir.ejs',{igre,turnir:req.query.turnir})
    } catch(err){
        next(err);
    }
}


async function unesiMec(req, res, next) {
    try {
        //primetimo da je ovo prvi1,2,3... pod name u inputu
       let poeni1 = req.query.prvi1 + '-' + req.query.prvi2 + '-' + req.query.prvi3;
       let poeni2 = req.query.drugi1 + '-' + req.query.drugi2 + '-' + req.query.drugi3;
       await turniriModel.unesiTurnir(req.query.prvi, req.query.drugi, poeni1, poeni2, req.query.sati + ':' + req.query.minuti, req.query.turnir)
       next();
    } catch(err){
        next(err);
    }
}


module.exports = {
    prikaziPocetnu,
    prikaziTurnir,
    unesiMec
};