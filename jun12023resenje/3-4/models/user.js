//treci pod a
const mongoose = require('mongoose');

const shema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ime:{
        type: String,
        required: true
    },
    prezime: String,
    starost:{
        type: Number,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    }
},{collection: 'korisnici'})

const userModel = mongoose.model('Korisnik',shema)
//-------------------------------------------------------
//treci pod b
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
//-----------------------------------------