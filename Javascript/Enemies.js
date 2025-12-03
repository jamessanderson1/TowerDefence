class enemies {
    constructor(Xposition, Yposition, direction, health,speed) {   
        this.Xpos = Xposition;
        this.Ypos = Yposition;
        this.direction = direction;
        this.health = health;
        this.speed = speed;
    }
    display() {
        if (this.health == 1){
            fill(214, 34, 34);
            circle(this.Xpos, this.Ypos, 25);
        }
        if (this.health == 2){
            fill(80, 149, 191);
            circle(this.Xpos, this.Ypos, 25);
        } 
        if (this.health == 3){
            fill(99, 191, 80);
            circle(this.Xpos, this.Ypos, 25);
        }
        if (this.health == 4){
            fill(137,19,222)
            circle(this.Xpos, this.Ypos, 25);
        }
    }
    getXpos(){
        return this.Xpos
    } 
    getYpos(){
        return this.Ypos
    }
    getHealth(){
        return this.health
    }
    setHealth(newHealth) {
        this.health = newHealth;
    }
    atTileCenter(size) {
        return (Math.abs(this.Xpos % size - size/2) < this.speed &&
        Math.abs(this.Ypos % size - size/2) < this.speed);
    }
    move(PathPos, size) {
        // 1. Move a small step every frame
        if(this.direction === "right"){
            this.Xpos = this.Xpos + this.speed;
        }
        if(this.direction === "left") {
            this.Xpos = this.Xpos - this.speed;
        } 
        if(this.direction === "down") {
            this.Ypos = this.Ypos + this.speed;
        } 
        if(this.direction === "up") {
            this.Ypos = this.Ypos - this.speed;
        }
           
        // 2. Only check direction at tile center
        if(!this.atTileCenter(size)) return;

        let col = Math.floor(this.Xpos / size);
        let row = Math.floor(this.Ypos / size);
        let i = row * 10 + col;

        // 3. Decide new direction
        if(this.direction === "right"){
            if(PathPos[i+1] === 1){
                this.direction = "right";  // continue forward    
            }else if(PathPos[i+10] === 1) {
                this.direction = "down"; // turn down
            } else if(PathPos[i-10] === 1) {
                this.direction = "up";  // turn up
            }    
        }
        else if(this.direction === "down"){
            if(PathPos[i+10] === 1) {
                this.direction = "down";
            }else if(PathPos[i+1] === 1) {
                this.direction = "right";
            }else if(PathPos[i-1] === 1) {
                this.direction = "left";
            }
        }
        else if(this.direction === "up"){
            if(PathPos[i-10] === 1) {
                this.direction = "up";
            } else if(PathPos[i+1] === 1) {
                this.direction = "right";
            }else if(PathPos[i-1] === 1) {
                this.direction = "left";
            }
        }else if(this.direction === "left"){
            if(PathPos[i-1] === 1) {
                this.direction = "left";
            } else if(PathPos[i+10] === 1){
                this.direction = "down";
            } else if(PathPos[i-10] === 1) {
                this.direction = "up";
            }
    }   }
}

