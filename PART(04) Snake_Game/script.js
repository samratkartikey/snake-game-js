const board =document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const highScoreElement =document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");


//For knowing the number of blocks as per the screen size.
const blockHeight =50;
const blockWidth=50;

let highScore = localStorage.getItem("highScore") || 0; // becuase first thier is not any item like highScore in local storage so instead of showing undefined it will show the 0.
let score = 0;
let time = `00-00`;

highScoreElement.textContent=highScore;

const cols = Math.floor(board.clientWidth/blockWidth);
const rows = Math.floor(board.clientHeight/blockHeight);


const blocks = []; //creating 1 d array
let snake = [
{
    x:1,y:3
}]


let direction = "down";


//For Game Over variable
let intervalId=null;

//For game timer update
let timeIntervalID =null;


//For Food spawn randomly
let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};


//We can create 8 colums and 10 rows and for creating we use for loop.

for (let row=0;row<rows;row++)
{
    for(let col = 0;col<cols;col++)
    {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);

        // block.innerText=`${row}-${col}`;

        //for creating 1 d array.
        blocks[`${row}-${col}`]=block;
    }
}



function render(){

    let head = null;
    
    blocks[`${food.x}-${food.y}`].classList.add("food");
    
    if(direction ==="left"){
        head = {x:snake[0].x,y:snake[0].y-1}
    }
    else if(direction ==="right"){
        head = {x:snake[0].x,y:snake[0].y+1}
    }
    else if(direction ==="down"){
        head = {x:snake[0].x+1,y:snake[0].y}
    }
    else if(direction ==="up"){
        head = {x:snake[0].x-1,y:snake[0].y}
    }

    //Game Over Alert or wall collasion ligic
    if(head.x<0 || head.x>=rows ||head.y<0 ||head.y>=cols){

        // alert("Game Over");

        //This wil terminates the game by hitting the wall of board.
        clearInterval(intervalId);

        modal.style.display="flex";
        startGameModal.style.display="none";
        gameOverModal.style.display="flex";
        return;
    }
    //food consume logic
    if(head.x==food.x && head.y==food.y)
    {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food");

        // adding one more new head after eating

        snake.unshift(head);

        //Seting or updating score
        score += 10;
        scoreElement.textContent=score;
        if(score>highScore)
        {
            highScore=score;
            localStorage.setItem("highScore",highScore);

            //below is not the good way to get the item stored in localstorage.
            highScoreElement.textContent=highScore;
        }
    }

    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })


    snake.unshift(head);
    snake.pop();




    snake.forEach(segment =>{
      blocks[`${segment.x}-${segment.y}`].classList.add("fill");
 
    })
}


// intervalId=setInterval(()=>{
//     render();
// },300);



/*
ArrowUp
ArrowRight
ArrowDown
ArrowLeft
*/

//For starting the  game.
startButton.addEventListener("click",()=>{
    modal.style.display="none";
    intervalId = setInterval(()=>{
        render();
    },300)

    timeIntervalID =setInterval(()=>{
        let[min,sec]=time.split("-").map(Number);

        if(sec==59){
            min+=1;
            sec=0;
        }
        else
        {
            sec+=1;
        }
        time = `${min}-${sec}`;
        timeElement.textContent=time;
    },1000)
})


//If the game is finish then restarting the game modal.

restartButton.addEventListener("click",()=>{
    restartGame();
})

function restartGame(){

    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })

    score=0;
    time=`00-00`;
    scoreElement.textContent=score;
    timeElement.textContent=time;
    highScoreElement.textContent=highScore;


    modal.style.display="none";
    direction="down";
    snake =[{x:1,y:3}];
    food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
    intervalId = setInterval(()=>{
        render();
    },300)
}






addEventListener("keydown",(event)=>{
    if(event.key=="ArrowUp")
    {
        direction="up";
    }
    else if(event.key=="ArrowRight")
    {
        direction="right";
    }
    else if(event.key=="ArrowDown")
    {
        direction="down";
    }
    else if(event.key=="ArrowLeft")
    {
        direction="left";
    }
})





