// global variables 
let monsterHealth
let playerHealth 
let result_section
let buttons_section
let log_section
let finalresult
let monsterHealthBar
let playerHealthBar
let specialAttackClicks
let specialAttackLimit
let healClicks
let healClicksLimit
let logs
let monsterHealthDecrement
let playerHealthDecrement
let playerHealthIncrement 


// -----------------------------------------------------------------------------------
// 
//                      Intialize the game or start new game 
// 
// -----------------------------------------------------------------------------------


// initial status of the game  
window.onload = () =>{
    playerHealth = 100
    monsterHealth = 100
    specialAttackClicks = 0
    specialAttackLimit = 3
    healClicks = 0
    healClicksLimit = 3

    // get dom elements
    result_section = document.getElementById('result-section')
    buttons_section = document.getElementById('buttons-section')
    log_section = document.getElementById('log-section')
    finalresult = document.getElementById("final-result")
    monsterHealthBar = document.getElementById("monester-heath-percentage-bar")
    playerHealthBar = document.getElementById("your-heath-percentage-bar")
    logs = document.getElementById("logs")

}

// when stact new game button is pressed this function will be excuted
function startNewGame(){
    
    //hide the result section and show the buttons and the battle log sections
    result_section.style.display = 'none'
    buttons_section.style.visibility = 'visible'
    log_section.style.visibility = 'visible'
    
    // empty the logs
    logs.innerHTML= ""

    // initialize moster health and player health
    monsterHealth = 100
    playerHealth = 100
    specialAttackClicks = 0
    specialAttackLimit = 3
    healClicks = 0
    healClicksLimit = 3


    // maximize the healt bar 
    monsterHealthBar.style.width = `${monsterHealth}%`
    playerHealthBar.style.width = `${playerHealth}%`



}


// -----------------------------------------------------------------------------------
//  
//                                Game Controllers
// 
// -----------------------------------------------------------------------------------

// normal attack parameter is boolean used to decide whether it is a normal attack or a special one 
function attack(normalAttack){

    // define variables for the damage %
    monsterHealthDecrement = 0
    playerHealthDecrement = 0

    // heal clicks should be always 0 after an attack to track it sequencial usage 
    healClicks = 0

    // if normal attack was done 
    if (normalAttack) {
        monsterHealthDecrement = Math.floor(Math.random()*10) 
        playerHealthDecrement = Math.floor(Math.random()*10) 
        
    }
    // if special attack was done, check if he is able to do a spacial attack 
    else if(specialAttackClicks < specialAttackLimit && playerHealth <= 0.8 * monsterHealth){
        monsterHealthDecrement = Math.floor(Math.random()*10) + 20
        playerHealthDecrement = Math.floor(Math.random()*10) + 1

        // to track how many times SA button is clicked
        specialAttackClicks++
    }

    //  else player cannot do a special attack because there isn't a 20% diffenece between player and monester health
    else if(!(playerHealth <= 0.8 * monsterHealth))
    {
        alert("You cannot do a special attack.")
        
    }

    //  else player cannot do a special attack because it was clicked 3 times
    else{
        alert("You cannot do a special attack anymore.")

    }

    // decrement the health of the player and monester 
    monsterHealth -= monsterHealthDecrement
    playerHealth -= playerHealthDecrement

    // decrement the width of the bar to show the variation of health
    monsterHealthBar.style.width= `${monsterHealth}%`
    playerHealthBar.style.width =`${playerHealth}%`

    // evaluate the result after each attack
    evaluation(monsterHealth,playerHealth)

    // print in the log after each attack
    log(actionsIsAttack = true) 
}

// this functions is excuted if the heal button is pressed
function heal(){

    // define a variable for health increment 
    playerHealthIncrement = 0

    // check if the player can heal
    if (healClicks < healClicksLimit && playerHealth < 100){
        
        //at least a pleayer heals himself for 1% 
        playerHealthIncrement = Math.floor(Math.random()*10) + 1

        // if by healing the health will jump over 100% then excutue this if 
        if (playerHealth + playerHealthIncrement >= 100) {
            
            //this is used for log function 
            playerHealthIncrement = 100 - playerHealth
            
        }

        // update the player health
        playerHealth += playerHealthIncrement

        // reflect the player health on the UI
        playerHealthBar.style.width =`${playerHealth}%`

        // to track how many times does a player heals sequentially 
        healClicks++
    }
    // the playyer cannot heal himself
    else{
        alert("You cannot heal your self")
    }

    // print in the log after each heal
    log(actionsIsAttack = false) 
}

// ----------------------------------------------------------------------------------
// 
//                            evaluating  Result 
// 
// ----------------------------------------------------------------------------------

// this function for evaluating the result after each attack/heal.
function evaluation(monsterHealth,playerHealth){

    // define variables to check if the healt is less than or equal to zero for player and monster 
    let playerHealthUnderOrEqualZero = playerHealth <= 0
    let monesterHealthUnderOrEqualZero = monsterHealth <= 0

    // monster wins 
    if (playerHealthUnderOrEqualZero && !monesterHealthUnderOrEqualZero) {
        playerHealthBar.style.width = `0`
        result(playerWins = false , draw = false)
    }
    // player wins  
    else if(!playerHealthUnderOrEqualZero && monesterHealthUnderOrEqualZero) {
        monsterHealthBar.style.width= `0`
        result(playerWins = true , draw = false)
    }
    else if (playerHealthUnderOrEqualZero && monesterHealthUnderOrEqualZero) {
        playerHealthBar.style.width = `0`
        monsterHealthBar.style.width= `0`
        result(playerWins = false , draw = true)
    }
}

// this function for the final result component 
function result( playerWins, draw ){
    
    // check the result 
    if(playerWins){
        finalresult.innerText = 'You win!'
    }else if(draw){
        finalresult.innerText = 'Its a draw'
    }else {
        finalresult.innerText = 'You Lose!'
    }
    
    // view the result component 
    result_section.style.visibility = 'visible'
    result_section.style.display = 'flex'
    buttons_section.style.visibility = 'hidden'
    log_section.style.visibility = 'hidden'
}

// ----------------------------------------------------------------------------------
// 
//                            battle log function
// 
// ----------------------------------------------------------------------------------

function log(actionsIsAttack){

    // if the action is an attack or special attack
    if (actionsIsAttack) {
        logs.innerHTML+=`
        <div id="each-log">
            <span id="monster-log">monster</span> attack and deals <span id="attacks-log">${monsterHealthDecrement}</span>
        </div>
        <br>
        <div id="each-log">
           <span id="player-log">player</span> attack and deals <span id="heals-log">${playerHealthDecrement}</span>
        </div>
        </br>
        `
    } 
    // if the action is heal
    else {
        logs.innerHTML+=`
        <div id="each-log">
            <span id="player-log">player</span> heals himself for <span id="heals-log">${playerHealthIncrement}</span>
        </div>
        </br>
        `
    }
}
