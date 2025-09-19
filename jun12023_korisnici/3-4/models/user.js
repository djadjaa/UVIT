const mongoose = require('mongoose');

const korisniciSchema = new mongoose.Schema ({
    /*
    ime (niska, obavezno polje), prezime (niska, neobavezno
polje), starost (broj, obavezno polje), da li je admin (bulova
vrednost, podrazumevana vrednost false). 
    */
    _id: mongoose.Schema.Types.ObjectId,
   ime:{type:String,required:true},
   prezime:{type:String},
   starost:{type:Number, required:true},
   admin:{type:Boolean, default: false}},
   {collection: 'korisnici'}
)

const userModel = mongoose.model('Korisnik',korisniciSchema)

async function dohvatiKorisnike(){
    return await userModel.find().sort({starost:1}).exec()
}

async function izbrisi(id){
    await userModel.deleteOne({_id: id}).exec()
    return true
}
async function filtriraj(godine){
    return await userModel.find({starost:godine}).exec()
}

module.exports = {
    dohvatiKorisnike,
    izbrisi,
    filtriraj
}