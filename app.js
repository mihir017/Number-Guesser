// UI variable
const min_val = document.querySelector(".min_val");
const max_val = document.querySelector(".max_val");
const submit_guess = document.querySelector("#btn");
const errorMSG = document.querySelector(".err_msg");
const guess_input = document.querySelector("#guess_number");
const game = document.querySelector(".game_ui");

//Local variable
let min = 1,
    max = 10,
    winning_number = createWinning_num(min,max),
    guess_time = 3;

min_val.textContent = min;
max_val.textContent = max;

//create winning number
function createWinning_num(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Pay again function
game.addEventListener("mousedown",function(e){
    if(e.target.className == "play-again"){
        window.location.reload();
    }
})

submit_guess.addEventListener('click',matchNumber);

function matchNumber(e){
    let guess_num = parseInt(guess_input.value);
    
    if(isNaN(guess_num) || guess_num < min || guess_num > max){
        message = `Please Guess the Number between ${min} and ${max} .`;
        showMessage(message,"red");
    } else if (guess_num === winning_number){
        message = `${winning_number} is correct! YOU WIN...`;
        GameOver(true,message);
    } else {
        guess_time -= 1;
        if(guess_time === 0){
            message = `You LOSE. GAME OVER! correct number is ${winning_number}. Try Again...`
            GameOver(false,message);
        }
        else{
            message = `${guess_num} is not correct! Your remaining trial is ${guess_time}`;
            guess_input.value = ''
            guess_input.style.borderColor = "red";
            showMessage(message,"red");
        }
    }
    console.log(guess_num);
    e.preventDefault();
}

function GameOver(won,msg){
    let color;
    (won === true) ? color = "green" : color = "red";
    guess_input.style.borderColor = color;
    guess_input.disabled = true;
    showMessage(msg,color);

    //create paly again button
    submit_guess.value = "PLAY AGAIN";
    submit_guess.className = "play-again";
}

function showMessage(msg,color){
    errorMSG.textContent = msg;
    errorMSG.style.color = color;
}