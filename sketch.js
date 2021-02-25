var gameState = "play";
var player, player_running;
var inviGround;
var back, backImage;
var banana, bananaImage, FoodGroup;
var score = 0;
var stone, stoneImage, stoneGroup;

function preload(){
  
 backImage = loadImage("jungle.jpg") 
  
player_running = 
loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png",   "Monkey_04.png", "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
   
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  
  
}


function setup() {
  createCanvas(600, 600);

  back = createSprite(0, 0, 600, 600);
  back.addImage(backImage);
  back.scale = 1.6; 

  player = createSprite(100, 390, 50, 50)
  player.addAnimation("running", player_running);
  player.scale = 0.1;

  inviGround = createSprite(300, 400, 700, 10);
  inviGround.visible = false;

  FoodGroup = new Group();
  stoneGroup = new Group();



}

function draw() {
  background(220);

  
  if(gameState === "play") { 
  
  
  if(keyDown("space")&& player.y>=300){
    player.velocityY = -20;
  }
  
  player.velocityY = player.velocityY+0.8;
  player.collide(inviGround);

  back.velocityX = -3;
  
  if(back.x<0){
    back.velocityX = back.width/2;
  }
  
  spawnFood();
  spawnStone();
  
  if(FoodGroup.isTouching(player)){
    score = score+5;
    FoodGroup.destroyEach();
  }

 
    switch(score){
      case 10: player.scale = 0.12;
              break;
      case 20: player.scale = 0.14;
              break;
      case 30: player.scale = 0.16;
              break
      case 40: player.scale = 0.18; 
              break;
      default: break;      
 
}  
  
  
  if(stoneGroup.isTouching(player)){
    player.scale = 0.1;
   
  }
  
  if(stoneGroup.isTouching(player)&&score >= 10){
    back.velocityX = 0;
    FoodGroup.destroyEach();
    stone.velocityX = 0;
    stone.lifetime = -1;
    
    gameState = "end";
  }
  
 
 
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score, 500, 50);
 
  }
   
  if(gameState === "end"){
      fill("red");
    textSize(30);
    text("GAME OVER", 200, 300);
    
    
  }
  
    
  
 
  





}  
   

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage("fruit", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    FoodGroup.add(banana);
  }
}

function spawnStone(){

  if (frameCount % 300 === 0) {
    stone = createSprite(550, 380, 40, 40);
        
    stone.addImage(stoneImage);
    stone.scale = 0.1;
    stone.velocityX = -5;
    stone.lifetime = 300;
    player.depth = stone.depth + 1;
    
    
    stoneGroup.add(stone);


}
}


