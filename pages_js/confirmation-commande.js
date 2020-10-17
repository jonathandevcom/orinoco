///// Je créer la variables montant total
let ajoutMontantTotal = document.querySelector('#montant-total');

///// Je récupère ma fonction montantTotal
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

///// J'inclus le numéro de commande dans le message
numeroCommande = localStorage.getItem(`reponseServeur`)
let ajoutNumeroCommande = document.querySelector('#reponse-serveur');
ajoutNumeroCommande.insertAdjacentHTML("afterbegin", ` ${numeroCommande}.`);

///// Le bouton efface le localStorage et renvoi sur la page d'acceuil
let end = document.querySelector('#button-end');
end.addEventListener('click', function () {
  localStorage.clear()
})