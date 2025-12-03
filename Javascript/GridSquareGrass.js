class GridSquareGrass {
  constructor(size, Xposition, Yposition, path) {
    this.size = size;       // Size of the shape
    this.Xpos = Xposition;  // X position
    this.Ypos = Yposition; // Y position
    this.path = path;  
  }
  // Abstract method to be implemented by subclasses
  display() {
    if (this.path === 1) {
        fill(204, 201, 196) //grey path colour
        rect(this.Xpos, this.Ypos, this.size, this.size);
    } else {
        fill(9, 135, 62); // green colour
        rect(this.Xpos, this.Ypos, this.size, this.size)
    }
  }
} 