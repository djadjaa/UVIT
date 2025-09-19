const mongoose = require('mongoose');

const lekSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    nazivLeka: {type: String, required: true},
    proizvodjac: {type: String, required: true},
    simptomi: {type: [String], required: true},
    miligrami: {type: [String], required: true}
}, {collection: 'lekovi'});

const LekModel = mongoose.model('lekovi', lekSchema);

// 3. zadatak
async function dohvatiLekove(spisak_simptoma){
    let niz_lekova = [];
    //izvlacimo sve lekove iz baze i ubacujemo u nas niz lekova
    let sviLekovi = await LekModel.find({}).exec();
    for(let lek of sviLekovi){
        let dodajemo = false; //indikator
        for(let s of spisak_simptoma){
            //ako se simptomi poklapaju sa stikliranim simptomima ubacujemo lekove u nas niz da bismo ih prikazali na stranici
            //odnosno da li se s nalazi u simptomima iz baze
            if(lek.simptomi.includes(s)){
                dodajemo = true;
                break;
            }
        }
        if(dodajemo)
            niz_lekova.push(lek);
    }
    return niz_lekova;
}

module.exports = {
    dohvatiLekove
};
