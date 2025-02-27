import Phaser from 'phaser';

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  preload() {
    // Load the background image
    this.load.image('loadingBackground', '/assets/BackgroundAssets/bgPage.png');
    this.load.image('loadingBarImg', '/assets/utilities/LoadingBarImg.png');

  }

  create() {
    // Add the background image immediately
    const bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'loadingBackground');
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Setup progress bar and text
    this.createProgressBar();
    this.createPercentageText();

    // Now load the rest of the game assets
    this.loadGameAssets();

    // Set up progress event listeners for the secondary load
    this.load.on('progress', (value) => {
      this.updateProgressBar(value);
      this.updatePercentageText(value);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressText.destroy();
      this.scene.start('StartPage');
    });

    // Start loading the queued assets
    this.load.start();
  }

  createProgressBar() {
    const { width, height } = this.scale;
    this.progressBar = this.add.graphics();
    this.progressBar.fillStyle(0xffffff, 1);
    this.progressBar.fillRect(width * 0.1, height - 50, 0, 30); // Position at the bottom
  }

  createPercentageText() {
    const { width, height } = this.scale;
    this.progressText = this.add.text(width / 2, height - 30, '', {  // Changed initial text
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#000000',  // Fixed color typo (changed from #000000s)
      align: 'center'
    }).setOrigin(0.5);
}

  updateProgressBar(progress) {
    const { width } = this.scale;
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    this.progressBar.fillRect(
      width * 0.1,
      this.scale.height - 50,
      (width * 0.8) * progress,
      30
    );
  }

  updatePercentageText(progress) {
    const percentage = Math.floor(progress * 100);
    this.progressText.setText(`Loading Game... ${percentage}%`);  // Added prefix text
}

