// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
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
    this.add.image(400, 300, "sky").setScale(2);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(200, 350, "ground").setScale(0.5).refreshBody();
    this.platforms.create(600, 350, "ground").setScale(0.5).refreshBody();

    this.player = this.physics.add.sprite(100, 450, "ninja").setScale(0.1);
    this.player.setBounce(0.1);

    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); 
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.physics.add.collider(this.player, this.platforms);

    this.triangle = this.physics.add.group();
    this.square = this.physics.add.group();
    this.diamond = this.physics.add.group();
    this.bomb = this.physics.add.group();

    this.physics.add.collider(this.triangle, this.platforms, this.handleTriangleBounce, null, this);
    this.physics.add.collider(this.square, this.platforms, this.handleSquareBounce, null, this);
    this.physics.add.collider(this.diamond, this.platforms, this.handleDiamondBounce, null, this);
    this.physics.add.collider(this.bomb, this.platforms);


    this.score = 0;

    this.triangleCon = 0;
    this.squareCon = 0;
    this.diamondCon = 0;

    


    this.loop = true;
    this.finishloop = true;

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.timer = 30;
    this.timerText = this.add.text(16, 64, `Tiempo: ${this.timer}s`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.add.image(32, 122, "triangle").setScale(0.5);
    this.triangleText = this.add.text(64, 112, `x ${this.triangleCon}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.add.image(32, 169, "square").setScale(0.5);
    this.squareText = this.add.text(64, 160, `x ${this.squareCon}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.add.image(32, 216, "diamond").setScale(0.5);
    this.diamondText = this.add.text(64, 208, `x ${this.diamondCon}`, {
      fontSize: "32px",
      fill: "#000",
    });

    let varTimer = 1000;

    this.time.addEvent({
      delay: varTimer, 
      callback: () => { 
        this.randomObjects()
      },
      callbackScope: this, 
      loop: this.finishloop, 
    });
    
    this.time.addEvent({
      delay: 1000, 
      callback: () => { 
        if (this.timer > 0) {
          this.timer --;
          this.timerText.setText(`Tiempo: ${this.timer }s`);
        } else {
            this.finishloop = false;
            this.GameOver(); 
          }
        },
      callbackScope: this, 
      loop: this.finishloop, 
    });

    this.physics.add.overlap(
      this.player,
      this.triangle,
      this.collectTriangle,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.square,
      this.collectSquare,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.diamond,
      this.collectDiamond,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.bomb,
      this.collectBomb,
      null,
      this
    );

    

  }

  update() {
    // update game objects
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
    } 
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
    } 
    else {
      this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (this.keyA.isDown) {
      this.player.setVelocityX(-250);
    } 
    else if (this.keyD.isDown) {
      this.player.setVelocityX(250);
    } 
    if (this.keyW.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (this.score >= 100){
      this.GameWin();
    }
    
    if (this.triangleCon >= 2 && this.squareCon >= 2 && this.diamondCon >= 2) {
      this.GameWin();
    }
    
  }

randomObjects() 
{
  let random2 = Phaser.Math.Between(20, 780);
  let type = Phaser.Math.Between(1, 4);
  
  if (type === 1) {
    let newTriangle = this.triangle.create(random2, 0, "triangle").setScale(0.5);
    newTriangle.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    newTriangle.setCollideWorldBounds(true);
    newTriangle.scoreValue = 10;
    newTriangle.hitGround = false;
  } else if (type === 2) {
    let newSquare = this.square.create(random2, 0, "square").setScale(0.5);
    newSquare.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    newSquare.setCollideWorldBounds(true);
    newSquare.scoreValue = 15;
    newSquare.hitGround = false;
  } else if (type === 3) {
    let newDiamond = this.diamond.create(random2, 0, "diamond").setScale(0.5);
    newDiamond.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    newDiamond.setCollideWorldBounds(true);
    newDiamond.scoreValue = 20;
    newDiamond.hitGround = false;
  } else {
    let newBomb = this.bomb.create(random2, 0, "bomb").setScale(1.5);
    newBomb.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
  }
}

GameOver()
{
  this.scene.start("gameover")
}

GameWin()
{
  this.scene.start("gamewin")
}

collectTriangle(player, triangle) 
{
  if (triangle.scoreValue > 0) {
    this.score += triangle.scoreValue;
    this.scoreText.setText(`Score: ${this.score}`);
    this.triangleCon += 1;
    this.triangleText.setText(`x ${this.triangleCon}`);
  }

  triangle.disableBody(true, true);
}

collectSquare(player, square) 
{
  if (square.scoreValue > 0) {
    this.score += square.scoreValue;
    this.scoreText.setText(`Score: ${this.score}`);
    this.squareCon += 1;
    this.squareText.setText(`x ${this.squareCon}`);
  }

  square.disableBody(true, true);
}

collectDiamond(player, diamond) 
{
  if (diamond.scoreValue > 0) {
    this.score += diamond.scoreValue;
    this.scoreText.setText(`Score: ${this.score}`);
    this.diamondCon += 1;
    this.diamondText.setText(`x ${this.diamondCon}`);
  }

  diamond.disableBody(true, true);
}

collectBomb(player, bomb) 
{
  bomb.disableBody(true, true);
  this.score -= 15;
  this.scoreText.setText(`Score: ${this.score}`);
}

handleTriangleBounce(triangle, platform) 
{
if (!triangle.body.touching.down || triangle.hitGround) return;

triangle.hitGround = true;

this.time.delayedCall(100, () => {
  triangle.hitGround = false;
});

if (triangle.scoreValue !== undefined) {
  triangle.scoreValue -= 5;

  if (triangle.scoreValue <= 0) {
    triangle.disableBody(true, true);
  }
}
}

handleSquareBounce(square, platform) 
{
if (!square.body.touching.down || square.hitGround) return;

square.hitGround = true;

this.time.delayedCall(100, () => {
  square.hitGround = false;
});

if (square.scoreValue !== undefined) {
  square.scoreValue -= 5;

  if (square.scoreValue <= 0) {
    square.disableBody(true, true);
  }
}
}

handleDiamondBounce(diamond, platform) 
{
if (!diamond.body.touching.down || diamond.hitGround) return;

diamond.hitGround = true;

this.time.delayedCall(100, () => {
  diamond.hitGround = false;
});

if (diamond.scoreValue !== undefined) {
  diamond.scoreValue -= 5;

  if (diamond.scoreValue <= 0) {
    diamond.disableBody(true, true);
  }
}
}

}

