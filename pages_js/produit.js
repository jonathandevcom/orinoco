///// Je stock l'url principale
const url = "http://localhost:3000/api/teddies";

///// 
let affichage = window.location.search;
affichage = affichage.replace("?id", "/");

///// Je stock l'url individuel
const urlIndividuelle = url + affichage;
//console.log(urlIndividuelle);

function produitData () { fetch(urlIndividuelle)
    .then(response => {
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {

        /////J'insère la photo du produit
       let image = document.querySelector("#img");
       image.insertAdjacentHTML("afterbegin", `<img class="img-responsive" id="img" alt="photo ours" src=${data.imageUrl}> </img>`);

        /////J'insère le nom du produit
        let nameOurs = document.querySelector("h3");
        nameOurs.innerHTML = data.name;
        
        /////J'insère le descriptif du produit
        let descriptifOurs = document.querySelector("#descritptif");
        descriptifOurs.innerHTML = data.description;
        
        /////J'insère le prix du produit
        let prixOurs = document.querySelector("#price");
        prixOurs.innerHTML = "Tarif : " + data.price + " €";
     
        /////J'insère le choix de la couleur du produit selon le nombre de couleur possible
        let couleurOurs = document.querySelector("#couleur");
        for (i = 0; i < data.colors.length; i++) {
        couleurOurs.insertAdjacentHTML("afterend", `<option value='all'>${data.colors[i]}</option>"`);
        } 

        })
    
        ///// Je renvoi d'éventuelles erreurs
    .catch(error => {
        console.log(error);
    });
}
///// J'appelle ma function    
produitData()







/*
///// Je sélectionne le boutton pour l'ajouter au panier
let selection = document.querySelector('myBtn') ;

                          let objJson = {
                              name : teddy.name,
                              price : teddy.price
                            }
                          
                      function ajouterAuPanier () {
                          let objLinea = JSON.stringify(objJson);
                          localStorage.setItem("obj", objLinea)
                          alert('Votre article a été ajouté au panier');
                        }

                        // selection.addEventListener ('click', ajouterAuPanier, true)
                        addEventListener ('click', ajouterAuPanier, true)
    


  javascript récupérer valeur input        
                
function getValue() {
// Sélectionner l'élément input et récupérer sa valeur.
var input = document. getElementById("in" value;
// Afficher la valeur.
alert(input);
}

*/