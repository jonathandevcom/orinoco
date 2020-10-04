///// Je stock l'url principale
const url = "http://localhost:3000/api/teddies";

///// Je récupère l'id du produit
let affichage = window.location.search;
affichage = affichage.replace("?id", "/");

///// Je stock l'url individuel
const urlIndividuelle = url + affichage;

///// Je récupère les données sur le serveur
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
       image.insertAdjacentHTML("afterbegin",`<img class="img-responsive" id="img" alt="photo ours" src=${data.imageUrl}> </img>`);

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
        couleurOurs.insertAdjacentHTML("afterend", `<option id="choix-couleur">${data.colors[i]}</option>"`);
        } 

       
///// Je sélectionne le boutton pour l'ajouter au panier
let selection = document.querySelector('#myBtn') ;

    ///// Je créer ma funtion pour ajouter les produits au pannier
    function ajouterAuPanier () {
         let nombre = document.querySelector("#in").value;
        // let colors = document.querySelector("#choix-couleur").value;
       
        ///// J'utilise une boucle afin d'ajouter les produits dynamiquement
        let x = 0;
        while (x !== localStorage.length){
            x++ }
        
        let objJson = {
        nom : data.name,
        prix : data.price,
        quantite : nombre,
        //  couleur : colors,
        }

        let objLinea = JSON.stringify(objJson);
        localStorage.setItem(`selection${[x]}`, objLinea)
        ///// Je créer une alerte afin de prévenir l'utilisateur que son article a bien été ajouté au panier
        alert('Votre article a été ajouté au panier');
        }
    
        ///// J'ajoute l'événement au click
        selection.addEventListener ('click', ajouterAuPanier, true)
    })
    
    ///// Je renvoi d'éventuelles erreurs
    .catch(error => {
        console.log(error);
    });
}
///// J'appelle ma function    
produitData()
