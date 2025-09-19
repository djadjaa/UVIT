const mongoose = require('mongoose')
/*
uˇcenik (imePrezime, niska), razred (razred, broj), odeljenje
(odeljenje, broj), ocene (ocene, niz objekata koji imaju svojstvo
predmet tipa string i svojstvo ocena tipa broj), slika (putan-
jaSlike, niska). Sve informacije su neophodne
*/
const mojaSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        imePrezime: {type:String, required:true},
        razred: {type:Number, required:true},
        odeljenje: {type:Number, required:true},
        ocene:[
            {predmet: {type:String, required:true},
            ocena: {type: Number, required:true, min:1, max:5}
        }],
        slika: {type:String, required:true} //baza nema u sebi url slike, uzmimo zdravo za gotovo kao da je ima zapravo
    }, {collection: 'skola'}
);

const userModel = mongoose.model('Skola', mojaSchema);

async function dohvatiOceneUcenika(imePrezime) {
	let student = await userModel.find({imePrezime:imePrezime}).exec();
    return student[0];
}


async function dodajNovuOcenu(imePrezime, predmet, ocena){
    let studenttemp = await userModel.find({imePrezime:imePrezime}).exec();
    let student = studenttemp[0];
    let flag = -1 //ukazuje nam na to dali smo pronasli ocenu iz trazenog predmeta
    for(let i=0; i<student.ocene.lenght; i++){
        //ako nam se poklapaju predmeti
        if(predmet == student.ocene[i].predmet){
            flag = 1;
            //menjamo ocenu
            student.ocene[i].ocena = ocena;
        }
    }
    //inace dodajemo novu ocenu na novi predmet
    if(flag == -1)
        student.ocene.push({predmet:predmet, ocena:ocena});
    /**
     * 
     * updateOne koristi filter { imePrezime: imePrezime } 
     * da nađe učenika, 
     * a $set da zameni polje ocene novim sadržajem.
     */
    await userModel.updateOne({imePrezime:imePrezime}, {$set:{ocene:student.ocene}}).exec();
}



module.exports = {
    dohvatiOceneUcenika,
    dodajNovuOcenu
};
