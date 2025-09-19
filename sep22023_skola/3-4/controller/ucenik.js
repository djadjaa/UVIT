const mongoose = require('mongoose');
const ucenikModel = require('../model/ucenik');


async function prikaziPocetnu(req, res, next) {
    try {
        res.render('pocetna.ejs');
    } catch(err){
        next(err);
    }
}


async function prikaziOcene(req, res, next) {
    try {
        let student = await ucenikModel.dohvatiOceneUcenika(req.query.imePrezime);
        res.render('ocene.ejs',{student:student, alert:""});
    } catch(err){
        next(err);
    }
}


async function unesiOcenu(req, res, next){
	 try {
      let student = await ucenikModel.dohvatiOceneUcenika(req.body.imePrezime);
      let ocena = -1; //oznaka da ocena za taj predmet ne postoji
      for(let i=0; i<student.ocene.lenght; i++){
        //ako nadjemo ocenu za predmet koji je stigao iz forme
        if(student.ocene[i].predmet == req.body.predmet){
            ocena = student.ocene[i].ocena;
            break;
        }
      }
      await ucenikModel.dodajNovuOcenu(req.body.imePrezime,req.body.predmet, req.body.ocena);
      //povlacimo sve ocene iz baze ali posle dodavanja nove ocene

      let studentupdated = await ucenikModel.dohvatiOceneUcenika(req.body.imePrezime);

      let poruka="";

      if(ocena!=-1 && ocena>req.body.ocena)
            poruka = poruka + "popravila/o ocenu";
      if(ocena!=-1 && ocena<req.body.ocena)
            poruka = poruka + "pokvarila/o ocenu";

      res.render('ocene.ejs', {student:studentupdated, alert:poruka});
    } catch(err){
        next(err);
    }
}


module.exports = {
    prikaziPocetnu,
    prikaziOcene,
    unesiOcenu
};
