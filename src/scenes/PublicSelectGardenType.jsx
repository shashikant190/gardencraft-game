import Phaser from 'phaser';

export default class PublicSelectGardenType extends Phaser.Scene {
  constructor() {
    super({ key: 'PublicSelectGardenType' });
  }

  preload() {
    this.load.image('background1', '/assets/BackgroundAssets/bgPage21.jpg');
    this.load.image('button-bg', '/assets/Utilities/element-holderbg.png');
    this.load.image('previous-icon', '/assets/Utilities/prew.png');
    this.load.audio('buttonTap', 'assets/audio/buttonTap.mp3');
  }

  create() {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background1')
      .setOrigin(0.5)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Back button with sound effect
    const backButton = this.add.image(100, 50, 'previous-icon')
      .setDisplaySize(40, 40)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.play('buttonTap');
        this.scene.start('StartPage');
      });

    this.add.text(140, 50, 'Back', {
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold',
    })
      .setOrigin(0, 0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.play('buttonTap');
        this.scene.start('StartPage');
      });

    const centerX = this.cameras.main.centerX;
    const buttonYStart = this.cameras.main.centerY - 10;

    // Garden type buttons with sound effects
    this.createButton(centerX, buttonYStart + 0 * 100, 'Terrace Garden', () => {
      this.sound.play('buttonTap');
      this.scene.start('TerraceGardenDesign');
    });

    this.createButton(centerX, buttonYStart + 1 * 100, 'Society Garden', () => {
      this.sound.play('buttonTap');
      this.scene.start('SocietyGardenDesign');
    });

    this.createButton(centerX, buttonYStart + 2 * 100, 'Public Garden', () => {
      this.sound.play('buttonTap');
      this.scene.start('PublicGardenDesign');
    });
  }

  createButton(x, y, labelText, callback) {
    // Button background with click handler
    const buttonBg = this.add.image(x, y, 'button-bg')
      .setOrigin(0.5)
      .setDisplaySize(300, 60)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.play('buttonTap');
        callback();
      });

    // Button text
    const buttonText = this.add.text(x, y, labelText, {
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.play('buttonTap');
        callback();
      });

    // Blinking animation for both elements
    this.tweens.add({
      targets: [buttonBg, buttonText],
      alpha: { from: 1, to: 0.7 },
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
}