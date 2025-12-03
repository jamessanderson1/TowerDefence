class GridSquareIce{
    constructor(size, Xposition, Yposition, path) {
      this.size = size;       // Size of the shape 
      this.Xpos = Xposition;  // X position
      this.Ypos = Yposition; // Y position
      this.path = path;  
    }
    // Abstract method to be implemented by subclasses
    display() { // functions called to display grid sqaure
      if (this.path === 1) {
          fill(228, 237, 237) // white path colour
          rect(this.Xpos, this.Ypos, this.size, this.size);
      } else {
          fill(111, 231, 237); // blue colour
          rect(this.Xpos, this.Ypos, this.size, this.size)
      }
    }
  } 