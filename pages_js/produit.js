///// Je stock l'url principale
const url = "http://localhost:3000/api/teddies";

///// Je récupère l'id du produit
let affichage = window.location.search;
affichage = affichage.replace("?id", "/");

///// Je stock l'url individuel
const urlIndividuelle = url + affichage;

///// Je récupère les données sur le serveur
function produitData() {
    fetch(urlIndividuelle)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {

            /////J'insère la photo du produit
            let image = document.querySelector("#img");
            image.insertAdjacentHTML("afterbegin", `<img class="img-fluid card-img-top" id="img" alt="photo ours" src=${data.imageUrl}> </img>`);

            /////J'insère le nom du produit
            let nameOurs = document.querySelector("h3");
            nameOurs.innerHTML = data.name;

            /////J'insère le descriptif du produit
            let descriptifOurs = document.querySelector("#descritptif");
            descriptifOurs.innerHTML = data.description;

            /////J'insère le prix du produit
            let prixOurs = document.querySelector("#price");
            prixOurs.innerHTML = "Tarif : " + data.price / 100 + " €";

            /////J'insère le choix de la couleur du produit selon le nombre de couleur possible
            let couleurOurs = document.querySelector("#couleur");
            for (i = 0; i < data.colors.length; i++) {
                couleurOurs.insertAdjacentHTML("afterend", `<option id="choix-couleur">${data.colors[i]}</option>"`);
            }

            ///// Je sélectionne le boutton pour l'ajouter au panier
            let selection = document.querySelector('#myBtn');

            ///// Je créer ma fonction pour ajouter les produits au pannier
            function ajouterAuPanier() {
                let nombre = document.querySelector("#in").value;

                // Je calcul le prix total par article
                let calculPrixTotal = data.price / 100 * nombre;

                //  let carte = []

                let carte = {
                    nom: data.name,
                    prix: data.price,
                    quantite: nombre,
                    prixTotal: calculPrixTotal,
                    id: data._id,
                }

                ///// Le 1er article est envoyé au localStorage
                const ajoutArticle = localStorage.getItem("selectionArticle")
                if (ajoutArticle) {
                    teddiesArray = JSON.parse(ajoutArticle);
                    teddiesArray.push(carte);
                    localStorage.setItem('selectionArticle', JSON.stringify(teddiesArray));
                    alert('Votre nouvel article a été ajouté au panier');
                
                ///// Les articles suivants sont envoyés
                } else {
                    teddiesArray = [];
                    teddiesArray.push(carte);
                    localStorage.setItem('selectionArticle', JSON.stringify(teddiesArray));
                    alert('Votre article a été ajouté au panier');
                }
            }

            ///// J'ajoute l'événement au click
            selection.addEventListener('click', ajouterAuPanier, true)
        })

        ///// Je renvoi d'éventuelles erreurs
        .catch(error => {
            console.log(error);
        });
}
///// J'appelle ma function    
produitData()
