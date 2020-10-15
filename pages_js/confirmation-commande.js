let montantTotal = document.querySelector('#montant-total');
let reponseServeur = document.querySelector('#reponse-serveur');

const getLocalStorage = function () {
    objLinea = localStorage.getItem(`selectionArticle`);
    objJson = JSON.parse(objLinea);
  }

montantTotal.insertAdjacentHTML("afterbegin", `${objJson.prixTotal}`);

reponseServeur.insertAdjacentHTML("afterbegin", `${objJson}`);