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
        let obrisano = true
        res.render('userList.ejs',{korisnici,obrisano})
    } catch (error) {
        next(error)
    }
}

async function filtrirajKorisnike(req,res,next){
    try {
        const data = req.body
        const korisnici = await userModel.filtriraj(data.godine)
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