class tower {
    constructor(Xposition, Yposition,range , fireRate, damage, type,value) {   
        this.Xpos = Xposition;
        this.Ypos = Yposition;
        this.range = range
        this.fireRate = fireRate //frames between shots 
        this.damage = 1;
        this.lastShot = 0; // frame count of last shot
        this.moneyVal = 300
        this.damage = damage;
        this.type = type;
        this.value = value
        this.angle = 0;
        this.target = null;
        
    }
    display() {
      push(); // save current drawing state
      translate(this.Xpos, this.Ypos); // move origin to tower position
    // Rotate only for type 1 and 2

    // Type 1 tower
    if (this.type == 1) {
      fill(230, 143, 30);
      square(-20, -20, 40); // base stays centered
      rotate(this.angle);
      fill(10, 10, 10);
      rect(0, -10, 30, 20); // barrel points right by default
    }
    // Type 2 tower
    else if (this.type == 2) {
      fill(252, 53, 53);
      square(-20, -20, 40);
      rotate(this.angle);
      fill(10, 10, 10);
      rect(0, -10, 40, 20);
    }
    // Type 3 tower (no rotation)
    else if (this.type == 3) {
      fill(164, 79, 255);
      square(-20, -20, 40);
      fill(10, 10, 10);
      rect(-28, -5, 56, 10);
      rect(-5, -28, 10, 56);
    }

    pop(); // restore previous drawing state
  }

    findClosestEnemy(enemies) {
    let closest = null;
    let closestDist = 100000000000;
    for (let i = 0; i < enemies.length; i++) {
        let distanceX = enemies[i].getXpos() - this.Xpos;
        let distanceY = enemies[i].getYpos() - this.Ypos;
        let distSq =distanceX*distanceX + distanceY*distanceY;
        if (distSq <= this.range*this.range && distSq < closestDist) {
            closestDist = distSq;
            closest = enemies[i];
        }
    }
    this.target = closest;

    if (this.target) {
        // Calculate angle toward target
        this.angle = atan2(this.target.getYpos() - this.Ypos, this.target.getXpos() - this.Xpos);
    }
    
  }
    getValue(){
      return this.value
    }
    setValue(val){
      this.value = this.value + val
    }
    getType(){
      return this.type;
    }
    getAngle(enemy) {
        let x = enemy.getXpos() - this.Xpos;
        let y = enemy.getYpos() - this.Ypos;
        return atan2(y, x); // angle in radians
    }

    getXpos(){
        return this.Xpos
    } 
    getYpos(){
        return this.Ypos
    }
    getRange() {
        return this.range;
    }   
    canShoot() {
    return frameCount - this.lastShot >= this.fireRate;
    }
    setFireRate(fireRate){
      this.fireRate = fireRate; 
    }
    setRange(range){
      this.range = range; 
    }
    setDamage(damage){
      this.damage = damage
    }

shoot(enemies) {
  if (this.type == 1 || this.type == 2) {
    if (this.canShoot()) {
      // Shoots directly at one enemy
       if (enemies.length > 0) {
        let target = enemies[0]; // first in range
        stroke("red");
        strokeWeight(4);
        line(this.Xpos, this.Ypos, target.getXpos(), target.getYpos());
        target.setHealth(target.getHealth() - this.damage);
        this.lastShot = frameCount;
      }
    }
  }
  if (this.type == 3) {
    if (this.canShoot()) {
      strokeWeight(4);
      fill ("red");
      line(this.Xpos, this.Ypos, this.Xpos, this.Ypos - 75); // up
      line(this.Xpos, this.Ypos, this.Xpos, this.Ypos + 75); // down
      line(this.Xpos, this.Ypos, this.Xpos + 75, this.Ypos); // right
      line(this.Xpos, this.Ypos, this.Xpos - 75, this.Ypos); // left

      // Damage any enemy that crosses one of those lines
      for (let i = 0; i < enemies.length; i++) {
        let enemiesX = enemies[i].getXpos();
        let enemiesY = enemies[i].getYpos();
        // Check if enemy is close enough to any of the 4 laser lines
        if ((abs(enemiesX - this.Xpos) < 10 && abs(enemiesY - this.Ypos) < 75) || // vertical hit
          (abs(enemiesY - this.Ypos) < 10 && abs(enemiesX - this.Xpos) < 75)    // horizontal hit
        ) {
          enemies[i].setHealth(enemies[i].getHealth() - this.damage);
           if (enemies[i].getHealth() <= 0) {
            enemies.splice(i, 1);
            Money += 10;
          }
        }
      }
      this.lastShot = frameCount;
    }
  }
}
}