const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const screen_width = canvas.width;
const screen_height = canvas.height;

let ball = {
    x: screen_width / 2 - 15,
    y: screen_height / 2 - 15,
    width: 30,
    height: 30,
    speedX: 7 * (Math.random() > 0.5 ? 1 : -1),
    speedY: 7 * (Math.random() > 0.5 ? 1 : -1)
};

let player = {x: screen_width - 20, y: screen_height / 2 - 70, width: 10, height: 140, speed: 0};
let opponent = {x: 10, y: screen_height / 2 - 70, width: 10, height: 140, speed: 7};

let playerScore = 0;
let opponentScore = 0;
let scoreTime = 0;
let pongSound = new Audio("10139-Plink-13.wav");
let scoreSound = new Audio("score.wav");

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x + ball.width / 2, ball.y + ball.height / 2, ball.width / 2, 0, Math.PI * 2);
    ctx.fill();
}

function ballAnimation() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y <= 0 || ball.y + ball.height >= screen_height) {
        pongSound.play();
        ball.speedY *= -1;
    }

    if (ball.x <= 0) {
        scoreSound.play();
        playerScore++;
        resetBall();
    }

    if (ball.x + ball.width >= screen_width) {
        scoreSound.play();
        opponentScore++;
        resetBall();
    }

    if (ball.x + ball.width >= player.x && ball.y + ball.height >= player.y && ball.y <= player.y + player.height) {
        pongSound.play();
        ball.speedX *= -1;
    }

    if (ball.x <= opponent.x + opponent.width && ball.y + ball.height >= opponent.y && ball.y <= opponent.y + opponent.height) {
        pongSound.play();
        ball.speedX *= -1;
    }
}

function resetBall() {
    ball.x = screen_width / 2 - 15;
    ball.y = screen_height / 2 - 15;
    ball.speedX = 7 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 7 * (Math.random() > 0.5 ? 1 : -1);
}

function playerAnimation() {
    player.y += player.speed;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > screen_height) player.y = screen_height - player.height;
}

function opponentAnimation() {
    if (opponent.y + opponent.height / 2 < ball.y) opponent.y += opponent.speed;
    if (opponent.y + opponent.height / 2 > ball.y) opponent.y -= opponent.speed;
    if (opponent.y < 0) opponent.y = 0;
    if (opponent.y + opponent.height > screen_height) opponent.y = screen_height - opponent.height;
}

function drawScore() {
    ctx.font = "32px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(playerScore, screen_width / 2 + 20, 50);
    ctx.fillText(opponentScore, screen_width / 2 - 50, 50);
}

function gameLoop() {
    ctx.clearRect(0, 0, screen_width, screen_height);

    drawRect(0, 0, screen_width, screen_height, "#1e1e1e");
    drawRect(screen_width / 2 - 1, 0, 2, screen_height, "white");
    drawRect(player.x, player.y, player.width, player.height, "white");
    drawRect(opponent.x, opponent.y, opponent.width, opponent.height, "white");
    drawBall();
    drawScore();

    ballAnimation();
    playerAnimation();
    opponentAnimation();

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") player.speed = 7;
    if (event.key === "ArrowUp") player.speed = -7;
});

document.addEventListener("keyup", event => {
    if (event.key === "ArrowDown") player.speed = 0;
    if (event.key === "ArrowUp") player.speed = 0;
});

gameLoop();
