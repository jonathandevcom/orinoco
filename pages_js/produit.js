///// Stockage l'url principale
const url = "http://localhost:3000/api/teddies";

///// Récupération de l'id du produit
let affichage = window.location.search;
affichage = affichage.replace("?id", "/");

///// Stockage de l'url individuel
const urlIndividuelle = url + affichage;

///// Récupération des données sur le serveur
function produitData() {
    fetch(urlIndividuelle)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {

            ///// Insertion de la photo du produit
            let image = document.querySelector("#img");
            image.insertAdjacentHTML("afterbegin", `<img class="img-fluid card-img-top" id="img" alt="photo ours" src=${data.imageUrl}> </img>`);

            ///// Insertion du nom du produit
            let nameOurs = document.querySelector("h3");
            nameOurs.innerHTML = data.name;

            /////Insertion du descriptif du produit
            let descriptifOurs = document.querySelector("#descritptif");
            descriptifOurs.innerHTML = data.description;

            /////Insertion du prix du produit
            let prixOurs = document.querySelector("#price");
            prixOurs.innerHTML = "Tarif : " + data.price / 100 + " €";

            /////Insertion du choix de la couleur du produit
            let couleurOurs = document.querySelector("#couleur");
            for (i = 0; i < data.colors.length; i++) {
                couleurOurs.insertAdjacentHTML("afterend", `<option id="choix-couleur">${data.colors[i]}</option>"`);
            }

            ///// Sélection du boutton pour ajouter l'article au panier
            let selection = document.querySelector('#myBtn');

            ///// Fonction pour ajouter les produits au pannier
            function ajouterAuPanier() {
                let nombre = document.querySelector("#in").value;

                ///// calcul le prix total par article
                let calculPrixTotal = data.price / 100 * nombre;

                ///// Création de la carte
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

                    ///// Les articles suivants sont envoyés au localStorage
                } else {
                    teddiesArray = [];
                    teddiesArray.push(carte);
                    localStorage.setItem('selectionArticle', JSON.stringify(teddiesArray));
                    alert('Votre article a été ajouté au panier');
                }
            }

            ///// Evénement au clic
            selection.addEventListener('click', ajouterAuPanier, true)
        })

        ///// Renvoi erreur s'il y a une erreur
        .catch(error => {
            console.log(error);
        });
}
///// Appel de la function    
produitData()
