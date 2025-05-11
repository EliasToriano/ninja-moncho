// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class GameWin extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("gamewin");
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
    this.add.image(400, 200, "youwinImg").setScale(1);
    let menuButton = this.add.image(400, 350, "menu").setScale(0.7);

    menuButton.setInteractive();
    menuButton.on("pointerup", ()=>
      this.scene.start("menu")
    )
  }

  update() {
    // update game objects
    
    
  }

}

