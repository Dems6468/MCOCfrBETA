// Fonction pour récupérer les données de personnages depuis un fichier JSON
async function fetchDebuffsData() {
    try {
        const response = await fetch('championsData.json'); // Le fichier JSON est dans le même répertoire
        if (!response.ok) {
            throw new Error('Échec de la récupération des données');
        }
        const debuffsData = await response.json(); // Convertir la réponse en JSON
        return debuffsData;
    } catch (error) {
        console.error(error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
}
async function populateImmunityFilter() {
    const debuffsData = await fetchDebuffsData(); // Récupérer les données JSON
    const filterSelect = document.getElementById('immunite-filter'); // Sélection du filtre

    let uniqueImmunities = new Set(); // Utiliser un Set pour stocker les valeurs uniques

    // Parcours des personnages et ajout des immunités uniques
    debuffsData.forEach(character => {
        Object.keys(character.immunite).forEach(immunite => {
            uniqueImmunities.add(immunite); // Ajouter au Set (élimine les doublons)
        });
    });

    // Convertir en tableau et trier alphabétiquement
    uniqueImmunities = Array.from(uniqueImmunities).sort();

    // Ajouter les options au menu déroulant
    filterSelect.innerHTML = `<option value="all">Tous</option>`; // Option par défaut

    uniqueImmunities.forEach(immunite => {
        filterSelect.innerHTML += `<option value="${immunite}">${immunite}</option>`;
    });
}

// **Appel de la fonction après le chargement des données**
populateImmunityFilter();


const debuffIcons = {
   "Modification Précision Compétence":"debuff/AAM.png",
"Réduction Précision Compétence":"debuff/AAM.png",
"Réduction Taux de Pouvoir de Compétence":"debuff/Drainpouvoir.png",
"Brise-Armure":"debuff/brise_armure.png",
"Armure Pulverisée":"debuff/armure_pulverisee.png",
"Saignement":"debuff/Saignement.png",
"Buffs":"debuff/buffs.png",
"Vague de Froid":"debuff/vague_de_froid.png",
"Modification Taux de Pouvoir":"debuff/Drainpouvoir.png",
"Réduction Taux de Pouvoir":"debuff/Drainpouvoir.png",
"Traumatisme":"debuff/Traumatisme.png",
"Immunité Mort":"debuff/mort.png",
"Débuffs":"debuff/debuff.png",
"Dégénerescence":"debuff/degen.png",
"Désorienter":"debuff/desoriente.png",
"Amollir ":"debuff/Drainpouvoir.png",
"Réduction de Précision de Compétence d'évasion":"debuff/evade.png",
"Epuisement":"debuff/exhau.png",
"Défaillance":"debuff/defaillance.png",
"Destin Scellé":"debuff/des.png",
"Fatigue":"debuff/fatigue.png",
"Engelure":"debuff/engelure.png",
"Bloque Soin":"debuff/healb.png",
"Incinération":"debuff/incinération.png",
"Enrager":"debuff/provoc.png",
"Dégats Instantanés":"debuff/direct.png",
"Intimidation":"debuff/inti.png",
"Neutralisation":"debuff/neutra.png",
"Flammes Nova":"debuff/nova.png",
"Purge":"debuff/nullify.png",
"Pétrifier":"debuff/petrif.png",
"Poison":"debuff/poison.png",
"Brûle Pouvoir":"debuff/Brulepouvoir.png",
"Drain Pouvoir":"debuff/Drainpouvoir.png",
"Bloque Pouvoir":"debuff/Bloquepouvoir.png",
"Vol Pouvoir":"debuff/volpouvoir.png",
"Dards Puissants":"debuff/dards.png",
"Précision":"debuff/preci.png",
"Modification du Taux de Soin":"debuff/regenmodif.png",
"Reduction du Taux de Soin":"debuff/regenmodif.png",
"Contrôles Inversés":"debuff/ci.png",
"Rupture":"debuff/rupture.png",
"Décharges":"debuff/decharge.png",
"Ralentissement":"debuff/Slow.png",
"Bloque Super-Pouvoir":"debuff/bloquesp.png",
"Chancellement":"debuff/purge.png",
"Etourdissement":"debuff/stun.png",
"Provocation":"debuff/taunt.png",
"Réduction de Précision des Effets Directs":"debuff/rped.png",


};

// Fonction pour afficher les debuffs
async function displayDebuffs(event) {
    const filter = event.target.value;
    const personnagesList = document.getElementById('personnages-list'); // Assurez-vous que l'ID correspond
    personnagesList.innerHTML = ''; // Effacer les personnages précédemment affichés

    // Récupérer les données des personnages via fetch
    const debuffsData = await fetchDebuffsData();

    // Filtrer les données selon le choix de l'utilisateur
    const filteredDebuffs = filter === 'all' ? debuffsData : debuffsData.filter(p => {
        // Vérifier si le personnage possède l'immunité spécifiée dans le filtre
        return Object.keys(p.immunite).includes(filter);
    });

    // Si aucun personnage n'est trouvé avec ce filtre
    if (filteredDebuffs.length === 0) {
        personnagesList.innerHTML = '<p>Aucun personnage trouvé pour ce filtre.</p>';
    } else {
        // Affichage des personnages
        filteredDebuffs.forEach(character => {
            // Récupérer les images des immunités avec la description associée
            const immuniteImages = Object.keys(character.immunite).map(immunite => {
                const description = character.immunite[immunite].join(', '); // On récupère la description, si elle existe
                return `
                    <div class="debuff-icon-container" style="position: relative;">
                        <img src="${debuffIcons[immunite]}" alt="${immunite}" class="debuff-icon" onclick="toggleDebuffInfo(event, '${immunite}')"/>
                        <div class="debuff-tooltip" style="display:none; position: absolute; top: 25px; background-color: #333; color: white; padding: 5px; border-radius: 5px; font-size: 14px; text-align: center;">
    <img src="${debuffIcons[immunite]}" alt="${immunite}" style="width: 30px; height: 30px; margin-bottom: 5px;"><br/>
    <strong>${immunite}</strong><br/>
    ${description ? description : ''}
</div>

                    </div>`;
            }).join(''); // Joindre les images des immunités avec leur description

            const characterClass = character.classe.toLowerCase(); // Assure-toi que la classe est en minuscule

            // Ajouter l'élément HTML avec la classe correcte
            personnagesList.innerHTML += `
                <div class="personnage-card ${characterClass}">
                    <div class="photo-container">
                        <img src="${character.photo}" alt="${character.nom}">
                    </div>
                    <h3>${character.nom}</h3>
                    <p>${character.description}</p>
                    <div class="immunite-icons">${immuniteImages}</div>
                </div>
            `;
        });
    }
}

// Fonction pour afficher/masquer l'info du débuff (tooltip)
function toggleDebuffInfo(event, immunite) {
    const tooltip = event.target.nextElementSibling; // Trouve le tooltip juste après l'icône
    const allTooltips = document.querySelectorAll('.debuff-tooltip');
    
    // Ferme tous les tooltips ouverts sauf celui sur lequel on a cliqué
    allTooltips.forEach(tip => {
        if (tip !== tooltip) {
            tip.style.display = 'none';
        }
    });

    // Si le tooltip est déjà visible, le fermer
    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
}

// Ajouter un gestionnaire d'événements pour fermer les infos en dehors
document.addEventListener('click', function(event) {
    const tooltip = document.querySelector('.debuff-tooltip');
    if (tooltip && !tooltip.contains(event.target) && !event.target.classList.contains('debuff-icon')) {
        tooltip.style.display = 'none';
    }
});

// Initialiser l'affichage des debuffs (sans filtre)
document.getElementById('immunite-filter').addEventListener('change', displayDebuffs);

// Appel initial sans filtre
displayDebuffs({ target: { value: 'all' } });
// Ferme le tooltip si on clique ailleurs
document.addEventListener('click', function (event) {
    const allTooltips = document.querySelectorAll('.debuff-tooltip');

    allTooltips.forEach(tooltip => {
        // Vérifie si le clic n'est PAS sur une icône de débuff ni sur un tooltip déjà ouvert
        if (!event.target.classList.contains('debuff-icon') && !tooltip.contains(event.target)) {
            tooltip.style.display = 'none';
        }
    });
});
