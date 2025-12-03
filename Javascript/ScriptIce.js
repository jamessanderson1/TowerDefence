let GridSquares = [];
let PathPos = 
[0,0,0,0,0,0,0,0,0,0,
1,1,0,0,0,0,0,0,0,0,
0,1,0,0,0,0,0,0,1,1,
0,1,0,0,0,0,0,0,1,0,
0,1,0,0,0,0,0,0,1,0,
0,1,1,1,0,0,0,0,1,0,
0,0,0,1,0,0,1,1,1,0,
0,0,0,1,0,0,1,0,0,0,
0,0,0,1,1,1,1,0,0,0,
0,0,0,0,0,0,0,0,0,0];
let count = 0
let size = 50;
let Enemies = [];
let lives = 100;
let Money = 500;
let waves = 1;
let Clicked = false;
let Towers= [];
let snappedX = 0;
let snappedY = 0;
let diffSelect = true;
let maxWaves = 20;
let speed = 0;
let waveInProgress = false;
let upgrading = false;
let towerNum = 0;
let type = 0;

function setup() {
    createCanvas(650, 650); // Set canvas size
    background(240)
    createPixels();
}

function createPixels() {//function creates the grid of pixels 
    GridSquares = [];
    for (let row = 0; row < (500 / size); row++) {//loop iterates through row
      for (let column = 0; column < (500 / size); column++) {//loop iterates through column
        GridSquares.push(new GridSquareIce(size,column * size,row * size, PathPos[count]));
        count = count + 1;
      }
    }
}

function createEnemies() {
  // Determine how many enemies in this wave
  if (waves <= 5) {
    enemiesToSpawn = 10;
  } else if (waves <= 10) {
    enemiesToSpawn = 10; 
  } else if (waves <= 15) {
    enemiesToSpawn = 10; 
  } else if (waves <= 20) {
    enemiesToSpawn = 10; 
  } else if (waves <= 25) {
    enemiesToSpawn = 10; 
  } else if (waves <= 30){
    enemiesToSpawn = 15 
  } else if (waves <= 35){
    enemiesToSpawn = 15 
  } else if (waves <=40){
    enemiesToSpawn = 13
  } else if (waves <= 45){
    enemiesToSpawn = 15
  } else if (waves <= 50){
    enemiesToSpawn = 15
  }  else if (waves <= 55){
    enemiesToSpawn = 15
  }  else if (waves <= 60){
    enemiesToSpawn = 20
  }

  enemiesSpawnedThisWave = 0;
  spawnEnemy();  // start spawning enemies one by one
}

function spawnEnemy() {
  if (enemiesSpawnedThisWave >= enemiesToSpawn) {
    return;
  }
  // Decide health based on wave
  let health = 1
  if (waves <= 5){
      if(enemiesSpawnedThisWave < 10){
        health = 1
      }
  }
  if (waves > 5 && waves <= 10){
      if(enemiesSpawnedThisWave < 5){
       health = 1
      }else if(enemiesSpawnedThisWave >= 5 && enemiesSpawnedThisWave < 10){
        health = 2
      }
  }
  if (waves > 10 && waves <= 15){
      if(enemiesSpawnedThisWave < 3){
        health = 1
      }else if(enemiesSpawnedThisWave >= 3 && enemiesSpawnedThisWave < 5){
        health = 2
      } else if(enemiesSpawnedThisWave >= 5 && enemiesSpawnedThisWave < 10){
        health = 3
    }  
  }
  if (waves > 15 && waves <= 20){
      if(enemiesSpawnedThisWave < 5){
        health = 2
      }else if(enemiesSpawnedThisWave >= 5 && enemiesSpawnedThisWave < 10){
        health = 3
      }
  }
  if (waves > 20 && waves <= 25){
    if(enemiesSpawnedThisWave < 3){        
      health = 1
    }else if(enemiesSpawnedThisWave >= 4 && enemiesSpawnedThisWave < 8){
      health = 2
    }else if (enemiesSpawnedThisWave >= 8 && enemiesSpawnedThisWave < 10){
        health = 3
    }
  }
  if (waves > 25 && waves <= 30){
      if(enemiesSpawnedThisWave < 5){
        health = 1
      }else if(enemiesSpawnedThisWave >= 5 && enemiesSpawnedThisWave < 10){
        health = 2
      }else if(enemiesSpawnedThisWave >= 10 && enemiesSpawnedThisWave < 15){
        health = 3
      }
  }
  if (waves > 30 && waves <= 35){
      if(enemiesSpawnedThisWave < 10){
        health = 2
      }else if(enemiesSpawnedThisWave >= 10 && enemiesSpawnedThisWave < 15){
        health = 3
      }
  }
  if (waves > 35 && waves <= 40){
    if(enemiesSpawnedThisWave < 5){
        health = 2
    }else if(enemiesSpawnedThisWave >= 5 && enemiesSpawnedThisWave < 10){
        health = 3
    }else if(enemiesSpawnedThisWave >= 10 && enemiesSpawnedThisWave < 13){
        health = 4
    }
  }
  if (waves > 40 && waves <= 45){
      if(enemiesSpawnedThisWave < 5){
        health = 2
      }else if(enemiesSpawnedThisWave >= 5 && enemiesSpawnedThisWave < 15){
        health = 3
      }
  }
  if (waves > 45 && waves <= 50){
    if(enemiesSpawnedThisWave < 2){
        health = 2
      }else if(enemiesSpawnedThisWave >= 5 && enemiesSpawnedThisWave < 12){
        health = 3
      } else if(enemiesSpawnedThisWave >= 12 && enemiesSpawnedThisWave < 15){
        health = 4
      }
  }
  if (waves > 50  && waves <= 55){
      if(enemiesSpawnedThisWave < 10){
        health = 3
      } else if(enemiesSpawnedThisWave >= 10 && enemiesSpawnedThisWave < 15){
        health = 4
      }
  }
  if (waves > 55  && waves <= 60){
      if(enemiesSpawnedThisWave < 10){
        health = 3
      } else if(enemiesSpawnedThisWave >= 10 && enemiesSpawnedThisWave < 20){
        health = 4
      }
  }
  // Spawn a single enemy
  Enemies.push(new enemies(size/2, size + size/2, "right", health,speed));
  enemiesSpawnedThisWave++;

  // Schedule next one
  if (enemiesSpawnedThisWave < enemiesToSpawn) {
    if (waves <= 20){
      setTimeout(spawnEnemy, 1000); // 1 per second
    } else if (waves > 20 || waves <= 40){
      setTimeout(spawnEnemy, 750); // 1 per 0.75 seconds 
    } else if (waves > 40 || waves <= 60){
      setTimeout(spawnEnemy, 500); // 2 per second 
    }
      
  
  } else {
    waveInProgress = false;
  }
}

