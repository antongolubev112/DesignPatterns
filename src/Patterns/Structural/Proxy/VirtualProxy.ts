class Image {
  url: string;

  constructor(url: string) {
    this.url = url;
    console.log(`Loading image from ${this.url}`);
  }

  //if draw if never called, we waste computational resources because we load the image from the url in the constructor.
  draw() {
    console.log(`Drawing image ${this.url}`);
  }
}

/*
      We create a proxy class that will be used instead of the real Image class.
      The proxy class will only load the image when it is needed - when draw() is called.
  */
class LazyImage {
  url: string;
  image?: Image;

  constructor(url: string) {
    this.url = url;
  }

  draw() {
    if (!this.image) this.image = new Image(this.url);
    this.image.draw();
  }
}

function drawImage(img: LazyImage) {
  console.log("About to draw the image");
  img.draw();
  console.log("Done drawing the image");
}

let img = new LazyImage("http://pokemon.com/pikachu.png");
drawImage(img);
