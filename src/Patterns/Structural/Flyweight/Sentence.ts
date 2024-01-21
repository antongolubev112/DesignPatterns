class WordToken {
    public capitalize: boolean = false;

    constructor(capitalize: boolean = false) {
        this.capitalize = capitalize;
    }
  }

class Sentence {
  private words: string[];
  private tokens: { [key: number]: WordToken };

  constructor(words: string[]) {
    this.words = words;
    this.tokens = {};
  }

  /*
      This method creates a new WordToken object and stores it in the tokens dictionary.
      This is the flyweight part of the pattern.
      Instead of creating a WordToken object for every word in the sentence, we create it only when we need it.
      If a token already exists, we return it and do not create a new one.
    */
  at(index: number): WordToken {
    let wt = new WordToken();
    this.tokens[index] = wt;
    return this.tokens[index];
  }

  toString(): string {
    let buffer: string[] = [];
    for (let i = 0; i < this.words.length; ++i) {
      let w = this.words[i];
      if (this.tokens[i] && this.tokens[i].capitalize) w = w.toUpperCase();
      buffer.push(w);
    }
    return buffer.join(" ");
  }
}


