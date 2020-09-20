const url = "http://localhost:3000/api/teddies";
//console.log(window.location.search);

let affichage = window.location.search;
affichage = affichage.replace("?id", "");
//console.log(affichage);



function produitData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            //console.log(data);
            const html_produit = data.map(ours => {
                // console.log(ours._id);
                // console.log(number_id);
                // console.log(ours.colors);
                // console.log(ours.colors.length);

        function colorsOurs() {
            let i = ours.colors
            for (let i = 0 ; i < ours.colors.length ; i ++){
              return  `<option value="all">${ours.colors}</option>`
              }};              
                                      
 
                if (affichage === ours._id) {
                    return `
                <div class="card-body mx-auto">
                <p class="mx-auto"><img style=width:500px;  src="${ours.imageUrl}"alt="${ours.name}"></p>
                <h3 class="card-title">${ours.name}</h3>
                <p class="card-text">${ours.description}</p>
                <p>Tarif : ${ours.price} €</p>
                
                <select class="custom-select">
                <option selected>Choisir la couleur</option>
                
                ${(colorsOurs)}
                </select>
                <a href="pages_html/panier.html" <button  class="btn btn-primary mt-3">Ajouter au panier</button></a>
                </div>
                `;
                }

            })
                .join("")

            // console.log(_produit);
            document
                .querySelector('#produit')
                .insertAdjacentHTML('afterbegin', html_produit);
        })
        .catch(error => {
            //console.log(error);
        });
}

produitData();

/*
get.produitData().then(data => {
    let option;
    Object.entries(data.colors).forEach(colors =>
       console.log(colors)

       // option = document.createElement("option");
        //option.text = colors[0];

     )});

*/