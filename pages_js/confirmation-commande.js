///// Création de la variables pour accéder au montant total
let ajoutMontantTotal = document.querySelector('#montant-total');

///// fonction montantTotal que j'ai récupéré sur la page panier.js
function montantTotal() {
  recoverLocalStorage = localStorage.getItem(`selectionArticle`);
  dataLocalStorage = JSON.parse(recoverLocalStorage);
  let calculPrixTotal = [];
  for (dataLocalStorage of dataLocalStorage) {
    let articlePrix = dataLocalStorage.prixTotal;
    calculPrixTotal.push(articlePrix)
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let totalPrix = calculPrixTotal.reduce(reducer, 0);
  ajoutMontantTotal.insertAdjacentHTML("afterbegin", `${totalPrix}`)
}
montantTotal()

///// Insersion du numéro de la commande dans le message
numeroCommande = localStorage.getItem(`reponseServeur`)
let ajoutNumeroCommande = document.querySelector('#reponse-serveur');
ajoutNumeroCommande.insertAdjacentHTML("afterbegin", ` ${numeroCommande}.`);

///// Le bouton efface le localStorage et renvoi sur la page d'accueil
let end = document.querySelector('#button-end');
end.addEventListener('click', function () {
  localStorage.clear()
})