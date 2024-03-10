let usc = 0;
let csc = 0;
const choice = document.querySelectorAll('.ch');
const para = document.getElementById('msg');
const usPara = document.getElementById('usc');
const compPara = document.getElementById('csc');
const compMove = () => {
    const moves = ['r', 'p', 's'];
    let ind = Math.floor(Math.random() * 3);
    return moves[ind];
}
const showWinner = (user, cm, win) => {
    const map = {
        r: "Rock",
        p: "Paper",
        s: "Scissor",
    };
    if (win == 0) {
        para.innerHTML = `Match Tied. Both chose ${map[user]}.`;
        para.style.background = "rgb(43, 8, 28)";
    }
    else if (win == 1) {
        para.innerText = `You Won! ${map[user]} won over ${map[cm]}.`;
        para.style.background = "green";
    }
    else {
        para.innerText = `You Lose.. ${map[user]} lose to ${map[cm]}`;
        para.style.background = "red";
    }
}
const playGame = (user, cm) => {
    let win = 1;
    if (user == cm) win = 0;
    else {
        if ((user == 'r' && cm == 's') || (user == 'p' && cm == 'r') || (user == 's' && cm == 'p')) {
            usc++;
            usPara.innerText = usc;
        }
        else if (user == 'r' || user == 'p' || user == 's') {
            csc++;
            win = -1;
            compPara.innerText = csc;
        }
    }
    showWinner(user, cm, win);
}
choice.forEach((ch) => {
    ch.addEventListener('click', (e) => {
        const user = ch.getAttribute('id');
        //   const user = event.target.parentElement.id;
        // choice.forEach((curElm)=>{
        //     curElm.classList.remove("add");
        // })
        // ch.classList.add("add")
        const comp = compMove();
        playGame(user, comp);
    })

});