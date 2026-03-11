let boxes = document.querySelectorAll("#box");
let reset = document.querySelector("#reset");
let win = document.querySelector("#win");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#newGame");
let undo = document.querySelector("#undo");
console.dir(reset);
let turnO = true;
let moves = [];
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

//TO PLAY TURN BY TURN
boxes.forEach((box , i) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        moves.push( {index: i , symbol: box.innerText} );
        console.log(moves);
        box.disabled = true;
        checkWinner();
        checkDraw();
    })
});

//TO CHECK WINNER
const checkWinner = () => {
    for (val of winPattern) {
        let val1 = boxes[val[0]].innerText;
        let val2 = boxes[val[1]].innerText;
        let val3 = boxes[val[2]].innerText;
        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 == val2 && val2== val3) {
                console.log("winner");
                disableBoxes();
                winMsgDisplay(val1);
            }
        }

        
    }
}

//TO CHECK DRAW MATCH
const checkDraw = () => {
    if(moves.length === 9)
    {
        msg.innerText = "Match is Draw";
        win.style.display = 'block';

    }
}

//TO DISABLE ALL BOXES AFTER A WIN
const disableBoxes = () => {
    for(box of boxes)
    {
        box.disabled = true;
    }
}

//TO RESET THE GAME OR NEW GAME
const resetGame = () => {
    for(box of boxes)
    {
        box.innerText = "";
        box.disabled = false;
    }
    win.style.display = 'none';
    moves = [];
}

//TO DISPLAY WINNER NAME
const winMsgDisplay = (winnerName) => {
    win.style.display = 'block';
    msg.innerText = `Winner is ${winnerName}`;
}

//FOR UNDO LAST MOVE
const undoMoves = () => {
    let size = moves.length;
    if(size===0)
    {
        return;
    }
    let lastMove = moves[size-1];
    let index = lastMove.index;
    boxes[index].innerText = "";
    boxes[index].disabled = false;
    if(lastMove.symbol === "O")
    {
        turnO = true;
    }
    else turnO = false;
    moves.pop();
}

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
undo.addEventListener("click",undoMoves);