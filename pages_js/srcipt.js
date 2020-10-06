///// Je stock l'url 
const url = "http://localhost:3000/api/teddies";

///// Je récupère les données du serveur et je les utilise
function fetchData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            ///// J'insère le html dynamiquement et il évolue selon le nombre de produit disponible sur le serveur
            const html = data.map(ours => {
                return `
                <article class="col-xs-12  col-sm-6 col-md-6 col-lg-4" >                 
                <div class="card mx-auto" style="width: 18rem;">
                <div  class="card-body">
                <p><img style=width:250px; src="${ours.imageUrl}"alt="${ours.name}"></p>
                <h2>${ours.name}</h2>
                <p>${ours.description}</p>
                <p>Tarif : ${ours.price/100} €</p>
               <a href="pages_html/produit.html?id${ours._id}" <button  class="btn btn-primary">Voir le produit</button></a>
                </div>
                </div>
                </article>
                `;
            })
                .join("")

            // console.log(html);
            document
                .querySelector('#app')
                .insertAdjacentHTML('afterbegin', html);
        })
        ///// Je renvoi des éventuelles erreurs
        .catch(error => {
            console.log(error);
        });
}
///// J'appelle ma function
fetchData();