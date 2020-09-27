///// Je stock l'url 
const url = "http://localhost:3000/api/teddies";

///// J'identifie l'ours en comparant l'id
let affichage = window.location.search;
affichage = affichage.replace("?id", "");
//console.log(affichage);

///// Je sélection le boutton pour ajouter au panier
let selection = document.querySelector('myBtn') ;

///// Je récupère les données du serveur et je les utilise
   function produitData () { fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
  
            ///// Je récupère les couleurs pour les afficher sur le menu déroulant
            const choixCouleur = data.map(color => {
                if (affichage === color._id && color.colors[3] !== undefined) {
                    // console.log(color.colors);
                    return `
            <option value="all">${color.colors[0]}</option>
            <option value="all">${color.colors[1]}</option>
            <option value="all">${color.colors[2]}</option>
            <option value="all">${color.colors[3]}</option>
          ` } else if (affichage === color._id && color.colors[2] !== undefined) {
                    return `
            <option value="all">${color.colors[0]}</option>
            <option value="all">${color.colors[1]}</option>
            <option value="all">${color.colors[2]}</option>
   
          ` } else if (affichage === color._id && color.colors[1] !== undefined) {
                    return `
            <option value="all">${color.colors[0]}</option>
             <option value="all">${color.colors[1]}</option>
                  ` } else if (affichage === color._id) {
                    return `
                <option value="all">${color.colors[0]}</option>
           `}})
        
            ///// J'affiche mon HTML dynamiquement en récupérant les données 
            const html_produit = data.map(ours => {
                if (affichage === ours._id) {
                    return `
                <div class="card-body mx-auto">
                <p class="mx-auto"><img style=width:500px; src=${ours.imageUrl} alt=${ours.name}></p>
                <h3 class="card-title">${ours.name}</h3>
                <p class="card-text">${ours.description}</p>
                <p>Tarif : ${ours.price} €</p>
                <select class="custom-select">
                <option selected>Choisir la couleur</option>
                ${choixCouleur}
                </select>
                <button type="button" id="myBtn" onclick=${displayDate} class="btn btn-primary mt-3" >Ajouter au panier</button>
                </div>   
                `;}    
               
                }).join("")
            
            document
                .querySelector('#produit')
               .insertAdjacentHTML('afterbegin', html_produit);
        })
        ///// Je renvoi d'éventuelles erreurs
        .catch(error => {
            console.log(error);
        });
    }
///// J'appelle ma function    
produitData();



/*
Je test et je deviens fouuuuuu

document.getElementById("myBtn").addEventListener("click", displayDate);

                
                function displayDate() {
                  alert('allo')};
                
                function displayDate() {
                    
                    alert('test moi');

let p1 = document.querySelector('#selectionButton');

p1.addEvenListener('click', function () {
     this.innerHTML = alert(`J'ai reussi`);
});
               
                 } 
                })
                const ctest = data.map(teddy => {
                  //  console.log(teddy.name);
               
                    if (affichage === teddy._id){

                        let objJson = {
                            name : teddy.name,
                            price : teddy.price
                        }

                    function ajouterAuPanier () {
                        let objLinea = JSON.stringify(objJson);
                        localStorage.setItem("obj",objLinea)
                         alert('Votre article a été ajouté au panier');
                      }

                       addEventListener ('click', ajouterAuPanier, true)}
*/