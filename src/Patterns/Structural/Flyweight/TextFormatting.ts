class TextRange {
    start: number;
    end: number;
    capitalize: boolean = false;
  
    constructor(start: number, end: number) {
      this.start = start;
      this.end = end;
    }
  
    covers(position: number): boolean {
      return position >= this.start && position <= this.end;
    }
  }
  
  class FormattedText {
    plainText: string;
    capitalise: boolean[];
  
    constructor(plainText: string) {
      this.plainText = plainText;
      this.capitalise = new Array(plainText.length);
    }
  
    capitalize(start: number, end: number): void {
      for (let i = start; i <= end; ++i) {
        this.capitalise[i] = true;
      }
    }
  
    toString(): string {
        let buffer = [];
        for (let c of this.plainText) {
            if (this.capitalize[this.plainText.indexOf(c)]) {
                c = c.toUpperCase();
            }
            buffer.push(c);
        }
        return buffer.join('');
    }
  }
  
  class BetterFormattedText {
    private plainText: string;
    private formatting: TextRange[] = [];
  
    constructor(plainText: string) {
      this.plainText = plainText;
    }
  
    getRange(start: number, end: number): TextRange {
      let range = new TextRange(start, end);
      this.formatting.push(range);
      return range;
    }
  
    toString(): string {
        let buffer = [];
        for (let c of this.plainText) {
            for (let range of this.formatting) {
                if (range.covers(this.plainText.indexOf(c)) && range.capitalize)
                    c = c.toUpperCase();
            }
            buffer.push(c);
        }
        return buffer.join('');
    }
  }
  
  /*
      Brute force approach to capitalize text.
      This approach is memory intensive and not very efficient.
  */
  const text = 'This is a brave new world';
  let ft = new FormattedText(text);
  ft.capitalize(10, 15);
  console.log(ft.toString());
  
  /*
      Flyweight approach to capitalize text.
      This approach is memory efficient and more efficient.
  
      This is because instead of storing a boolean for every character in the text which takes a lot of memory
      we are storing the start and end of the text and the formatting options for that text.
  */
  let bft = new BetterFormattedText(text);
  bft.getRange(16, 19).capitalize = true;
  console.log(bft.toString());