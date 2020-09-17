function fetchData() {
    fetch("http://localhost:3000/api/teddies")
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
           // console.log(data);
            const html = data.map(ours => {
                return `
                                  
                <div  class="card mx-auto" style="width: 18rem;">
                <div  class="card-body">
                <p><img style=width:250px; src="${ours.imageUrl}"alt="${ours.name}"></p>
                <h1>${ours.name}</h1>
                <p>${ours.description}</p>
                <p>Tarif : ${ours.price}</p>
                <a href="" class="btn btn-primary">Voir le produit</a>
                </div>
                </div>

                `;
            })
            .join("")
           // console.log(html);
            document
                .querySelector('#app')
                .insertAdjacentHTML('afterbegin', html);
        })
        .catch(error => {
            console.log(error);
        });
    }
fetchData();

/*

document.getElementById("myButton").onclick = function () {
    window.location = "pages_html/produit.html";
};

<div id="app"> </div>

*/