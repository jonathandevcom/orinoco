///// Je déclare des variables pour récupérer les données du local storage
let objLinea = localStorage.getItem("obj");
let objJson = JSON.parse(objLinea);

console.log(objJson.name)
console.log(objJson.price)

const ajout = document.querySelector('#enterNumber') ;
ajout.innerHTML = `bonjour`;

/* pour récuperer les données à test
    
for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);

*/