function draw() {;
    if (diffSelect) {
    background(240);
    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Easy", width / 2, height / 2 - 75);
    text("Medium", width / 2, height / 2);
    text("Hard", width / 2, height / 2 + 75);
    return; // skip rest of draw
  }
    background(240);  // Clear the canvas every frame
    stroke(0);  
    strokeWeight(0.5)    
    for (let i = 0; i < GridSquares.length; i++){//draws the pixels 
      GridSquares[i].display();
    }
    for (let i = Enemies.length - 1; i >= 0; i--) {//draws the enemies
      Enemies[i].display();
      Enemies[i].move(PathPos, size);
      if (Enemies[i].getXpos() > 500) {
        lives = lives - Enemies[i].getHealth();
        Enemies.splice(i, 1);
      }
    }
    for (let i = 0; i < Towers.length; i++){
      Towers[i].display();
    }
      textAlign(LEFT, TOP);
      textStyle(NORMAL);
      fill('green') //text colour
      textSize(20) //text size
      text('Lives : ' + lives , 510, 20); //display lives
      text('Money: ' + Money , 510, 40); // display money
      text('Waves : ' + waves + '/' + maxWaves, 510, 60); // display waves
      if (Money < 300){ // sqaure under the tower
        fill("red")
        square(510,90,60)
      }else{
        fill("green")
        square(510,90,60)
      }
      fill('black')
      text("300",575,110) // cost next to the tower 
      fill (230, 143, 30)
      square(520,100,40)
      fill("black")
      rect(510,110,30,20)

      if (Money < 500){ // sqaure under the tower
        fill("red")
        square(510,190,60)
      }else{
        fill("green")
        square(510,190,60) 
      }
      fill('black')
      text("500",575,210) // cost next to the tower 
      fill (252, 53, 53)
      square(520,200,40)
      fill("black")
      rect(510,210,40,20)

      if(Money < 400){
        fill("red")
        square(510,290,60)
      }else{
        fill("green")
        square(510,290,60) 
      }

      fill('black')
      text("400",575,310) // cost next to the tower 
      fill (164, 79, 255)
      square(520,300,40)
      fill("black")
      rect(512,315,56,10)
      rect(535,292,10,56)


      if (Clicked){
        snappedX = Math.floor(mouseX / 50) * 50 + 25;
        snappedY = Math.floor(mouseY / 50) * 50 + 25;
        if (type == 1){
          fill(0, 0, 0, 127);
          circle(snappedX, snappedY, 250);
          fill(230, 143, 30, 127);
          square(snappedX - 20, snappedY - 20, 40);
          fill(10, 10, 10, 127);
          rect(snappedX - 30, snappedY - 10, 30, 20);
        }else if (type == 2){
          fill(0, 0, 0, 127);
          circle(snappedX, snappedY, 400);
          fill(252, 53, 53, 127);
          square(snappedX - 20, snappedY - 20, 40);
          fill(10, 10, 10, 127);
          rect(snappedX - 30, snappedY - 10, 40, 20);
        } else if (type == 3){
          fill(0, 0, 0, 127);
          circle(snappedX, snappedY, 150);
          fill (164, 79, 255)
          square(snappedX - 20, snappedY - 20,40)
          fill(10, 10, 10);
          rect(snappedX - 28, snappedY - 5,56,10)
          rect(snappedX - 5, snappedY - 28,10,56)
        }

      }

      if (upgrading){
        fill(0, 0, 0, 127);
        circle(Towers[towerNum].getXpos(),Towers[towerNum].getYpos(),Towers[towerNum].getRange() * 2,);
        fill(0,0,255);
        circle(Towers[towerNum].getXpos(), Towers[towerNum].getYpos() + 50, 50);
        circle(Towers[towerNum].getXpos(), Towers[towerNum].getYpos() - 50, 50);
        circle(Towers[towerNum].getXpos() + 50, Towers[towerNum].getYpos() , 50)
        fill(0,0,0);
        textSize(15)
        text("refund",Towers[towerNum].getXpos() + 30 , Towers[towerNum].getYpos() - 5)
      if (Towers[towerNum].getType() == 1){
          fill(0,0,0);
          textSize(15)
          text("fire",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() - 65)
          text("rate",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() - 55)
          text("range",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() + 40)
          textSize(10)
          text("150",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() + 55)
          text("200",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() - 42)
      }else if (Towers[towerNum].getType() == 2){
          fill(0,0,0);
          textSize(12)
          text("damage",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() - 65)
          text(15)
          text("range",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() + 40)
          textSize(10);
          text("150",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() + 55)
          text("200",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() - 45)
      } else if (Towers[towerNum].getType() == 3){
          fill(0,0,0);
          textSize(15);
          text("fire",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() - 65)
          text("rate",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() - 55)
          textSize(12);
          text("damage",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() + 45)
          textSize(10);
          text("200",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() + 55)
          text("200",Towers[towerNum].getXpos() - 20, Towers[towerNum].getYpos() - 42)
      }
      }
   for (let i = 0; i < Towers.length; i++) {
    if (Towers[i].getType() == 1 || Towers[i].getType() == 2) {
        Towers[i].findClosestEnemy(Enemies);
    }
  }
  for (let i = 0; i < Enemies.length; i++) {
    for (let j = 0; j < Towers.length; j++) {
      if (getDistance(i, j)) {
      if (Towers[j].getType() == 1 || Towers[j].getType() == 2){
        Towers[j].shoot(Enemies); // now fires only when ready
        if (Enemies[i].getHealth() <= 0) {
          Money += 10;
          Enemies.splice(i, 1);
          break; // stop shooting this enemy
        }
      } else if(Towers[j].getType() == 3){
        Towers[j].shoot(Enemies); // now fires only when ready
      }
     }
    }       
  }
  if (!waveInProgress && Enemies.length == 0 && waves <= maxWaves){
    waveInProgress = true;
    waves = waves + 1 
    setTimeout(createEnemies, 2000);
  }
  if (waves == maxWaves + 1){     
    endScreen()
  }
  if (lives == 0){
    endScreen()
  }
}
function mousePressed(){
    if (Clicked == true){
      Clicked = false;
      if (type == 1){
        Money = Money - 300
        Towers.push(new tower(snappedX,snappedY,125,75,1,type,300)) // 125 for raduis 75 for firerate 
      }else if (type == 2){
        Money = Money - 500
        Towers.push(new tower(snappedX,snappedY,200,125,2,type,500)) // 200 for raduis 125 for firerate 
      }else if (type == 3){
        Money = Money - 400 
        Towers.push(new tower(snappedX,snappedY,75,60,1,type,400)) // 75 for raduis 60 for firerate 
      }
    }
    if(((mouseX < 560 && mouseX > 520) && (mouseY > 100 && mouseY < 140)) && Money >= 300){
      if (Clicked == false) {
        Clicked = true;
        type = 1
      }
    } 
    if (((mouseX < 560 && mouseX > 520) && (mouseY > 200 && mouseY < 240)) && Money >= 500){
      if (Clicked == false) {
        Clicked = true;
        type = 2
      }
    }
    if (((mouseX < 560 && mouseX > 520) && (mouseY > 300 && mouseY < 340)) && Money >= 400){
      if (Clicked == false) {
        Clicked = true;
        type = 3;
      }
    }

    for(i=0; i < Towers.length  ;i++){
      if ((mouseX < Towers[i].getXpos() + 20 && mouseX > Towers[i].getXpos() - 20) && 
      (Towers[i].getYpos() - 20 < mouseY && Towers[i].getYpos() + 20 > mouseY ) && upgrading == false){ 
        //checks the tower is being clicked
        upgrading = true;
        towerNum = i;
      }else if ((mouseX < Towers[i].getXpos() + 20 && mouseX > Towers[i].getXpos() - 20) && 
      (Towers[i].getYpos() - 20 < mouseY && Towers[i].getYpos() + 20 > mouseY) && upgrading == true){
          upgrading = false;
      }
    }
  
    if(upgrading == true && Towers.length > 0){ // checks that Towers is populated
      if (((mouseX < Towers[towerNum].getXpos() + 25 && mouseX > Towers[towerNum].getXpos() - 35) && 
      (Towers[towerNum].getYpos() + 25 < mouseY && Towers[towerNum].getYpos() + 75 > mouseY)) && Money >= 150 ) /*enusres they have enough money */ {
        if ( Towers[towerNum].getType() == 1 ){
          Towers[towerNum].setRange(150) // increases range 
          Money = Money - 150 // reduces money  
          Towers[towerNum].setValue(150)
        }else if ( Towers[towerNum].getType() == 2){
          Towers[towerNum].setRange(225) // increases range 
          Money = Money - 150 // reduces money 
          Towers[towerNum].setValue(150)
        }else if(Towers[towerNum].getType () ==3 ){
          Towers[towerNum].setFireRate(45) // increases firerate 
          Money = Money - 200 // reduces money
          Towers[towerNum].setValue(200) 
        }
      }
      if (((mouseX < Towers[towerNum].getXpos() + 25 && mouseX > Towers[towerNum].getXpos() - 35) && 
      (Towers[towerNum].getYpos() - 25 > mouseY && Towers[towerNum].getYpos() - 75 < mouseY)) && Money >= 200 ) /*enusres they have enough money */ {
        if ( Towers[towerNum].getType() == 1 ){
          Towers[towerNum].setFireRate(60) // increases firerate 
          Money = Money - 200 // reduces money 
          Towers[towerNum].setValue(200) 
        }else if ( Towers[towerNum].getType() == 2){
          Towers[towerNum].setDamage(3) // increases damage 
          Money = Money - 200 // reduces money 
          Towers[towerNum].setValue(200) 
        } else if(Towers[towerNum].getType () ==3 ){
          Towers[towerNum].setDamage(2) // increases damage 
          Money = Money - 200 // reduces money 
          Towers[towerNum].setValue(200) 
        }
      }
      if ((mouseX > Towers[towerNum].getXpos() + 25 && mouseX < Towers[towerNum].getXpos() + 75) && 
      (Towers[towerNum].getYpos() - 25 < mouseY && Towers[towerNum].getYpos() + 25 > mouseY)) {
      Money = Money + Towers[towerNum].getValue() * 0.75
      Towers.splice(towerNum, 1);
      upgrading = false; 
      }
    }
    
    if (mouseX > width/2 - 60 && mouseX < width/2 + 60 && mouseY > height/2 + 5 && mouseY < height/2 + 45 && (lives == 0 || waves == maxWaves + 1)) {
    Return(); // call return function
  }
   if (diffSelect) {
    // Easy
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
        mouseY > height/2 - 100 && mouseY < height/2 - 50) {
        maxWaves = 20;
        Money = 500;
        speed = 1
    }
    // Medium
    else if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
             mouseY > height/2 - 25 && mouseY < height/2 + 25) {
        maxWaves = 40;
        Money = 400;
        speed = 2
    }
    // Hard
    else if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
             mouseY > height/2 + 50 && mouseY < height/2 + 100) {
        maxWaves = 60;
        Money = 300;
        speed = 3
    }
    loop()
    diffSelect = false; 
    waveInProgress = true;
    setTimeout(createEnemies,1000);
  }
}
function getDistance(i,j){
  let xDistance = Towers[j].getXpos() - Enemies[i].getXpos()
  let yDistance = Towers[j].getYpos() - Enemies[i].getYpos()
  return ((xDistance * xDistance + yDistance * yDistance) <= (Towers[j].getRange() * Towers[j].getRange()));
}
function endScreen(){
  background(240);
	if (waves == maxWaves + 1){
		fill('black')
 		textSize(50)
  	textStyle(BOLD)
    textAlign(CENTER, CENTER)
		text("WELL DONE", width / 2, height / 2 - 50)
    text("Return", width/2, height/2 + 25)
  }else if(lives == 0){
		fill('black')
 		textSize(50)
  	textStyle(BOLD)
    textAlign(CENTER, CENTER)
		text("DEFEAT", width / 2, height / 2 - 50)
    text("Return", width/2, height/2 + 25)
	}
	noLoop()
}
function Return() {
  window.location.href = "select-map.html"; // chnage html page
}


  