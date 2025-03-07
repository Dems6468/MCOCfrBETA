document.addEventListener("DOMContentLoaded", function() {
    // Charger le fichier JSON championsData
    fetch('championsData.json')
        .then(response => response.json())
        .then(data => {
            const personnageList = document.getElementById('personnage-list');

            // Fonction pour afficher les personnages
            function displayCharacters(list) {
                personnageList.innerHTML = ''; // Réinitialise la liste à chaque affichage
                list.forEach(perso => {
                    const persoElement = document.createElement('div');
                    persoElement.classList.add('personnage-card');
                    persoElement.innerHTML = `
                        <img src="${perso.photo}" alt="${perso.nom}" class="personnage-photo">
                        <h3><a href="characterchampion.html?nom=${encodeURIComponent(perso.nom)}">${perso.nom}</a></h3>
                        <p><strong>Classe :</strong> ${perso.classe}</p>
                    `;
                    personnageList.appendChild(persoElement);
                });
            }

            // Fonction pour trier les personnages par nom
            function sortCharacters(order) {
                const sorted = [...data];
                sorted.sort((a, b) => {
                    const nameA = a.nom.toUpperCase();
                    const nameB = b.nom.toUpperCase();

                    if (order === 'asc') {
                        return nameA < nameB ? -1 : 1;
                    } else {
                        return nameA > nameB ? -1 : 1;
                    }
                });
                return sorted;
            }

            // Fonction de filtrage des personnages par classe
            function filterByClass(classFilter) {
                if (!classFilter) return data;
                return data.filter(perso => perso.classe === classFilter);
            }

            // Gestion du tri et du filtre
            const sortSelect = document.getElementById('sort-names');
            const classSelect = document.getElementById('filter-class');

            // Fonction de mise à jour de la liste après un changement de tri ou de filtre
            function updateList() {
                const order = sortSelect.value;
                const classFilter = classSelect.value;

                const filtered = filterByClass(classFilter);
                const sorted = sortCharacters(order);
                const finalList = filtered.length ? filtered : sorted;

                displayCharacters(finalList);
            }

            // Événements pour le tri et le filtre
            sortSelect.addEventListener('change', updateList);
            classSelect.addEventListener('change', updateList);

            // Afficher les personnages par défaut (non triés, non filtrés)
            displayCharacters(data);
        })
        .catch(error => console.error('Erreur de chargement du JSON:', error));
});
