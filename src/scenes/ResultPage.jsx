export default class ResultPage extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultPage' });
    this.selectedRating = null;
  }

  preload() {
    this.load.audio('buttonTap', 'assets/audio/buttonTap.mp3');
    // Load all required images
    this.load.image('terracetree1', '/assets/TerraceAssets/images/image80.png');
    this.load.image('terracetree2', '/assets/TerraceAssets/images/2.png');
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
    this.load.image('terracebackButton', '/assets/Utilities/prew.png');
    this.load.image('terracegardenBg1', '/assets/TerraceAssets/T.png');
  }

  create(data) {
    this.buttonTap = this.sound.add('buttonTap');
    const specialTrees = new Set(['terracetree5','terracetree10','terracetree15','terracetree23','terracetree25']);

    // Create full-screen background
    const background = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'terracegardenBg1'
    ).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Calculate positioning parameters
    const originalBounds = data.designData.mainImageBounds;
    const bgScaledWidth = this.cameras.main.width;
    const bgScaledHeight = this.cameras.main.height;
    const bgTopLeftX = this.cameras.main.centerX - bgScaledWidth/2;
    const bgTopLeftY = this.cameras.main.centerY - bgScaledHeight/2;
    const scaleX = bgScaledWidth / originalBounds.width;
    const scaleY = bgScaledHeight / originalBounds.height;

    // Position elements with corrected scaling and offsets
    data.designData.elements.forEach(element => {
      const relX = element.x - originalBounds.x;
      const relY = element.y - originalBounds.y;
      
      const newX = bgTopLeftX + (relX * scaleX);
      const newY = bgTopLeftY + (relY * scaleY);

      const newElement = this.add.image(newX, newY, element.texture)
        .setDisplaySize(
          element.displayWidth * scaleX * 1.5,
          element.displayHeight * scaleY * 1.5
        )
        .setDepth(element.depth);

      if(specialTrees.has(element.texture)) {
        newElement.setDisplaySize(
          192 * scaleX * 1.5,
          192 * scaleY * 1.5
        );
      }
    });

    // Add UI elements
    const homeButton = this.add.image(50, 50, 'terracebackButton')
      .setInteractive()
      .setDisplaySize(40, 40)
      .on('pointerdown', () => {
        this.buttonTap.play();
        this.showFeedbackForm();
      });

    this.add.text(80, 50, 'Home', {
      fontSize: '28px',
      fill: '#fff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5)
    .setInteractive()
    .on('pointerdown', () => {
      this.buttonTap.play();
      this.showFeedbackForm();
    });
  }
  
  showFeedbackForm() {
    // Create overlay background
    const overlay = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.7
    ).setDepth(1000);
  
    // Create feedback container
    const feedbackContainer = this.add.container(0, 0).setDepth(1001);
    
    // Add rating question
    const questionText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 150,
      'How would you rate your experience?',
      { fontSize: '32px', fill: '#ffffff', fontFamily: 'Arial' }
    ).setOrigin(0.5);
    feedbackContainer.add(questionText);
  
    // Create rating options
    const ratings = ['Love it!', 'Good', 'Needs improvement'];
    const optionTexts = [];
    
    ratings.forEach((rating, index) => {
      const y = questionText.y + 100 + (index * 80);
      const text = this.add.text(
        this.cameras.main.centerX,
        y,
        rating,
        { fontSize: '28px', fill: '#ffffff', fontFamily: 'Arial' }
      )
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.buttonTap.play();
          this.selectedRating = rating;
          optionTexts.forEach(t => t.setFill('#ffffff'));
          text.setFill('#ffeb3b');
        });
      
      optionTexts.push(text);
      feedbackContainer.add(text);
    });
  
    // Position for buttons at the bottom center
    const buttonY = this.cameras.main.height - 100; // Adjust this value to move buttons up/down
    const buttonSpacing = 200; // Space between buttons
  
    // Add submit button background
    const submitBg = this.add.image(
      this.cameras.main.centerX - buttonSpacing / 2,
      buttonY,
      'button-bg'
    )
      .setOrigin(0.5)
      .setDisplaySize(160, 50)
      .setInteractive()
      .on('pointerdown', async () => {
        this.buttonTap.play();
        if (this.selectedRating) {
          // Ensure previous loading text is removed before showing new text
          if (this.loadingText) {
            this.loadingText.destroy();
          }
  
          // Add visible loading text
          this.loadingText = this.add.text(
            this.cameras.main.centerX,
            submitBg.y + 80,
            'Submitting feedback...',
            { fontSize: '24px', fill: '#ffffff', fontFamily: 'Arial', backgroundColor: '#000000' }
          ).setOrigin(0.5).setDepth(1003);
  
          try {
            const templateParams = {
              rating: this.selectedRating,
              page_url: window.location.href,
              timestamp: new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'long'
              })
            };
  
            await emailjs.send('service_wm3xg5y', 'template_v4cnges', templateParams);
  
            this.loadingText.setText('Thanks for your feedback!')
              .setFill('#00ff00')
              .setBackgroundColor('#000000');
  
              setTimeout(() => window.location.reload(), 3000);
          } catch (error) {
            console.error('Failed to send feedback:', error);
            this.loadingText.setText('Failed to submit feedback. Please try again.')
              .setFill('#ff0000')
              .setBackgroundColor('#000000');
            setTimeout(() => this.loadingText.destroy(), 4000);
          }
        }
      });
  
    // Add submit button text on top of the background
    const submitButton = this.add.text(
      submitBg.x,
      submitBg.y,
      'SUBMIT',
      { fontSize: '28px', fill: '#ffffff', fontFamily: 'Arial' }
    )
      .setOrigin(0.5)
      .setDepth(1002);
  
    // Skip Button Background
    const skipBg = this.add.image(
      this.cameras.main.centerX + buttonSpacing / 2,
      buttonY,
      'button-bg'
    )
      .setOrigin(0.5)
      .setDisplaySize(160, 50)
      .setInteractive()
      .on('pointerdown', () => {
        this.buttonTap.play();
        // this.scene.start('SelectGardenType');
        window.location.reload();
      });
  
    // Skip Button Text
    const skipButton = this.add.text(
      skipBg.x,
      skipBg.y,
      'SKIP',
      { fontSize: '28px', fill: '#ffffff', fontFamily: 'Arial' }
    )
      .setOrigin(0.5)
      .setDepth(1002);
  
    feedbackContainer.add(submitBg);
    feedbackContainer.add(submitButton);
    feedbackContainer.add(skipBg);
    feedbackContainer.add(skipButton);
  }}