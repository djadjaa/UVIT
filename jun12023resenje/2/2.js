const korisnici = [
    { ime: 'Rowan', prezime: "O'Connor" },
    { ime: 'Melody', prezime: 'Norton' },
    { ime: 'Minnie', prezime: 'Terry' },
    { ime: 'Damien', prezime: 'Roach' },
    { ime: 'Ida', prezime: 'Macdonald' },
    { ime: 'Zak', prezime: 'Carlson' },
    { ime: 'Nevaeh', prezime: 'Randolph' },
    { ime: 'Dewi', prezime: 'Sanford' },
    { ime: 'Michelle', prezime: 'Rhodes' },
    { ime: 'Oscar', prezime: 'Carter' },
];
const lista = document.getElementById('lista')
let broj=0
for(let korisnik of korisnici){
    const li = document.createElement('li')
    let ime = korisnik.ime
    let prezime = korisnik.prezime
    const spanIme = document.createElement('span')
    const spanPrezime = document.createElement('span')
    const razmak = document.createElement('span')
    spanIme.textContent = ime
    spanPrezime.textContent = prezime
    razmak.textContent = ' '
    if(broj%2==0){
        spanIme.style.color = 'red'
        spanPrezime.style.color = 'green'
        broj++
    }else{
        spanIme.style.color = 'green'
        spanPrezime.style.color = 'red'
        broj++
    }
    li.append(spanIme)
    li.append(razmak)
    li.append(spanPrezime)
    lista.append(li)
}