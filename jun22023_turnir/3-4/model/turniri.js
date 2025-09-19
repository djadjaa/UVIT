const mongoose = require('mongoose')

const mojaSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    igrac1:{type:String, required:true},
    igrac2:{type:String,required:true},
    poeni1:{type:String, required:true},
    poeni2:{type:String, required:true},
    vreme:{type:String},
    turnir:{type:String}
},{collection:'turniri'});

let userModel = mongoose.model('Turniri',mojaSchema);

async function dohvatiIgreZaTurnir(turnir) {
    return await userModel.find({turnir:turnir}).exec();
} 


async function dohvatiTurnire() {
    let lista = await userModel.find({},{turnir:true}).sort({turnir:1}).exec();
    let res = [];
    for(let el of lista){
        if(res.length == 0) //prvi turnir
            res.push(el.turnir);
        //ubacujemo turnire tako da se ne ponavljaju
        else if(res[res.length-1]!=el.turnir)
            res.push(el.turnir);
    }
    return res;
}

async function unesiTurnir(igrac1, igrac2, poeni1, poeni2, vreme, turnir) {
    let newTurnir = new userModel();
    newTurnir._id = new mongoose.Types.ObjectId();
    newTurnir.igrac1 = igrac1;
    newTurnir.igrac2 = igrac2;
    newTurnir.poeni1 = poeni1;
    newTurnir.poeni2 = poeni2;
    newTurnir.vreme = vreme;
    newTurnir.turnir = turnir;
    await newTurnir.save();
} 

module.exports = {
    dohvatiTurnire,
    dohvatiIgreZaTurnir,
    unesiTurnir
};