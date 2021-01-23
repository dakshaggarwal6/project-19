var player, player_running;
var player_collided;
var coin, coinimage, coingroup;
var obstacle, obstacleimage, obstaclegroup;
var ground, invisibleground;
var gameover, gameoverimage, restart, restartimage;
var play = 1;
var end = 0;
var gamestate = play;
var score = 0;

function preload() {
  player_running = loadAnimation(
    "player2.png",
    "player3.png",
    "player4.png",
    "player5.png"
  );
  coinimage = loadImage("coin.png");
  obstacleimage = loadImage("obstacle.png");
  gameoverimage = loadImage("gameover.png");
  restartimage = loadImage("restartimage.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  player = createSprite(80, 356, 20, 20);
  player.addAnimation("player running", player_running);
  player.scale = 0.6;
  player.debug = false;

  ground = createSprite(400, 410, 1800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  obstaclegroup = createGroup();
  coingroup = createGroup();

  gameover = createSprite(645, 120);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.8;
  gameover.visible = false;

  restart = createSprite(645, 190);
  restart.addImage(restartimage);
  restart.scale = 0.35;
  restart.visible = false;
}

function draw() {
  background("skyblue");

  stroke("black");
  textSize(20);
  fill("black");

  text(" Score : " + score, 400, 50);

  player.collide(ground);

  if (gamestate === play) {
    obstacles();
    coins();

    if (ground.x < 550) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && player.y >= 300) {
      player.velocityY = -21;
    }

    player.velocityY = player.velocityY + 0.8;

    if (coingroup.isTouching(player)) {
      score = score + 5;
      coin.destroy();
    }
    if (obstaclegroup.isTouching(player)) {
      gamestate = end;
    }
  } else if (gamestate === end) {
    gameover.visible = true;
    restart.visible = true;
    player.velocityX = 0;
    ground.velocityX = 0;
    coingroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    coingroup.setLifetimeEach(-1);
    player.velocityY = 0;

    if (mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}
function obstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(400, 380, 900, 10);
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.12;
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
    obstacle.debug = false;
    obstaclegroup.add(obstacle);
  }
}
function coins() {
  if (frameCount % 80 === 0) {
    coin = createSprite(400, 390, 10, 10);
    coin.addImage(coinimage);
    coin.scale = 0.12;
    coin.y = Math.round(random(100, 300));
    coin.velocityX = -5;
    coin.lifetime = 120;
    coingroup.add(coin);
  }
}
function reset() {
  gamestate = play;
  gameover.visible = false;
  restart.visible = false;
  obstaclegroup.destroyEach();
  coingroup.destroyEach();
  score = 0;
}
