//creating the gameState
var PLAY = 1;
var END = 0;
var gameState = PLAY;


//making the sword
var sword,fruit,Enemy,monster,gameOver;
//making images sprite for sword,fruit and enemy
var swordImage,fruit1,fruit2,fruit3,fruit4,EnemyImage,monsterImage,gameOverImage;

var gameOverSound,knifeSwooshSound

function preload(){
  
//adding the images to the variables
  swordImage = loadImage("sword.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameOverImage=loadImage("gameover.png");
  gameOverSound=loadSound("gameover.mp3");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  
}

function setup() {
    createCanvas(600,600);
  //creating the sword
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  gameOver= createSprite(300,300);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2;

  //creating groups
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  //adding the score
  score = 0;
  
}


function draw(){
//adding background
  background("skyBlue");

  if(gameState === PLAY){
    //making the restart
    gameOver.visible = false;
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    text("Score: "+ score, 300,50);
    
//typing the name of the functions defined later on
     fruits();
     Enemy();
    
     if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
     knifeSwooshSound.play();
    score = score+2;
  }
  
  if(enemyGroup.isTouching(sword)){
    enemyGroup.destroyEach();
    gameOverSound.play();
    score = score-2;
    gameState=END;
  }
    
    
  }
   else if (gameState === END) {
      gameOver.visible = true;
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
     sword.visible = false;
      sword.velocityX = 0;
      sword.velocityY = 0 ;
     
      
//set lifetime of the game objects so that they are never destroyed
     fruitGroup.setLifetimeEach(-1);
     enemyGroup.setLifetimeEach(-1);
     
     
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
   }
  

  
     drawSprites();
  text("Score: "+ score, 300,50);

} 

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit = createSprite(600,200,20,20);
   
    fruit.scale=0.2;
    
 //fruit.debug=true 
    r=Math.round(random(1,4));
  if(r==1){
    fruit.addImage(fruit1); 
  }  else if (r==2){
    fruit.addImage(fruit2);
  }  else if (r==3){
    fruit.addImage(fruit3);
  }   else {
    fruit.addImage(fruit4);
  }  
    
    if(position==1){
      fruit.x=600;
      fruit.velocityX= -(7+(score/4));
    }
    else
      {
        if(position==2)
      fruit.x=600;
        fruit.velocityX= -(7+(score/4));
        
      }

    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    
    }
   
    
  
}

function Enemy(){
   if(World.frameCount%200===0){
     monster=createSprite(600,200,20,20);
     monster.addAnimation("moving", monsterImage);
     monster.y = Math.round(random(100,300));
     monster.velocityX = -(8+(score/10));
     monster.setLifetime=50;
     
     enemyGroup.add(monster);
     
}
}