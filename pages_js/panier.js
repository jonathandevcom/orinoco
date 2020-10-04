///// Je sélectionne l'id correspondant à mon tableau
let ajoutAuPanier = document.querySelector('#tableau');

///// Je créer la variable x (-1 afin que tous les produits s'affichent) 
let x = -1;

if (localStorage.length == 0){
  alert('Votre pannier est vide');
} else {

 while (x < localStorage.length) {
 x++
    ///// Je déclare des variables pour récupérer les données du local storage
    let objLinea = localStorage.getItem(`selection${x}`);
    let objJson = JSON.parse(objLinea);
 
    ///// Je déclare une variable pour calculer le prix (prix de l'ours x le nombre commandé)
    let prixTotalParArticle = objJson.prix * objJson.quantite;

 
    ///// J'insère mon HTML
    ajoutAuPanier.insertAdjacentHTML("afterbegin", `
          <tr>
            <td>${objJson.nom}</td>
            <td>${objJson.quantite}</td>
            <td>${prixTotalParArticle} €</td>
          </tr>          
    `)}}




/*
let button = document.querySelector('#button') ;

function validation (e) {
  
//  let form = document.querySelector('#form');
  let name = document.querySelector('#name');
  let name_manquant = document.querySelector('#nom_manquant');
//let prenom = document.querySelector('#prenom');
//let adresse = document.querySelector('#adresse');
//let email = document.querySelector('#email');
 
//let errorElement = document.querySelector('#error');
if (nom.validity.valueMissing){
  e.preventDefault();
  nom_manquant.textContent = 'Nom manquant';
 // name_manquant.style.color = 'red';

}

}
button.addEventListener ('click', validation);
 
*/