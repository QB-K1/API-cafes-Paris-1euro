'use strict';

//fonction affichant résultats de la recherche
function search(deptSearchInput) {
	// syntaxe d'une requête complète ajax, pas comme $.get qui est une écriture simplifiée
	$.ajax({
		// URL donnée par la doc de l'API
		url: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=liste-des-cafes-a-un-euro&start=1&facet=arrondissement&refine.arrondissement='+deptSearchInput,
		type : 'GET', // équivalent à requête qui serait $.get
		dataType: 'json', // les API doivent renvoyer du JSON
		// ce qui est dans success seront les actions à effectuer si succès, cad une fois tout la réponse à la requête chargée (équivalent du callback)
		success : function(response){

			var list = $('<ul>');

			// boucle pour parcourir le tableau contenant les réponses
			 for(var i = 0; i < response.records.length; i++) {

			/*la fonction .append va rajouter nouvelle indentation, équivalent du document write, avec ce qui est entre parenthèse incrusté direct en HTML*/
				/*li va en faire une puce, équivalent du document write, créant balise ouvrante et fermante autour*/
					/*lui donne un data-id ayant pour valeur le nom du cafe dans la database*/
			list.append($('<li data-id="'+ response.records[i].recordid +'">').append($('<h2>').append(response.records[i].fields.nom_du_cafe)));

			list.append($('<li>').append($('<p>').append(response.records[i].fields.adresse)));

			list.append($('<li>').append($('<p>').append(response.records[i].fields.arrondissement)));

			list.append($('<li>').append($('<br/>')));
			};

			// écrase contenu de balise ayant ID resultsList par la liste après l'avoir vidé
			$('#resultsList').empty().append(list);

		// récupère en console log l'objet correspondant à la fiche du film renvoyé par l'API
		console.log(response);
		}
	});
}


// fonction pour lancer la fonction cherchant les titres au click. Passe en paramètres e qui représente tous les events possible sur la page, sert à ligne suivante
function onClickSearch(e) {
	// formule qui évite comportement par défaut quand charge event sur la page, à savoir ici recharger toute la page : va lancer event sans recharger la page, évite que contenu disparaisse car de base non visible tant que pas coché bouton
	e.preventDefault();
	// stocke dans variable valeur de l'input rentrée par l'utilisateur
	var searchInput = $('#searchButton').val();
	// alerte si rentre mauvais chiffre
	if ((searchInput > 75020) || (searchInput < 75001)) {
		window.alert('Seulement 20 arrondissements à Paris !');
	} 
	// lance fonction recherche en lui passant string rentrée par user
	search(searchInput);
}
