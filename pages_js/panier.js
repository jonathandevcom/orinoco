///// Je créer des variables pour accéder aux différents éléments
let ajoutAuPanier = document.querySelector('#tableau');
let viderPanier = document.querySelector('#vider-panier');
let tableau = document.querySelector('#tableau');
let titre = document.querySelector('h1');
let ajoutMontantTotal = document.querySelector('#montant-total');
let validation = document.querySelector("#validation");

///// Je créer ma fonction pour récuper les éléments sur le localStorage
function getLocalStorage() {
  objLinea = localStorage.getItem(`selectionArticle`);
  objJson = JSON.parse(objLinea);
}

///// Je créer ma fonction pour afficher mon tableau et qui supprime le texte présent
function affichageTableau() {
  if (localStorage.length == 0) {
    ajoutAuPanier.insertAdjacentHTML('afterend', `<h2 id="titre-panier-vide"> Votre panier est vide </h2>`)
    tableau.remove();
    viderPanier.remove();
    titre.remove();
  } else {
    getLocalStorage()
    for (x = 0; x < objJson.length; x++) {

      ///// J'insère mon HTML
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

///// évenement au clic pour vider le panier
viderPanier.addEventListener('click', function () {
  event.preventDefault()
  localStorage.clear()
})

///// Je créer la fonction pour calculer le montant total et l'ajouter sur la page
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
/*
const contact = {
firstName :"nom",
lastName :"nom",
address :"nom",
city :"nom",
email :"nom@mail.com",
}
*/

const prenom = document.getElementById("firstname");
const nom = document.getElementById("lastname");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const mail = document.getElementById("email");

const contact = {
firstName : `${prenom.value}`,
lastName : nom.value,
address : adresse.value,
city : ville.value,
email : mail.value,
}


///// Je créer le tableau avec l'Id du produit
let products = [objJson.id];

///// Je créer mon objet pour l'envoyer au serveur
let objet = {
  contact,
  products,
}

///// Je créer la fonction formulaireFalse si les données sont mal saisies
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

///// Je créer la fonction formulaireTrue si les données sont bien saisies
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

///// Je créer la fonction post pour tout envoyer au serveur
function post() {
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
