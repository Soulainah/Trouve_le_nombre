//Elements du DOM
const divVies= document.querySelector('.vies');
const message =  document.getElementById('message');
const formulaire =  document.getElementById('inputBox');
const input =  document.getElementById('number');
const essayerBtn =  document.getElementById('essayerBtn');
const rejouerBtn =  document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0] //ByTagName = selection des lements avec le nom mit dans ('')
//Modèle de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>'
//Changer le fond en fonction des réponses (mettre le ; apres la ')
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'images/chopper_win.gif'
const bgLoose = 'images/chopper_loose.gif'
//PLay 
const play = () => {
    //nombre aléatoire Math Floor = arrondi le random (nombre aleatoire) * 101 = le nombre de posibilté
    const randomNumber = Math.floor(Math.random() * 101);
    const totalVies = 6; // total de vie au départ
    let vies = totalVies; //variable qui changera au fil du jeu
    console.log(randomNumber) // pour voir le nombre choisi de la machine
    //Actualisation à chaque essai (la logique du jeu)
    //addEvenlistener, dés que le formulaire sera envoyer on va lui dire d'executer la fonction preventDefault() pour ne pas recharger la page 
    formulaire.addEventListener('submit', (e) =>{  
        e.preventDefault();
        const valeurInput = parseInt(input.value); //pareInt pour le passer en type chiffre au lieu de string ex : "3" et nous on veut 3

        if(valeurInput < 0 || valeurInput > 100)return; // ou = || si on met rien ou pas de chiffre il se passera rien
        //si le bon nombre est trouvé notre fond change 
        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !! Le nombre était bien ${randomNumber}`; // ` (alt gr + 7) pour mettre des variages au texte ex : ${randomNumer} affichera le nombre choisi par le random
            rejouerBtn.style.display = 'block'; //POur afficher le jeu
        }
        //si le nombre est +ou- notre fond change 
        // si  mon nombre et +ou- 3 le nombre choisi alors j'aurai le fond Brulant
        if(valeurInput !== randomNumber){
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput -3){
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est Brûlant !!! ";
            } else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput -6){
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est Chaud !!! ";
            } else if(randomNumber < valeurInput + 11 && randomNumber > valeurInput -11){
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiède !!! ";
            } else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est Froid !!! ";
            }
            vies--;
            verifyLoose(); //la fonction pour le nombre de vie
        }
        actualiseCoeurs(vies);

    })
    //si le nombre n'est pas trouvé notre fond change 
    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute('disabled' , ''); //desactivé le bouton 
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;  //` (alt gr + 7) pour mettre des variages au texte ex : ${randomNumer} affichera le nombre choisi par le random
            rejouerBtn.style.display = 'block'; //POur afficher le jeu (pour rejouer)
        }
    }
    //fonction pour le nombre de vie
    //NOs coeur plein
    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = '';
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
        }
    //Nos coeur vide
        for(let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
        }
    //AJouter dans le code HTML 
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies); //POur le debut du jeu
    //Bouton pour rejouer , pour relancer la page
    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none'; //enlever le message
        document.location.reload(true);
    })
} //fin de la fonction PLAY
play();