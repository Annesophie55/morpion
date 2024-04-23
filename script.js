const currentGame = ["","","","","","","","",""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//definir le joueur 

let currentPlayer = "X";

// On recupere la dic info pour afficher le joueur en cour 

const info = document.querySelector('.info');
info.textContent = `Au tour de ${currentPlayer}`;

// on recupere toutes nos cellules 

const cells = document.querySelectorAll('.cell');

// ajouter un ecouteur sur chaque case 
cells.forEach(cell => cell.addEventListener('click', handleClick));

// variable qui permet de bloquer le jeu si un gagnant ou si match null 
let lock = false;

function handleClick(e){
    // on recupere la case cliquee 
    let clickedBox = e.target;
    // on recupere l'index de la case cliquee 
    let boxIndex = clickedBox.getAttribute("data-index");
    
    //verifier si la case est vide, si il y a une valeur on stop le code 
    if(currentGame[boxIndex] !== "" || lock){
        return;
    }
    // stocker la valeur du joueur dans la tableau currentGame 
    currentGame[boxIndex] = currentPlayer;
    //afficher la valeur du joueur dans la case cliquee 
    clickedBox.textContent = currentPlayer;


    verification();
    
}

function verification(){
// parcourir le tableau des combinaisons gagnantes 
    for(let i = 0 ; i < winningCombinations.length; i++){

        // recuperer le combinaison gagnante en cour 
        let combinationToCheck = winningCombinations[i];


        //selectionner les valeurs de currentGame correspondant à la combinaison gagnante 
        let a = currentGame[combinationToCheck[0]];
        let b = currentGame[combinationToCheck[1]];
        let c = currentGame[combinationToCheck[2]];

        // verifier si les valeurs du tableau sont vides 
        if (a === "" || b ==="" || c === ""){
            continue;
        }
        // verifier si les valeurs sont les memes alors joueur gagnant
        else if (a === b && b === c){
            info.textContent = `Le joueur ${currentPlayer} a gagné ! Appuyer sur f5 pour recommencer `;
            // si il y a un gagnant on passe lock à true pour empecher de pouvoir continuer à jouer 
            lock =true;
            return;
        }
    }
    //match nul 
    if(!currentGame.includes('')){
        info.textContent="Match nul ! Appuyer sur f5 pour recommencer"
      
        return;
    }


    switchPlayer();
}

function switchPlayer(){
    //condition ternaire pour verifier si le joueur courant est X ou O 
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    info.textContent = `Au tour de ${currentPlayer}`;
 

}