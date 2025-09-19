// 3. zadatak
async function prikaziPocetnuStranicu(req, res, next) {
    res.render('pocetna.ejs');
}

const lekModel = require('../models/lekovi.js');
// 3. zadatak 

async function prikaziLekove(req, res, next) {
    let simptomi = [];
    //simptome iz baze ubacujemo u nas niz sa simptomima kako bismo ih prikazali na stranici
    if(req.query.upalagrla === 'on'){ //da li postoji
        simptomi.push('upala grla');
    }
    if(req.query.cnos === 'on'){
        simptomi.push('curenje nosa');
    }
    if(req.query.temp === 'on'){
        simptomi.push('temperatura');
    }
    if(req.query.glavobolja === 'on'){
        simptomi.push('glavobolja');
    }
    if(req.query.pritisak === 'on'){
        simptomi.push('pritisak');
    }
    let trazeniLekovi = await lekModel.dohvatiLekove(simptomi);
    res.render('lekovi.ejs',{lekovi: trazeniLekovi});
}


// 4. zadatak
async function prikaziRecept(req, res, next) {
    let trazeniLekovi = await lekModel.dohvatiLekove(req.query.simptomi);
    res.render('recept.ejs',{lekovi: trazeniLekovi});
}

module.exports = {
    prikaziPocetnuStranicu,
    prikaziLekove,
    prikaziRecept	
};
