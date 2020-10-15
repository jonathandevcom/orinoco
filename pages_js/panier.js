let ajoutAuPanier = document.querySelector('#tableau');
let viderPanier = document.querySelector('#vider-panier');
let tableau = document.querySelector('#tableau');
let titre = document.querySelector('h1');
let ajoutMontantTotal = document.querySelector('#montant-total');
let prenom = document.querySelector("#firstname").value;
let nom = document.querySelector("#lastname").value;
let email = document.querySelector("#email").value;
let adresse = document.querySelector("#address").value;
let ville = document.querySelector("#ville").value;
let validation = document.querySelector("#validation");


function getLocalStorage() {
  objLinea = localStorage.getItem(`selectionArticle`);
  objJson = JSON.parse(objLinea);
}

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

// suppression d'un élément au panier
viderPanier.addEventListener('click', function () {
  event.preventDefault()
  localStorage.clear()
  })

function formulaire() {
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
 formulaire()


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

  
let contact = new Object();
contact.firstName = "prenom";
contact.lastName = "nom";
contact.address = "adresse";
contact.city = "ville";
contact.email = "email@jlo.com";

let products = [objJson.id];

let objet = {
  contact, 
  products,
}

//console.log(prenom);

function post () { fetch("http://localhost:3000/api/teddies/order", {
method: 'POST',
  headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(objet),
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
    
  })} 
    validation.addEventListener('click', function () {
    // event.preventDefault()
      post (objet)
   }) 


