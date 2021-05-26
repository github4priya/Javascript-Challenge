// alert('Welcome to my website');
function noofdays(){
    var year=prompt('Which year do you born in ?');
    var ageInDays = 2021-year;
    var element = document.createElement('hi');
    var textAnswer = document.createTextNode('You are '+ ageInDays+' years old');
    element.setAttribute('id', 'ageInDays');
    element.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(element);
}
function clearit(){
    document.getElementById('flex-box-result').remove();
}
function catgenerator(){
    var image=document.createElement('img');
    var div = document.getElementById("flex-cat-gen");
    image.src="https://www.w3schools.com/css/pineapple.jpg";
    div.appendChild(image);
}


//challenge: 3
function rpsGame(yourchoice)
{
    var botchoice, humanchoice;
    humanchoice=yourchoice.id;
    botchoice = rps(random012());

    console.log("your choice : "+ humanchoice);
    console.log("computer choice : "+botchoice);

    result=decideWinner(humanchoice, botchoice);
    console.log(result);
    message = rpsmessage(result);
    console.log(message);
    rpsfrontend(yourchoice.id, botchoice, message);
}

function  random012()
{
     return (Math.floor(Math.random()*3));
}

function rps(number)
{
    return ["rock", "paper", "scissor"][number] ;
}

function decideWinner(yourchoice, computerchoice)
{
    var rpsDatabase={
        'rock':{'rock':0.5, 'paper':0, 'scissor':1},
        'paper':{'rock':1, 'paper':0.5, 'scissor':0},
        'scissor':{'rock':0, 'paper':1, 'scissor':0.5},
    }
    var yourscore=rpsDatabase[yourchoice][computerchoice];
    var computerscore=rpsDatabase[computerchoice][yourchoice];
    return [yourscore, computerscore];
}
function rpsmessage([yourscore, botscore])
{
    if(yourscore===0)
        return {'message':'you lost!', 'color':'red'};
    else if(yourscore===1)
        return {'message':'you won!', 'color':'green'};
    if(yourscore===0.5)
        return {'message':'you tied!', 'color':'yellow'};

}
function rpsfrontend(humanImageChoice, botImageChoice, finalMessage)
{
    var imagesDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissor':document.getElementById('scissor').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"


    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//challenge:4
var all_buttons=document.getElementsByTagName('button');
var copyButtons=[];
for(let i=0; i<all_buttons.length; i++)
{
    copyButtons.push(all_buttons[i].classList[1]);
}
// console.log(copyButtons);
function buttoncolorchange(buttonThingy)
{
    if(buttonThingy.value==='red')
    {
        buttonRed();
    }
    else if(buttonThingy.value==='green')
    {
        buttonGreen();
    }
    else if(buttonThingy.value==='reset')
    {
        buttonReset();
    }
    else if(buttonThingy.value==='random')
    {
        buttonRandom();
    }

}
function buttonRed()
{
    for(let i=0; i<all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}

function buttonGreen()
{
    for(let i=0; i<all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}

function buttonGreen()
{
    for(let i=0; i<all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}

function buttonReset()
{
    for(let i=0; i<all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyButtons[i]);
    }
}

function buttonRandom()
{
    for(let i=0; i<all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        let num = Math.floor(Math.random()*all_buttons.length);
        all_buttons[i].classList.add(copyButtons[num]);
    }
}


//challenge 5: Blackjack
let blackjackGame={
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'card' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap' : {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1,11]},
    'win':0,
    'loss':0,
    'draw':0,
    'isStand':false,
    'turnsOver':false,
};

const YOU =blackjackGame['you'];
const DEALER =blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lostSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);

function blackjackHit()
{
    if(blackjackGame['isStand']===false)
    {
        let card=randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}
function randomCard()
{
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['card'][randomIndex];
}
function showCard(card, activePlayer)
{
    if(activePlayer['score']<=21)
    {
        cardImage=document.createElement('img');
        cardImage.src=`static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }

}

function blackjackDeal()
{
    if(blackjackGame['turnsOver']===true)
    {
        blackjackGame['isStand']=false;
        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        // console.log(yourImages);
        for(let i=0; i<yourImages.length; i++)
        {
            yourImages[i].remove();
        }
        YOU['score']=0;
        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color='#ffffff';

        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0; i<dealerImages.length; i++)
        {
            dealerImages[i].remove();
        }
        DEALER['score']=0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).style.color='#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";

        document.querySelector('#blackjack-result').style.color ='black';

        blackjackGame['turnsOver']=false;
    }

}

function updateScore(card, activePlayer)
{
    if(card=='A')
    {
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21)
        {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else
        {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }

}

function showScore(activePlayer)
{
    if(activePlayer['score']>21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }

}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand()
{
    blackjackGame['isStand']=true;
    while(DEALER['score']<16 && blackjackGame['isStand']===true)
    {
        let card=randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

        blackjackGame['turnsOver']=true;
        let winner=computeWinner();
        soundResult(winner);
}

function computeWinner()
{
    let winner;

    if(YOU['score']<=21)
    {
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21))
        {
            blackjackGame['win']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score'])
        {
            blackjackGame['loss']++;
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score'])
        {
            blackjackGame['draw']++;
        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21)
    {
        blackjackGame['loss']++;
        winner=DEALER;
    }
    else if(YOU['score']>21 && DEALER['score']>21)
    {
        blackjackGame['draw']++;
    }

    return winner;
}
function soundResult(winner)
{
    let message, messagecolor;
    if(blackjackGame['turnsOver']===true)
    {
        if(winner===YOU)
        {
            document.querySelector('#wins').textContent=blackjackGame['win'];
            message ="You Won!";
            messagecolor='green';
            winSound.play();
        }
        else if(winner===DEALER)
        {
            document.querySelector('#losses').textContent=blackjackGame['loss'];
            message ="You Lost!";
            messagecolor='red';
            lostSound.play();
        }
        else
        {
            document.querySelector('#draws').textContent=blackjackGame['draw'];
            message ="You Drew!";
            messagecolor='black';
        }
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messagecolor;
    }
}
