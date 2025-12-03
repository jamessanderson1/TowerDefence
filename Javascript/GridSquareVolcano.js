class GridSquareVolcano{
    constructor(size, Xposition, Yposition, path) {
      this.size = size;       // Size of the shape 
      this.Xpos = Xposition;  // X position
      this.Ypos = Yposition; // Y position
      this.path = path;  
    }
    // Abstract method to be implemented by subclasses
    display() { // function called to display grid square
      if (this.path === 1) {
          fill(255, 102, 0) // oragne path colour
          rect(this.Xpos, this.Ypos, this.size, this.size);
      } else {
          fill(69, 54, 43); // brown colour
          rect(this.Xpos, this.Ypos, this.size, this.size)
      }
    }
  } 