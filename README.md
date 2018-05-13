## Saint-Bescherelle

Projet réalisé par Paul Girardin dans le cadre d'un examen pour l'ECV Digital. 

Fait en React-Native avec Expo. 

Musique et bruitages créés par Paul Girardin. 

### Objectif

Jeu dont le but est de gagner un maximum de points en tappant sur les lettres qui apparaissent au fur et à mesure. 

### Les différentes lettres

À chaque lettre, il va également y avoir une lettre noire indiquant la position de la lettre venant après, mais pas sa couleur.

Les lettres jaunes ont une durée de 1 seconde et donnent 10 points lorsque touchées à temps. Le joueur perd 1 PV s'il ne la tape pas à temps. 

Les lettres bleues ont plusieurs PVs et une durée dépendant du nombre de PVs. Elles perdent 1 PV à chaque fois que le joueur tape dessus. Une fois tous les PVs descendus, elles donnent 10 points par PV. Le joueur perd 1 PV s'il ne la tape pas à temps. 

Les lettres rouges ont une durée de 1 seconde et ne donnent pas de points. Le joueur perd 1 PV s'il la tape. 

### Scores

Le joueur peut regarder quels sont les 10 meilleurs scores qu'il a effectué sur Saint-Bescherelle. 

Une fois la partie terminée (points de vie tombés à 0), si le score du joueur est au moins supérieur à son 10ème meilleur score, il est ajouté à la place correspondante et son ancien 10ème meilleur score est supprimé. 