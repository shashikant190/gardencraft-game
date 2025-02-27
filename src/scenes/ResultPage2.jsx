export default class ResultPage2 extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultPage2' });
  }

  preload() {
    this.load.image('societygardenBg1', '/assets/SocietyAssets/SocietyG.png');
    this.load.audio('buttonTap', 'assets/audio/buttonTap.mp3');
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

    this.load.image('societybackButton', '/assets/Utilities/prew.png');
  }

  create(data) {
    this.buttonTap = this.sound.add('buttonTap');
    const specialTrees = new Set(['societytree1','societytree4','societytree5','societytree7','societytree11','societytree12','societytree15','societytree16','societytree17','societytree18','societytree28']);

// Create full-screen background
const background = this.add.image(
  this.cameras.main.centerX,
  this.cameras.main.centerY,
  'societygardenBg1'
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
    const homeButton = this.add.image(50, 50, 'societybackButton')
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