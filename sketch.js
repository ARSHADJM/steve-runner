var steve,stevewalkImage
var groundImage;
var ground
var wither,witherimg;
var chestPlate,pants,helmet,sword;
var chstimg,pntsimg,helmimg,swrdimg;
var apple,appleimg;
var cactus,cactusimg,cactusG;
var appleGroup;
var serve=0;
var Play=1;
var End=2;
var gameState = Play;
var restart,restartimg,restbtn;
var score = 0;
var gameOver;
var gameOverImg; 
function preload(){
 groundImage = loadImage("background.png");
  stevewalkImage = loadImage("imageedit_1_9675596516_ccexpress.png");
  witherimg = loadImage("Wither.jpg");
  chstimg = loadImage("Chestplate.png");
  pntsimg = loadImage("iron pants.jpg");
  helmimg = loadImage("Helmet.png");
  swrdimg = loadImage("Iron.png");
  appleimg = loadImage("apple2.png")
  cactusimg = loadImage("cactus.png")
  gameOverImg = loadImage("gameOver.png")
  restartimg = loadImage("restart2.png")

  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
 ground=createSprite(width/2,height/2,width*2,height);
  ground.addImage(groundImage)

  gameOver = createSprite(width/2,height/2,20,20)
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible=false

  restbtn = createSprite(width/2,height/2-100,width*2,height)
  restbtn.addImage("restart",restartimg);
  restbtn.scale=0.70
  restbtn.visible=false

 steve = createSprite(50,160,20,50);
  steve.addImage("walking",stevewalkImage);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  steve.scale = 0.30;
  steve.x = 250
  cactusG = new Group()
  appleGroup = new Group()
}


function draw(){
  background("white");
 
  if(gameState===Play){
  
  if(keyDown("space")){
    steve.velocityY = -10;
  }
   

  steve.velocityY = steve.velocityY + 0.8
  ground.velocityX=-2
  
  if (ground.x<0){
    ground.x=ground.width/2
  }
  if(frameCount%150===0){
    apple = createSprite(width-15,Math.round(random(height-50,100)),20,20)
    apple.addImage("apple",appleimg)
    apple.scale=0.2
    apple.velocityX=-5
    appleGroup.add(apple)
   }
   if(frameCount%100===0){
    cactus = createSprite(width-20,Math.round(random(height-100,150)))
    cactus.addImage("cactus",cactusimg)
    cactus.scale=0.5
    cactus.velocityX=-10
    cactusG.add(cactus)
   }
   if(steve.isTouching(appleGroup)){
     score=score+5
     appleGroup.destroyEach();
   }
   if(steve.collide(cactusG)){
     gameState = End;

   }
  
  }
 if(gameState===End){
   steve.velocityX=0
   steve.velocityY=0
   gameOver.visible=true
   restbtn.visible = true
   cactusG.setVelocityXEach(0)
   appleGroup.setVelocityXEach(0)
  ground.velocityX=0
  if(mousePressedOver(restbtn)){
    restart()
  }
 }
 
  
  console.log(frameCount)
  steve.collide(edges[3])
  steve.collide(edges[2])
  
  drawSprites();
  textSize(20)
  fill("black")
  text("score="+score,width/2+400,height/2-300) 

}
function restart(){
  gameState = Play 
  gameOver.visible = false
  restbtn.visible=false
 cactusG.destroyEach();
 appleGroup.destroyEach();
 score=0
 
}