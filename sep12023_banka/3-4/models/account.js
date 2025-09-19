const mongoose = require('mongoose');

/*
ime (niska, obavezno polje), prezime (niska, neobavezno
polje), stanje (broj, obavezno polje, podrazumevana vrednost
nula)
*/

const mojaSchema = mongoose.Schema ({
    _id : mongoose.Schema.Types.ObjectId,
    ime: {type:String, required:true},
    prezime: {type:String},
    stanje: {type:Number, required:true, default: 0},
},{collection: 'accounts'});

let userModel = mongoose.model('Account', mojaSchema);

/*Korisnici treba
da budu sortirani leksikografski po imenu.
 */
module.exports.getAccounts = async function () {
    let acc = await userModel.find().sort({ime:1}).exec();
    return acc;
};

module.exports.createAccount = async function (ime, prezime, stanje) {
    let newAcc = new userModel();
    newAcc._id = new mongoose.Types.ObjectId();
    newAcc.ime = ime;
    newAcc.prezime = prezime;
    newAcc.stanje = stanje;
    await newAcc.save();
};

module.exports.executeTransaction = async function (_id, kolicina, tip) {
    let korisnik = _id.split(' ');
    let iznos = kolicina;
    if(tip = "podigni")
        iznos*=-1;
    //$inc je MongoDB operator koji povećava (ili smanjuje) brojčano polje za zadatu vrednost
    /*
    upsert: false znači: ne kreiraj novi dokument ako ne pronađeš nijedan koji odgovara filteru.
    Ako bi stavio upsert: true, a filter ne pronađe ništa, MongoDB bi kreirao novi dokument sa tim poljem.
    */
    await userModel.updateOne({ime:korisnik[0], prezime:korisnik[1]}, {$inc:{stanje:iznos}}, {upsert:false});
};