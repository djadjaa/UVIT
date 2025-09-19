const groups = document.querySelectorAll('.kruzici');

// Iteriramo kroz svaki div (grupu dugmadi)
groups.forEach(group => {
    // Selektujemo dugmad unutar trenutnog diva
    const buttons = group.querySelectorAll('button');

    // Dodajemo događaj za klik svakom dugmetu unutar grupe
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Resetujemo sva dugmad unutar ove grupe
            buttons.forEach(btn => btn.style.backgroundColor = '#e9e9ed');

            // Postavljamo kliknuto dugme na crvenu boju
            this.style.backgroundColor = 'red';
        });
    });
});