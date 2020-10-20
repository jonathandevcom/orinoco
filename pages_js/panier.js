///// Création des variables pour accéder aux différents éléments
let ajoutAuPanier = document.querySelector('#tableau');
let viderPanier = document.querySelector('#vider-panier');
let tableau = document.querySelector('#tableau');
let titre = document.querySelector('h1');
let ajoutMontantTotal = document.querySelector('#montant-total');
let validation = document.querySelector("#validation");

///// Création d'une fonction pour récuperer les éléments sur le localStorage
function getLocalStorage() {
  objLinea = localStorage.getItem(`selectionArticle`);
  objJson = JSON.parse(objLinea);
}

///// Création fonction pour afficher mon tableau et qui supprime le texte présent
function affichageTableau() {
  if (localStorage.length == 0) {
    ajoutAuPanier.insertAdjacentHTML('afterend', `<h2 id="titre-panier-vide"> Votre panier est vide </h2>`)
    tableau.remove();
    viderPanier.remove();
    titre.remove();
  } else {
    getLocalStorage()
    for (x = 0; x < objJson.length; x++) {

      ///// Insertion du HTML
      ajoutAuPanier.insertAdjacentHTML("afterbegin", `
          <tr>
            <td>${objJson[x].nom}</td>
            <td>${objJson[x].quantite}</td>
            <td>${objJson[x].prixTotal} €</td>
           </tr>
          `
      )
    }
  }
}
affichageTableau()

///// Evenement au clic pour vider le panier
viderPanier.addEventListener('click', function () {
  event.preventDefault()
  localStorage.clear()
  location.reload()
})

///// Création de la fonction pour calculer le montant total et l'ajouter sur la page
function montantTotal() {
  getLocalStorage();
  let calculPrixTotal = [];
  for (objJson of objJson) {
    let articlePrix = objJson.prixTotal;
    calculPrixTotal.push(articlePrix)
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let totalPrix = calculPrixTotal.reduce(reducer, 0);
  ajoutMontantTotal.insertAdjacentHTML("afterbegin", `<p id="total-panier"> Prix total : ${totalPrix} €</p>`)
}
montantTotal()

///// Création d'une fonction formulaireFalse si les données sont mal saisies
function formulaireFalse() {
  'use strict';
  window.addEventListener('load', function () {
    let form = document.getElementById('needs-validation');
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  }, false);
}
formulaireFalse()

///// Création d'une fonction formulaireTrue si les données sont bien saisies. Cette fonction renvoie la fonction post
function formulaireTrue() {
  'use strict';
  window.addEventListener('load', function () {
    let form = document.getElementById('needs-validation');
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
        post()
      }
      form.classList.add('was-validated');
    }, true);
  }, true);
}
formulaireTrue()

///// Création de la fonction post pour envoyer les données au serveur
function post() {

  //// Création de l'objet contact
  const contact = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  }

  ///// Création du tableau avec l'Id du produit
  let products = [objJson.id];

  ///// Création de l'objet : objet pour l'envoyer au serveur
  let objet = {
    contact,
    products,
  }
  fetch("http://localhost:3000/api/teddies/order", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(objet),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("reponseServeur", data.orderId);
      window.location.href = "confirmation-commande.html";
    })
}