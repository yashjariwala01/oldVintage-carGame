const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen")
const playArea = document.querySelector(".playArea")


startScreen.addEventListener('click',startGame)

let player ={ speed: 5, score: 0};

let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(event){
    event.preventDefault();
    keys[event.key]=true;
}

function keyUp(event){
    event.preventDefault();
    keys[event.key]= false;
}

function isCollide(i,r){
    iRect = i.getBoundingClientRect();
    rRect = r.getBoundingClientRect();

    return !((iRect.top > rRect.bottom) || (iRect.bottom < rRect.top) || (iRect.right< rRect.left) || (iRect.left > rRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.line');

    lines.forEach(function(item){
        if(item.y >=800){
            item.y -= 800;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
}

function moveRival(car){
    let rival = document.querySelectorAll('.rival');

    rival.forEach(function(item){

        if(isCollide(car, item)) {
            console.log("hit");
            endGame();
        }

        if(item.y >=800){
            item.y = -50;
            item.style.left = Math.floor(Math.random()*250)+ 'px'
        }

        item.y += player.speed;
         item.style.top = item.y + "px";
    })
}
function gamePlay(){
    // console.log("clicked");
    let car = document.querySelector('.car');
    let road = playArea.getBoundingClientRect();
    // console.log(player.x);
    

    if(player.start){
        moveLines();
        moveRival(car);

        if(keys.ArrowUp && player.y > 50){player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 90)){player.y +=player.speed}
        if(keys.ArrowLeft && player.x > -10){player.x -=player.speed}
        if(keys.ArrowRight && player.x < (road.width - 70) ){player.x +=player.speed}

        car.style.top = player.y + "px";
        car.style.left= player.x + "px";

        player.score++;
        score.innerText ="Score: "+ player.score;
        window.requestAnimationFrame(gamePlay); 
    }
       
}

function startGame(){

    startScreen.classList.add('hide');
    playArea.innerHTML ="";

    player.start=true;
    player.score =0;
    

    for(let i=0;i<5;i++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'line');
        roadLine.y= (i*150)
        roadLine.style.top = roadLine.y + "px";
        playArea.appendChild(roadLine);
    }

    let car= document.createElement("span");
    car.setAttribute('class','car');
    playArea.appendChild(car);
    

    player.x = car.offsetLeft;
    player.y= car.offsetTop;

    for(let i=0;i<3;i++){
        let rivalCar = document.createElement('div');
        rivalCar.setAttribute('class', 'rival');
        rivalCar.y= ((i+1) *250) * -1;
        rivalCar.style.top = rivalCar.y + "px";
        rivalCar.style.backgroundColor =randomColor();
        rivalCar.style.left = Math.floor(Math.random()*350)+ 'px'
        playArea.appendChild(rivalCar);
    }
    window.requestAnimationFrame(gamePlay);
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}
