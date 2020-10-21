///// Stockage de l'url 
const url = "http://localhost:3000/api/teddies";

///// Récupération des données du serveur et utilisation de celles-ci
function fetchData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            ///// Suppression du message d'erreur en cas de panne du serveur
            let problemeServeur = document.querySelector('#pas-acces-serveur');
            problemeServeur.remove();
            ///// Insertion du code html dynamiquement selon le nombre de produit créé sur le serveur
            const html = data.map(ours => {
                return `
                <article class="col-xs-12  col-sm-6 col-md-6 col-lg-4" >                 
                <div class="card mx-auto" style="width: 18rem;">
                <div  class="card-body">
                <p><img style=width:250px; src="${ours.imageUrl}"alt="${ours.name}"></p>
                <h2>${ours.name}</h2>
                <p>${ours.description}</p>
                <p>Tarif : ${ours.price / 100} €</p>
               <a href="pages_html/produit.html?id${ours._id}" <button  class="btn btn-primary">Voir le produit</button></a>
                </div>
                </div>
                </article>
                `;
            })
                .join("")
            document
                .querySelector('#app')
                .insertAdjacentHTML('afterbegin', html);
        })
        ///// Renvoi des éventuelles erreurs
        .catch(error => {
            console.log(error);
        });
}
///// Appel de la fonction
fetchData();