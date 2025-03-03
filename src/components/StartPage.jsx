import Phaser from 'phaser';

export default class StartPage extends Phaser.Scene {
  constructor() {
    super({ key: 'StartPage' });
  }

  preload() {
    this.load.image('start-icon', '/assets/Utilities/play.png');
    this.load.image('instructions-icon', '/assets/Utilities/about.png');
    this.load.image('quit-icon', '/assets/Utilities/close.png');
    this.load.image('closebtn', '/assets/Utilities/close.png');
    this.load.image('button-bg', '/assets/Utilities/element-holderbg.png');
    this.load.image('rule-bg', '/assets/BackgroundAssets/Game3Rules.png');
    this.load.image('background', '/assets/BackgroundAssets/bgPage.png');
    this.load.audio('buttonTap', 'assets/audio/buttonTap.mp3');
  }

  create() {  
    // Add background
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'background'
    )
    .setOrigin(0.5)
    .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Create buttons
    this.createImageButton('start-icon', this.cameras.main.centerX - 400, 200, () => {
      // fetch('http://localhost:3000/increment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // In your StartPage.jsx scene
fetch('https://usergarden.vercel.app/api/increment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
      .then(response => response.json())
      .then(data => {
        console.log('Current count:', data.count);
        this.scene.start('SelectGardenType');
      })
      .catch(error => {
        console.error('Error logging play:', error);
        this.scene.start('SelectGardenType');
      });
    }, 'Play');
 
    this.createImageButton('instructions-icon', this.cameras.main.centerX - 400, 300, () => {
      this.showRules();
    }, 'Rules');

    this.createImageButton('quit-icon', this.cameras.main.centerX - 400, 400, () => {
      this.showQuitConfirmation();
    }, 'Quit');
  }

  createImageButton(imageKey, x, y, callback, labelText) {
    const buttonBg = this.add.image(x, y, 'button-bg')
      .setOrigin(0.5)
      .setDisplaySize(250, 60)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.play('buttonTap');
        callback();
      });

    const buttonImage = this.add.image(x - 100, y, imageKey)
      .setOrigin(0.5)
      .setScale(0.4)
      .setDisplaySize(60, 60)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.play('buttonTap');
        callback();
      });

    const buttonText = this.add.text(x + 10, y, labelText, {
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

    this.tweens.add({
      targets: [buttonImage, buttonBg, buttonText],
      alpha: { 
        from: 1,
        to: 0.7
      },
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  showRules() {
    const modalBg = this.add.image(this.cameras.main.centerX + 10, this.cameras.main.centerY, 'rule-bg')
      .setOrigin(0.5)
      .setDisplaySize(1000, 600)
      .setInteractive();

    const closeButton = this.add.image(this.cameras.main.centerX + 180, this.cameras.main.centerY - 200, 'closebtn')
      .setOrigin(0.5)
      .setInteractive()
      .setDisplaySize(50, 50)
      .on('pointerdown', () => {
        this.sound.play('buttonTap');
        modalBg.destroy();
        closeButton.destroy();
      });
  }

  showQuitConfirmation() {
    // Create dark overlay
    const modalBg = this.add.graphics();
    modalBg.fillStyle(0x000000, 0.7);
    modalBg.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

    // Add question text
    const questionText = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 40,
        'Are you sure?',
        { 
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold'
        }
    ).setOrigin(0.5);

    // Create Yes button
    const yesButton = this.add.image(
        this.cameras.main.centerX - 100,
        this.cameras.main.centerY + 40,
        'button-bg'
    )
    .setOrigin(0.5)
    .setDisplaySize(150, 50)
    .setInteractive()
    .on('pointerdown', () => {
        this.sound.play('buttonTap');
        window.location.href = 'http://games.rrbcea.org/';
    });

    const yesText = this.add.text(
        yesButton.x,
        yesButton.y,
        'Yes', 
        { 
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }
    ).setOrigin(0.5);

    // Create No button
    const noButton = this.add.image(
        this.cameras.main.centerX + 100,
        this.cameras.main.centerY + 40,
        'button-bg'
    )
    .setOrigin(0.5)
    .setDisplaySize(150, 50)
    .setInteractive()
    .on('pointerdown', () => {
        this.sound.play('buttonTap');
        modalBg.destroy();
        questionText.destroy();
        yesButton.destroy();
        yesText.destroy();
        noButton.destroy();
        noText.destroy();
    });

    const noText = this.add.text(
        noButton.x,
        noButton.y,
        'No', 
        { 
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }
    ).setOrigin(0.5);
  }
}