export default class ResultPage3 extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultPage3' });
  }

  preload() {
    this.load.image('publicgardenBg1', '/assets/PublicAssets/public-t.png');
    this.load.audio('buttonTap', 'assets/audio/buttonTap.mp3');
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
    this.load.image('publictree19', '/assets/PublicAssets/images/501.png');
    this.load.image('publictree20', '/assets/SocietyAssets/images/pic38.png');
    this.load.image('publictree21', '/assets/PublicAssets/images/702.png');
    this.load.image('publictree22', '/assets/PublicAssets/images/409.png');
    this.load.image('publictree23', '/assets/PublicAssets/images/23.png');
    this.load.image('publictree24', '/assets/SocietyAssets/images/pic21.png');
    this.load.image('publictree25', '/assets/SocietyAssets/images/pic22.png');
    this.load.image('publictree26', '/assets/PublicAssets/images/26.png');
    this.load.image('publictree27', '/assets/PublicAssets/images/410.png');
    this.load.image('publictree28', '/assets/SocietyAssets/images/pic23.png');
    this.load.image('publicbackButton', '/assets/Utilities/prew.png');
  }

  create(data) {
    this.buttonTap = this.sound.add('buttonTap');
    const specialTrees = new Set(['publictree7','publictree19','publictree3','publictree4','publictree6','publictree8','publictree9','publictree10','publictree12','publictree14','publictree15','publictree16','publictree20','publictree21','publictree17','publictree22']);
    // const specialTrees = new Set(['publictree1', 'publictree3', 'publictree4', 'publictree7', 'publictree9','publictree10', 'publictree15', 'publictree16','publictree17', 'publictree18', 'publictree20', 'publictree22', 'publictree28']);
// Create full-screen background
const background = this.add.image(
  this.cameras.main.centerX,
  this.cameras.main.centerY,
  'publicgardenBg1'
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


    // Modified back button and home text
  const homeButton = this.add.image(50, 50, 'publicbackButton')
  .setInteractive()
  .setDisplaySize(40, 40)
  .on('pointerdown', () => {
    this.buttonTap.play();
    this.showFeedbackForm();
  });

const homeText = this.add.text(50 + 30, 50, 'Home', {
  fontSize: '28px',
  fill: '#fff',
  fontFamily: 'Arial',
  fontStyle: 'bold',
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

        // setTimeout(() => this.scene.start('SelectGardenType'), 3000);
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