// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Menu extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("menu");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("menubackground", "./public/assets/FondoMenu.jpg");
    this.load.image("logo", "./public/assets/logo.png");
    this.load.image("play", "./public/assets/play.png");
    this.load.image("retry", "./public/assets/retry.png");
    this.load.image("menu", "./public/assets/menu.png");
    this.load.image("sky", "./public/assets/Cielo.webp");
    this.load.image("ground", "./public/assets/platform.png");
    this.load.image("triangle", "./public/assets/triangle.png");
    this.load.image("square", "./public/assets/square.png");
    this.load.image("diamond", "./public/assets/diamond.png");
    this.load.image("bomb", "./public/assets/bomb.png");
    this.load.image("ninja", "./public/assets/Ninja.png");
    this.load.image("gameoverImg", "./public/assets/gameoverImg.png");
    this.load.image("youwinImg", "./public/assets/youwinImg.png");
  }
  

  create() {
    // create game objects
    this.add.image(400, 300, "menubackground").setScale(0.5);
    this.add.image(400, 225, "logo").setScale(1);
    let playButton = this.add.image(400, 400, "play").setScale(0.7);

    playButton.setInteractive();
    playButton.on("pointerup", ()=>
      this.scene.start("game")
    )
  }

  update() {
    // update game objects
    
    
  }

}

