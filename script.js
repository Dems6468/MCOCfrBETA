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
    // Natif Immu
    "Aucune": "debuff/none.png",
    "Saignement": "debuff/natif_immu_saignement.png",
    "Poison": "debuff/natif_immu_poison.png",
    "Dégénération": "debuff/natif_immu_degeneration.png",
    "DebuffsDOT": "debuff/natif_immu_eveil_debuffs_dot.png",
    "Buffs": "debuff/buffs.png",
    "Brise-Armure": "debuff/brise_armure.png",
    "Incinération": "debuff/incinération.png",
    "Décharge": "debuff/natif_immu_decharge.png",
    "Armure pulvérisée": "debuff/armure_pulverisee.png",
    "Vague de Froid": "debuff/vague_de_froid.png",
    "Engelure": "debuff/engelure.png",
    "Effets sans dégâts": "debuff/natif_immu_eveil_effets_sans_degats.png",
    "Drain de Pouvoir": "debuff/Drainpouvoir.png",
    "Brûle Pouvoir": "debuff/Brulepouvoir.png",
    "Bloque Pouvoir": "debuff/Bloquepouvoir.png",
    "Vol Pouvoir": "debuff/volpouvoir.png",

    // Synergie Immu
    "SSaignement": "debuff/synergie_immu_saignement.png",
    "SPoison": "debuff/synergie_immu_poison.png",
    "SDégénération": "debuff/synergie_immu_degeneration.png",
    "SDebuffsDOT": "debuff/synergie_immu_debuffs_dot.png",
    "SBuffs": "debuff/synergie_immu_buffs.png",
    "SBrise-Armure": "debuff/synergie_immu_brise_armure.png",
    "SIncinération": "debuff/synergie_immu_incinération.png",
    "SDécharge": "debuff/synergie_immu_decharge.png",
    "SArmure pulvérisée": "debuff/synergie_immu_armure_pulverisee.png",
    "SVague de Froid": "debuff/synergie_immu_vague_de_froid.png",
    "SEngelure": "debuff/synergie_immu_engelure.png",
    "SEffets sans dégâts": "debuff/synergie_immu_effets_sans_degats.png",
    "STout les Debuffs": "debuff/tout.png",
    "Ability Accuracy Modification":"debuff/none.png",
"Ability Accuracy Reduction":"debuff/none.png",
"Ability Power Rate":"debuff/none.png",
"Ability Power Rate Reduction":"debuff/none.png",
"Armor Break":"debuff/none.png",
"Armor Shatter":"debuff/none.png",
"Bleed":"debuff/none.png",
"Bleed Ability Accuracy Reduction":"debuff/none.png",
"Buffs":"debuff/none.png",
"Coldsnap":"debuff/none.png",
"Combat Power Rate Modification":"debuff/none.png",
"Combat Power Rate Reduction":"debuff/none.png",
"Concussion":"debuff/none.png",
"Death Immunity":"debuff/none.png",
"Debuffs":"debuff/none.png",
"Degeneration":"debuff/none.png",
"Disorient":"debuff/none.png",
"Enervate":"debuff/none.png",
"Evade Ability Accuracy Reduction":"debuff/none.png",
"Exhaustion":"debuff/none.png",
"Falter":"debuff/none.png",
"Fate Seal":"debuff/none.png",
"Fatigue":"debuff/none.png",
"Frostbite":"debuff/none.png",
"Heal Block":"debuff/none.png",
"Incinerate":"debuff/none.png",
"Infuriate":"debuff/none.png",
"Instant Damaging Effects":"debuff/none.png",
"Intimidate":"debuff/none.png",
"Neutralize":"debuff/none.png",
"Nova Flame":"debuff/none.png",
"Nullify":"debuff/none.png",
"Petrify":"debuff/none.png",
"Poison":"debuff/none.png",
"Power Burn":"debuff/none.png",
"Power Drain":"debuff/none.png",
"Power Lock":"debuff/none.png",
"Power Steal":"debuff/none.png",
"Power Sting":"debuff/none.png",
"Precision":"debuff/none.png",
"Regeneration Rate Modification":"debuff/none.png",
"Regeneration Rate Reduction":"debuff/none.png",
"Reversed Controls":"debuff/none.png",
"Rupture":"debuff/none.png",
"Shock":"debuff/none.png",
"Slow":"debuff/none.png",
"Special Lock":"debuff/none.png",
"Stagger":"debuff/none.png",
"Stun":"debuff/none.png",
"Taunt":"debuff/none.png",
"True Effect Ability Accuracy Reduction":"debuff/none.png",

};

// Fonction pour charger toutes les images de débuffs et des personnages
async function loadImages(images) {
    const promises = images.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    });
    
    try {
        await Promise.all(promises);  // Attend que toutes les images soient chargées
        return true;
    } catch (error) {
        console.error("Erreur lors du chargement des images", error);
        return false;
    }
}

// Mettre à jour la fonction displayDebuffs pour gérer le loader et les images
async function displayDebuffs(event) {
    const filter = event.target.value;
    const personnagesList = document.getElementById('personnages-list');
    const loader = document.getElementById('loader');
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
        // Liste des URLs d'images à charger (personnages + debuffs)
        const imageSources = [];

        // Ajouter les images des personnages
        filteredDebuffs.forEach(character => {
            imageSources.push(character.photo); // Image des personnages

            // Ajouter les images des immunités
            Object.keys(character.immunite).forEach(immunite => {
                imageSources.push(debuffIcons[immunite]); // Image des debuffs
            });
        });

        // Charger toutes les images avant d'afficher le contenu
        const allImagesLoaded = await loadImages(imageSources);

        if (allImagesLoaded) {
            // Une fois toutes les images chargées, on cache le loader et on affiche les personnages
            loader.style.display = 'none'; // Cacher le loader
            personnagesList.style.display = 'block'; // Afficher le contenu
        } else {
            // Si une image a échoué à se charger, on affiche un message
            loader.innerHTML = 'Une erreur est survenue lors du chargement des images.';
        }

        // Affichage des personnages
        filteredDebuffs.forEach(character => {
            const immuniteImages = Object.keys(character.immunite).map(immunite => {
                const description = character.immunite[immunite].join(', ');
                return `
                    <div class="debuff-icon-container" style="position: relative;">
                        <img src="${debuffIcons[immunite]}" alt="${immunite}" class="debuff-icon" onclick="toggleDebuffInfo(event, '${immunite}')"/>
                        <div class="debuff-tooltip" style="display:none; position: absolute; top: 25px; background-color: #333; color: white; padding: 5px; border-radius: 5px; font-size: 14px; text-align: center;">
                            <img src="${debuffIcons[immunite]}" alt="${immunite}" style="width: 30px; height: 30px; margin-bottom: 5px;"><br/>
                            <strong>${immunite}</strong><br/>
                            ${description ? description : ''}
                        </div>
                    </div>`;
            }).join('');

            const characterClass = character.classe.toLowerCase();

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



