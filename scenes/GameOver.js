// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class GameOver extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("gameover");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets

  }

  create() {
    // create game objects
    this.add.image(400, 300, "menubackground").setScale(0.5);
    this.add.image(400, 200, "gameoverImg").setScale(1);
    let retryButton = this.add.image(400, 350, "retry").setScale(0.7);
    let menuButton = this.add.image(400, 450, "menu").setScale(0.7);

    retryButton.setInteractive();
    retryButton.on("pointerup", ()=>
      this.scene.start("game")
    )

    menuButton.setInteractive();
    menuButton.on("pointerup", ()=>
      this.scene.start("menu")
    )
  }

  update() {
    // update game objects
    
    
  }

}

