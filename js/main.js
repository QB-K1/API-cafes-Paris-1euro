'use strict';

$(function() // expression qui fait qu'on attend que tout le DOM soit chargé avant de lancer instructions contenus dedans
{
	// event listener pour click sur élément ayant id searchExe (bouton envoyer)
	$('#searchExe').on('click', onClickSearch);

});// fin de l'expression qui fait qu'on attend que tout le DOM soit chargé avant de lancer instructions contenus dedans
