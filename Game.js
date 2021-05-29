class Game{
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

   
      form = new Form()
      form.display();
    
    }

    ground = createSprite(690,770,1800,displayHeight);
    ground.addImage("debg",Bg);
   ground.y=ground.height/2;  
   ground.velocityY=-4;

    gun1 = createSprite(100,500);
    gun1.addImage("gun",gunImg);
     gun1.scale = 0.1;

    gun2 = createSprite(300,500);
    gun2.addImage("gun",gunImg);
    gun2.scale = 0.1;

    gun3 = createSprite(500,500);
    gun3.addImage("gun",gunImg);
    gun3.scale = 0.1;

    gun4 = createSprite(700,500);
    gun4.addImage("gun",gunImg);
    gun4.scale = 0.1;

    guns = [gun1, gun2, gun3, gun4];

//bullet = new Bullet(300,600,30,30);
  

   // guardian1.setCollider("rectangle",20,0,250,780);
 //  guardian1.debug = true
  //guardian2.setCollider("rectangle",20,0,250,780);
 //  guardian2.debug = true
  /// guardian3.setCollider("rectangle",20,0,250,780);
 //  guardian3.debug = true
//   guardian4.setCollider("rectangle",20,0,250,780);
  // guardian4.debug = true

    aliensGroup = createGroup();

    
  }

  createBullet(){
  bullet = createSprite(400,700,32,13); 
  bullet.scale = 0.2;
  bullet.addImage("bullet",BulletImg);
 bullet.velocityY = -8;
  bullet.lifetime = 65;
 }

  level1(){
    form.hide();
    Player.getPlayerInfo();
 
 
    if(allPlayers !== undefined){
    background(220);
     

      var index = 0;

   
      var x = 175 ;
      var y;

      for(var plr in allPlayers){

        index = index + 1 ;

     
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        guns[index-1].x = x;
        guns[index-1].y = y;
       // console.log(index, player.index)
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,170,170);
        guns[index - 1].shapeColor = "red";
   if(ground.y<100){
   ground.y=ground.height/2;
    }
        }

   if(keyIsDown(32)) {
       this.createBullet();
       }



        if(keyIsDown(UP_ARROW)&& player.index !== null ){
          player.distance +=15;
           player.update();
       }
 
         if(keyIsDown(DOWN_ARROW)&& player.index !== null ){
          player.distance  -=15;
          player.update();
         }

    
        
         if(frameCount % 100 === 0){
          alien = createSprite(random(200,1000),0,40,40);
          alien.addImage("alien",alienImg);
          alien.scale = 0.2;
          alien.y = Math.round(random(1,5));
          alien.lifetime = 100;  
            alien.velocityY= 6;
            aliensGroup.add(alien);
             }
             
           if(player.distance > 720){
          player.distance = 200    
                }

       if(player.distance < -600){
        gameState = 2;   
      }


        }
       
     

        drawSprites();

      
  
      }
      
    }

  
      end(){
       background(0);
     image(GameOver,displayWidth/2-300,displayHeight/4,600,100);
     image(TryAgain,displayWidth/2-70,displayHeight/4+100,150,150);
   
       console.log("Game Over");
    }

    
   

  }

