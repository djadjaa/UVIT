const userModel = require('../models/user');
//treci pod b
async function prikaziPocetnu(req,res,next){
    try {
        const korisnici = await userModel.dohvatiKorisnike()
        let obrisano = false
        res.render('userList.ejs',{korisnici,obrisano})
    } catch (error) {
        next(error)
    }
}
//treci pod c
async function obrisiKorisnika(req,res,next){
    try {
        const data = req.query
        await userModel.izbrisi(data.id)
        const korisnici = await userModel.dohvatiKorisnike()
        obrisano = true
        res.render('userList.ejs',{korisnici,obrisano})
    } catch (error) {
        next(error)
    }
}

async function filtrirajKorisnike(req,res,next){
    try {
        const data = req.body
        console.log(data)
        const korisnici = await userModel.filtriraj(data.godine)
        console.log(korisnici)
        res.render('user.ejs',{korisnici})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    prikaziPocetnu,
    obrisiKorisnika,
    filtrirajKorisnike
}
//--------------------------------------
//-------------------------------