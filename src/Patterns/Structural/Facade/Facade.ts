class Buffer {
    write(text: string, pos: number): void {
      // Implementation not shown
    }
  
    [index: number]: string;
  }
  
  class Viewport {
    buffer: Buffer;
    offset: number = 0;
  
    constructor(buffer: Buffer) {
      this.buffer = buffer;
    }
  
    // high-level
    append(text: string, pos: number): void {
      this.buffer.write(text, pos + this.offset);
    }
  
    getCharAt(index: number): string {
      return this.buffer[this.offset + index];
    }
  }
  
  /*
      Facade class, which provides a simple interface to a complex subsystem (the Buffer and Viewport classes).
  */
  class Console {
    buffer: Buffer;
    currentViewport: Viewport;
    buffers: Buffer[];
    viewports: Viewport[];
  
    constructor() {
      this.buffer = new Buffer();
      this.currentViewport = new Viewport(this.buffer);
      this.buffers = [this.buffer];
      this.viewports = [this.currentViewport];
    }
  
    // high-level
    write(text: string): void {
        this.currentViewport.buffer.write(text, this.currentViewport.offset);
    }

    // low-level
    getCharAt(index: number): string {
        return this.currentViewport.getCharAt(index);
    }
  }
  
  let c = new Console();
  c.write('hello');
  let ch = c.getCharAt(0);