loadGameAssets() {
    // Load all other game assets here
    // Add this line to load your music file
    this.load.audio('gameMusic', '/assets/audio/game-music.mp3'); 
    // this.load.audio('buttonTap', 'assets/audio/buttonTap.mp3');
    // Load all game assets here
    this.load.image('terracebackground', '/assets/BackgroundAssets/bgPage2.png');
    this.load.image('terracegardenBg', '/assets/TerraceAssets/T.png');
    this.load.image('terraceelementHolderBg', '/assets/Utilities/blue-theme.png');
    this.load.image('terracesquarePlaceholder', '/assets/Utilities/element-placeholder.png');
    this.load.image('terracebutton-bg', '/assets/Utilities/element-holderbg.png');

    // Load tree images
    // Load tree images
    this.load.image('terracetree1', '/assets/TerraceAssets/images/image80.png');
    this.load.image('terracetree2', '/assets/TerraceAssets/images/2.png');
    // this.load.image('terracetree3', '/assets/TerraceAssets/images/3.png');
    this.load.image('terracetree3', '/assets/TerraceAssets/images/205.png');
    this.load.image('terracetree4', '/assets/TerraceAssets/images/4.png');
    this.load.image('terracetree5', '/assets/TerraceAssets/images/202.png');
    this.load.image('terracetree6', '/assets/TerraceAssets/images/208.png');
    this.load.image('terracetree7', '/assets/TerraceAssets/images/206.png');
    this.load.image('terracetree8', '/assets/TerraceAssets/images/11.png');
    this.load.image('terracetree9', '/assets/TerraceAssets/images/9.png');
    this.load.image('terracetree10', '/assets/TerraceAssets/images/10.png');
    this.load.image('terracetree11', '/assets/SocietyAssets/images/pic3.png');
    this.load.image('terracetree12', '/assets/TerraceAssets/images/7.png');
    this.load.image('terracetree13', '/assets/TerraceAssets/images/13.png');
    this.load.image('terracetree14', '/assets/TerraceAssets/images/14.png');
    this.load.image('terracetree15', '/assets/TerraceAssets/images/211.png');
    this.load.image('terracetree16', '/assets/TerraceAssets/images/17.png');
    this.load.image('terracetree17', '/assets/TerraceAssets/images/18.png');
    this.load.image('terracetree18', '/assets/TerraceAssets/images/19.png');
    this.load.image('terracetree19', '/assets/TerraceAssets/images/20.png');
    this.load.image('terracetree20', '/assets/TerraceAssets/images/63.png');
    this.load.image('terracetree21', '/assets/TerraceAssets/images/25.png');
    this.load.image('terracetree22', '/assets/TerraceAssets/images/209.png');
    this.load.image('terracetree23', '/assets/TerraceAssets/images/umbrella.png');
    this.load.image('terracetree24', '/assets/TerraceAssets/images/34.png');
    this.load.image('terracetree25', '/assets/TerraceAssets/images/220.png');
    this.load.image('terracetree26', '/assets/TerraceAssets/images/212.png');
    this.load.image('terracetree27', '/assets/TerraceAssets/images/201.png');
    this.load.image('terracetree28', '/assets/TerraceAssets/images/62.png');

    this.load.image('terracebackButton', '/assets/Utilities/home.png');
    this.load.image('terracefinishButton', '/assets/Utilities/close.png');
    this.load.image('terracecheckButton', '/assets/Utilities/check.png');
    this.load.image('terracecancelButton', '/assets/Utilities/cancel.png');
    this.load.image('terracetimer-clock', '/assets/Utilities/clock.png');
    this.load.image('terracecursor-hand', '/assets/Utilities/right-click.png');

    this.load.image('societybackground', '/assets/BackgroundAssets/bgPage2.png');
    this.load.image('societygardenBg', '/assets/SocietyAssets/SocietyG.png');
    this.load.image('societysquarePlaceholder', '/assets/Utilities/element-placeholder.png');

    // Load tree images
    this.load.image('societytree1', '/assets/SocietyAssets/images/pic1.png');
    this.load.image('societytree2', '/assets/SocietyAssets/images/pic2.png');
    this.load.image('societytree3', '/assets/SocietyAssets/images/pic3.png');
    this.load.image('societytree4', '/assets/SocietyAssets/images/pic4.png');
    this.load.image('societytree5', '/assets/SocietyAssets/images/305.png');
    this.load.image('societytree6', '/assets/SocietyAssets/images/pic6.png');
    this.load.image('societytree7', '/assets/SocietyAssets/images/pic29.png');
    this.load.image('societytree8', '/assets/SocietyAssets/images/pic8.png');
    this.load.image('societytree9', '/assets/SocietyAssets/images/pic9.png');
    this.load.image('societytree10', '/assets/SocietyAssets/images/309.png');
    this.load.image('societytree11', '/assets/PublicAssets/images/405.png');
    this.load.image('societytree12', '/assets/SocietyAssets/images/pic42.png');
    this.load.image('societytree13', '/assets/SocietyAssets/images/pic13.png');
    this.load.image('societytree14', '/assets/SocietyAssets/images/pic14.png');
    this.load.image('societytree15', '/assets/SocietyAssets/images/303.png');
    this.load.image('societytree16', '/assets/SocietyAssets/images/311.png');
    this.load.image('societytree17', '/assets/SocietyAssets/images/308.png');
    this.load.image('societytree18', '/assets/SocietyAssets/images/307.png');
    this.load.image('societytree19', '/assets/SocietyAssets/images/301.png');
    this.load.image('societytree20', '/assets/SocietyAssets/images/304.png');
    this.load.image('societytree21', '/assets/SocietyAssets/images/pic21.png');
    this.load.image('societytree22', '/assets/SocietyAssets/images/pic22.png');
    this.load.image('societytree23', '/assets/SocietyAssets/images/pic23.png');
    this.load.image('societytree24', '/assets/SocietyAssets/images/pic24.png');
    this.load.image('societytree25', '/assets/SocietyAssets/images/pic25.png');
    this.load.image('societytree26', '/assets/SocietyAssets/images/pic26.png');
    this.load.image('societytree27', '/assets/SocietyAssets/images/pic27.png');
    this.load.image('societytree28', '/assets/SocietyAssets/images/306.png');


    this.load.image('societybackButton', '/assets/Utilities/home.png');
    this.load.image('societyfinishButton', '/assets/Utilities/close.png');
    this.load.image('societycheckButton', '/assets/Utilities/check.png');
    this.load.image('societycancelButton', '/assets/Utilities/cancel.png');
    this.load.image('societytimer-clock', '/assets/Utilities/clock.png');
    this.load.image('societycursor-hand', '/assets/Utilities/right-click.png');

    this.load.image('publicbackground', '/assets/BackgroundAssets/bgPage2.png');
    this.load.image('publicgardenBg', '/assets/PublicAssets/public-t.png');
    this.load.image('publicsquarePlaceholder', '/assets/Utilities/element-placeholder.png');

   // Load tree images
   this.load.image('publictree1', '/assets/SocietyAssets/images/pic3.png');
   this.load.image('publictree2', '/assets/PublicAssets/images/2.png');
   this.load.image('publictree3', '/assets/PublicAssets/images/3.png');
   this.load.image('publictree4', '/assets/SocietyAssets/images/pic4.png');
   this.load.image('publictree5', '/assets/PublicAssets/images/5.png');
   this.load.image('publictree6', '/assets/PublicAssets/images/6.png');
   this.load.image('publictree7', '/assets/PublicAssets/images/701.png');
   this.load.image('publictree8', '/assets/PublicAssets/images/8.png');
   this.load.image('publictree9', '/assets/PublicAssets/images/9.png');
   this.load.image('publictree10', '/assets/PublicAssets/images/10.png');
   this.load.image('publictree11', '/assets/PublicAssets/images/408.png');
   this.load.image('publictree12', '/assets/SocietyAssets/images/311.png');
   this.load.image('publictree13', '/assets/SocietyAssets/images/pic2.png'); //pic8, pic21, pic23
   this.load.image('publictree14', '/assets/PublicAssets/images/14.png');
   this.load.image('publictree15', '/assets/PublicAssets/images/405.png');
   this.load.image('publictree16', '/assets/PublicAssets/images/16.png');
   this.load.image('publictree17', '/assets/PublicAssets/images/17.png');
   this.load.image('publictree18', '/assets/SocietyAssets/images/pic8.png');
   this.load.image('publictree19', '/assets/PublicAssets/images/402.png');
   this.load.image('publictree20', '/assets/SocietyAssets/images/pic38.png');
   this.load.image('publictree21', '/assets/PublicAssets/images/702.png');
   this.load.image('publictree22', '/assets/PublicAssets/images/409.png');
   this.load.image('publictree23', '/assets/PublicAssets/images/23.png');
   this.load.image('publictree24', '/assets/SocietyAssets/images/pic21.png');
   this.load.image('publictree25', '/assets/SocietyAssets/images/pic22.png');
   this.load.image('publictree26', '/assets/PublicAssets/images/26.png');
   this.load.image('publictree27', '/assets/PublicAssets/images/410.png');
   this.load.image('publictree28', '/assets/SocietyAssets/images/pic23.png');

    this.load.image('publicbackButton', '/assets/Utilities/home.png');
    this.load.image('publicfinishButton', '/assets/Utilities/close.png');
    this.load.image('publiccheckButton', '/assets/Utilities/check.png');
    this.load.image('publiccancelButton', '/assets/Utilities/cancel.png');
    this.load.image('publictimer-clock', '/assets/Utilities/clock.png');
    this.load.image('publiccursor-hand', '/assets/Utilities/right-click.png');
    // ... (Keep all other asset loading calls from the original preload method here)

    // Add your loading bar assets
    this.createProgressBar();
    this.createPercentageText();

    

    this.load.on('progress', (value) => {
      this.updateProgressBar(value);
      this.updatePercentageText(value);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressText.destroy();
      this.scene.start('StartPage');
      
      // Add music playback here
      const music = this.sound.add('gameMusic', {
        loop: true,
        volume: 0.5 // Adjust volume as needed
      });
      music.play();
    });
  }
}