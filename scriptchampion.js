document.addEventListener("DOMContentLoaded", function() {
    // Charger le fichier JSON championsData
    fetch('championsData.json')
        .then(response => response.json())
        .then(data => {
            const personnageList = document.getElementById('personnage-list');
            data.forEach(perso => {
                const persoElement = document.createElement('div');
                persoElement.classList.add('personnage-card');
                persoElement.innerHTML = `
                    <h3><a href="character.html?nom=${encodeURIComponent(perso.nom)}">${perso.nom}</a></h3>
                    <p><strong>Classe :</strong> ${perso.classe}</p>
                `;
                personnageList.appendChild(persoElement);
            });
        })
        .catch(error => console.error('Erreur de chargement du JSON:', error));
});
