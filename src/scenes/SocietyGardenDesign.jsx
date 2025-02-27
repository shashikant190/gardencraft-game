export default class SocietyGardenDesign extends Phaser.Scene {
  constructor() {
    super({ key: 'SocietyGardenDesign' });
    this.elements = [];
    this.mainImageHolder = null;
    this.finalDesign = null;
    this.availableCopies = new Map();
    this.droppedElements = new Map();
    this.timerEvent = null;
    this.timeText = null;
    this.timeLeft = 300;
    this.currentDepth = 1; // Add this line
    this.treeNames = [
      "Rippling Oasis", "Triostar", "Birdbath", "Seesaw", "Water body", "Flower", "L design", "Big Tree",
      "PolygonDesign", "Flowers", "Swing", "Bush", "Boy", "Ivy Plant", "Gazebo", "Slide",
      "Bench", "Fountain", "Garden Lamps", "Compost area", "GreenBush", "RoundedBush", "Palm Tree", "Fern",
      "Plant", "S path", "Circle Table", "Rock garden", "Cypress", "Juniper"
    ];
    this.specialTrees = new Set(['societytree1','societytree4','societytree5','societytree7','societytree11','societytree12','societytree15','societytree16','societytree17','societytree18','societytree28']);
    // this.specialTrees = new Set(['societytree18','societytree9','societytree5', 'societytree7', 'societytree19','societytree1','societytree3','societytree28','societytree4','societytree11','societytree12','societytree10','societytree28']);
  } 

  preload() {
    this.load.image('societybackground', '/assets/BackgroundAssets/bgPage2.png');
    this.load.image('societygardenBg', '/assets/SocietyAssets/SocietyG.png');
    // this.load.image('elementHolderBg', '/assets/Utilities/blue-theme.png');
    this.load.image('societysquarePlaceholder', '/assets/Utilities/element-placeholder.png');
    this.load.audio('buttonTap', 'assets/audio/buttonTap.mp3');
    this.load.audio('dragSound', 'assets/audio/dragSound.mp3');
    this.load.audio('timeOver', 'assets/audio/timeOver.mp3');
    this.load.audio('checkSound', 'assets/audio/checkSound.mp3');
    this.load.audio('cancelSound', 'assets/audio/cancelSound.mp3');
    // Load tree images
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
    
  }

  create() {

    this.buttonTap = this.sound.add('buttonTap');
    this.dragSound = this.sound.add('dragSound');
    this.timeOver = this.sound.add('timeOver');
    this.checkSound = this.sound.add('checkSound');
    this.cancelSound = this.sound.add('cancelSound');

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'societybackground')
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    const menuBarHeight = this.createMenuBar();
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
    const holderWidth = 300 * 0.7;

    // Create element holders
    this.createElementHolder(holderWidth / 2, menuBarHeight + (screenHeight - menuBarHeight) / 2, 2, 5, 'left', 9);
    this.createElementHolder(screenWidth - holderWidth / 2, menuBarHeight + (screenHeight - menuBarHeight) / 2, 2, 5, 'right', 19);
    
    // Main garden area
    const mainImageHolderY = menuBarHeight + (screenHeight - menuBarHeight - 150) / 2;
    this.createMainImageHolder(screenWidth / 2, mainImageHolderY, screenWidth - holderWidth * 2, screenHeight - menuBarHeight - 150);

    // Horizontal holder
    this.createElementHolder(screenWidth / 2, screenHeight - 75, 8, 1, 'horizontal', 1, screenWidth - holderWidth * 2);

    this.setupDragAndDrop();
   
    this.startTutorial(); // Add this line
  }

  createMenuBar() {
    const menuBarHeight = 60;
    const screenWidth = this.cameras.main.width;

    this.add.rectangle(0, 0, screenWidth, menuBarHeight, 0x1a1a1a).setOrigin(0, 0);
    
    this.add.text(screenWidth / 2, menuBarHeight / 2, 'Design Your Society Garden!!!', {
      fontSize: '28px',
      fill: '#fff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Add timer elements
    const clockX = screenWidth - 250;
    this.add.image(clockX, menuBarHeight / 2, 'societytimer-clock')
      .setDisplaySize(40, 40);

    this.timeText = this.add.text(clockX + 50, menuBarHeight / 2, '05:00', {
      fontSize : '22px',
      fill: '#fff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    const finishButton = this.add.image(screenWidth - 120, menuBarHeight / 2, 'societyfinishButton')
      .setInteractive().setDisplaySize(40, 40)
      .on('pointerdown', () => {
        this.buttonTap.play();
        this.saveFinalDesign();
      });

    this.add.text(screenWidth - 120 + 30, menuBarHeight / 2, 'Finish', {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
    }).setOrigin(0, 0.5)
    .setInteractive()
    .on('pointerdown', () => {
      this.buttonTap.play();
      this.saveFinalDesign();
    });

    const menuButton = this.add.image(50 + 50, menuBarHeight / 2, 'societybackButton')
      .setInteractive().setDisplaySize(40, 40)
      .on('pointerdown', () => {
        this.buttonTap.play();
        this.scene.start('SocietySelectGardenType');
      });

    this.add.text(50 + 50 + 30, menuBarHeight / 2, 'Home', {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
    }).setOrigin(0, 0.5)
    .setInteractive()
    .on('pointerdown', () => {
      this.buttonTap.play();
      this.scene.start('SocietySelectGardenType');
    });

    return menuBarHeight;
  }

  startTimer() {
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });
  }

  updateTimer() {
    this.timeLeft--;
    
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.timeText.setText(
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    );

    if (this.timeLeft <= 0) {
      this.sound.play('timeOver'); // Add time over sound
      this.timerEvent.remove();
      this.saveFinalDesign();
     
    }
  }

  startTutorial() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
  
    // Create interactive overlay
    const overlay = this.add.rectangle(0, 0, screenWidth, screenHeight, 0x000000, 0.7)
      .setOrigin(0, 0)
      .setDepth(1000)
      .setInteractive();
  
    // Disable all game elements
    this.elements.forEach(element => element.disableInteractive());
  
    // Welcome Message
    const welcomeText = this.add.text(screenWidth/2, 100, 
      'Welcome to Society Garden Design!\n\nDrag and drop elements to create your dream garden!', {
        fontSize: '28px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 600 }
      }).setOrigin(0.5, 0).setDepth(1001);
  
    // Next Button (text only)
    const nextText = this.add.text(screenWidth/2, screenHeight - 150, 'Next', {
      fontSize: '32px',
      fill: '#00ff00',
      fontFamily: 'Arial',
      backgroundColor: '#8b4513',
      padding: { x: 20, y: 10 }
    })
    .setOrigin(0.5)
    .setDepth(1001)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => nextText.setStyle({ fill: '#ffff00' }))
    .on('pointerout', () => nextText.setStyle({ fill: '#00ff00' }))
    .on('pointerdown', () => {
      this.buttonTap.play();
      welcomeText.destroy();
      nextText.destroy();
      this.showDragTutorial(overlay);
    });
  }
  
  showDragTutorial(overlay) {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
  
    // Instruction text for drag
    const dragText = this.add.text(screenWidth/2, 100, 
      'Drag and drop elements from the side panels\nonto the garden area!', {
        fontSize: '28px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 600 }
      }).setOrigin(0.5, 0).setDepth(1001);
  
    // Find the example element (societytree5 - Adrak)
    const exampleElement = this.elements.find(el => el.texture.key === 'societytree2');
    if (!exampleElement) return;
  
    // Create animated hand cursor
    const hand = this.add.sprite(exampleElement.x, exampleElement.y, 'societycursor-hand')
      .setScale(0.5)
      .setDisplaySize(64, 64) // Add this line (adjust values as needed)
      .setDepth(1002);
  
    // Create example element clone for demonstration
    const demoElement = this.add.image(exampleElement.x, exampleElement.y, 'societytree2')
      .setDisplaySize(120, 120)
      .setDepth(1001);
  
    // Pulse effect on example element
    this.tweens.add({
      targets: exampleElement,
      scale: 1.1,
      duration: 500,
      yoyo: true,
      repeat: 3
    });
  
    // Animate drag motion
    this.tweens.add({
      targets: [hand, demoElement],
      x: this.mainImageBounds.centerX,
      y: this.mainImageBounds.centerY,
      duration: 2000,
      ease: 'Power2',
      onComplete: () => {
        // Show check button animation
        const checkButton = this.add.image(
          this.mainImageBounds.centerX + 60,
          this.mainImageBounds.centerY - 60,
          'societycheckButton'
        ).setDisplaySize(40, 40).setDepth(1001);
  
        // Pulse check button
        this.tweens.add({
          targets: checkButton,
          scale: 1.2,
          duration: 500,
          yoyo: true,
          repeat: 0,
          onComplete: () => {
            checkButton.destroy();
            demoElement.destroy();
            hand.destroy();
            exampleElement.setScale(1);
            
            // When tutorial completes:
  this.time.delayedCall(1000, () => {
    this.showCompletionMessage(overlay, dragText);
  });
}
        });
      }
    });
  }
  
  showCompletionMessage(overlay, dragText) {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
  
    // Completion Message
    const completeText = this.add.text(
      screenWidth/2, 
      screenHeight/2,
      'Now design your own garden!', {
        fontSize: '28px',
        fill: '#00ff00',
        align: 'center',
        wordWrap: { width: 500 }
      }).setOrigin(0.5).setDepth(1001);
  
    // Start Button (text only)
    const startButton = this.add.text(
      screenWidth/2, 
      screenHeight - 150, 
      'Start Designing', 
      {
        fontSize: '32px',
        fill: '#00ff00',
        fontFamily: 'Arial',
        backgroundColor: '#8b4513',
        padding: { x: 20, y: 10 }
      }
    )
    .setOrigin(0.5)
    .setDepth(1001)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => startButton.setStyle({ fill: '#ffff00' }))
    .on('pointerout', () => startButton.setStyle({ fill: '#00ff00' }))
    .on('pointerdown', () => {
      // Cleanup tutorial elements
      this.buttonTap.play();
      overlay.destroy();
      completeText.destroy();
      startButton.destroy();
      dragText.destroy();
      
      
      // Re-enable game elements
      this.elements.forEach(element => element.setInteractive());
      this.startTimer(); // Start the countdown
    });
  }

  setupDragAndDrop() {
    let isDragging = false;

    this.input.on('dragstart', (pointer, gameObject) => {
       this.dragSound.play(); // Add if using drag sound
      isDragging = true;
      // Bring element to front when dragging starts
      gameObject.setDepth(this.currentDepth++);
    });

    this.input.on('dragend', () => {
        isDragging = false;
    });

    this.input.on('gameobjectup', (pointer, gameObject) => {
        if (!isDragging && gameObject.isPlaced && this.specialTrees.has(gameObject.texture.key)) {
            this.createActionButtons(gameObject);
        }
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        if (gameObject.isPlaced) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            // gameObject.setDepth(10);

            // Update button positions during drag
            if (gameObject.checkButton) {
                gameObject.checkButton.setPosition(gameObject.x + 60, gameObject.y - 60);
            }
            if (gameObject.cancelButton) {
                gameObject.cancelButton.setPosition(gameObject.x - 60, gameObject.y - 60);
            }
            return;
        }
        if (!gameObject.checkButton && !gameObject.cancelButton) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            // gameObject.setDepth(10);
        }
    });

    this.input.on('dragend', (pointer, gameObject) => {
        const bounds = this.mainImageBounds;

        if (gameObject.isPlaced) {
            if (bounds.contains(gameObject.x, gameObject.y)) {
                gameObject.originalX = gameObject.x;
                gameObject.originalY = gameObject.y;
                gameObject.setDepth(this.currentDepth++); // Update depth on move
            } else {
                this.tweens.add({
                    targets: gameObject,
                    x: gameObject.originalX,
                    y: gameObject.originalY,
                    duration: 300,
                    ease: 'Power2'
                });
            }
            return;
        }

        if (bounds.contains(gameObject.x, gameObject.y)) {
            const canPlace = this.canPlaceElement(gameObject);
            if (canPlace) {
                this.createActionButtons(gameObject);
                return;
            } else {
                this.showOverlapError(gameObject);
            }
        }

        this.tweens.add({
            targets: gameObject,
            x: gameObject.originalX,
            y: gameObject.originalY,
            duration: 300,
            ease: 'Power2'
        });
    });

    this.elements.forEach(element => this.input.setDraggable(element));
}
  showCancelButton(element) {
    if (!element.cancelButton) {
      element.cancelButton = this.add.image(element.x - 60, element.y - 60, 'societycancelButton')
        .setOrigin(0.5)
        .setInteractive()
        .setDisplaySize(40, 40)
        .setDepth(1000)
        .on('pointerdown', () => this.handleCancelButtonClick(element));
    } else {
      element.cancelButton.setPosition(element.x - 60, element.y - 60);
    }
  }

  createMask(element) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = element.displayWidth;
    const height = element.displayHeight;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(element.texture.getSourceImage(), 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    return imageData.data;
  }

  canPlaceElement(element) {
    const newBounds = this.getElementBounds(element);
    const newMask = this.createMask(element);
    let canPlace = true;

    this.elements.forEach(existing => {
      if (existing === element || !this.mainImageBounds.contains(existing.x, existing.y)) return;

      const existingBounds = this.getElementBounds(existing);
      const existingMask = this.createMask(existing);

      if (this.checkOverlap(newBounds, existingBounds)) {
        if (this.pixelPerfectOverlap(newMask, existingMask, newBounds, existingBounds)) {
          canPlace = false;
        }
      }
    });

    return canPlace;
  }

  pixelPerfectOverlap(newMask, existingMask, newBounds, existingBounds) {
    const width = Math.min(newBounds.right, existingBounds.right) - Math.max(newBounds.left, existingBounds.left);
    const height = Math.min(newBounds.bottom, existingBounds.bottom) - Math.max(newBounds.top, existingBounds.top);

    if (width <= 0 || height <= 0) return false;

    const newXOffset = Math.max(newBounds.left, existingBounds.left) - newBounds.left;
    const newYOffset = Math.max(newBounds.top, existingBounds.top) - newBounds.top;

    const existingXOffset = Math.max(newBounds.left, existingBounds.left) - existingBounds.left;
    const existingYOffset = Math.max(newBounds.top, existingBounds.top) - existingBounds.top;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const newPixelIndex = ((y + newYOffset) * newBounds.width + (x + newXOffset)) * 4;
        const existingPixelIndex = ((y + existingYOffset) * existingBounds.width + (x + existingXOffset)) * 4;

        if (newMask[newPixelIndex + 3] > 0 && existingMask[existingPixelIndex + 3] > 0) {
          return true;
        }
      }
    }

    return false;
  }

  getElementBounds(element) {
    const width = element.displayWidth;
    const height = element.displayHeight;
    return {
      left: element.x - width / 2,
      right: element.x + width / 2,
      top: element.y - height / 2,
      bottom: element.y + height / 2
    };
  }

  checkOverlap(boundsA, boundsB) {
    return !(
      boundsA.right < boundsB.left ||
      boundsA.left > boundsB.right ||
      boundsA.bottom < boundsB.top ||
      boundsA.top > boundsB.bottom
    );
  }

  showOverlapError(gameObject) {
    this.tweens.add({
      targets: gameObject,
      x: gameObject.x + Phaser.Math.Between(-5, 5),
      y: gameObject.y + Phaser.Math.Between(-5, 5),
      duration: 50,
      yoyo: true,
      repeat: 3
    });
  }

  // In createActionButtons - REMOVE special tree check
createActionButtons(element) {
  this.cleanupButtons(element); // Always clear existing buttons first
  
  // Create buttons regardless of element type or state
  const buttonOffsetX = 125;
  const buttonOffsetY = 125;
  const buttonSize = 50;

  const checkButton = this.add.image(element.x + buttonOffsetX, element.y - buttonOffsetY, 'societycheckButton')
      .setOrigin(0.5)
      .setInteractive()
      .setDisplaySize(buttonSize, buttonSize)
      .setDepth(1000)
      .on('pointerdown', () => {
          this.buttonTap.play();
          this.handleCheckButtonClick(element);
      });

  const cancelButton = this.add.image(element.x - buttonOffsetX, element.y - buttonOffsetY, 'societycancelButton')
      .setOrigin(0.5)
      .setInteractive()
      .setDisplaySize(buttonSize, buttonSize)
      .setDepth(1000)
      .on('pointerdown', () => {
          this.buttonTap.play();
          this.handleCancelButtonClick(element);
      });

  element.checkButton = checkButton;
  element.cancelButton = cancelButton;
}

// In handleCheckButtonClick - Update special tree handling
handleCheckButtonClick(element) {
const textureKey = element.texture.key;
const isSpecial = this.specialTrees.has(textureKey);

if (isSpecial) {
  if (element.isPlaced) {
    // Just remove buttons for already placed special trees
    this.checkSound.play();
    this.cleanupButtons(element);
  } else {
    // Original special tree placement logic
    this.specialHandleCheckButtonClick(element);
    this.cleanupButtons(element);
  }
} else {
  // Existing normal tree logic
  const availableCount = this.availableCopies.get(textureKey) || 0;
  if (availableCount > 0) {
    const replica = this.add.image(element.originalX, element.originalY, textureKey)
      .setInteractive()
      .setDisplaySize(120, 120)
      .setData('isReplica', true);

    replica.originalX = element.originalX;
    replica.originalY = element.originalY;
    replica.originalSize = { ...element.originalSize };
    this.elements.push(replica);
    this.input.setDraggable(replica);

    replica.setDepth(this.currentDepth++);
    this.availableCopies.set(textureKey, availableCount - 1);
    this.droppedElements.set(textureKey, 
      this.droppedElements.get(textureKey) + 1);
    this.cleanupButtons(element);
 
  }
}
}

handleCancelButtonClick(element) {
const textureKey = element.texture.key;
const isSpecial = this.specialTrees.has(textureKey);

if (isSpecial) {
  this.cancelSound.play();
  
  if (element.isPlaced) {
    // Remove placed special tree completely
    element.destroy();
    this.droppedElements.set(textureKey, 
      this.droppedElements.get(textureKey) - 1);
    this.availableCopies.set(textureKey, 
      this.availableCopies.get(textureKey) + 1);
  } else {
    // Return unplaced special tree to holder
    this.tweens.add({
      targets: element,
      x: element.holderOriginalX,
      y: element.holderOriginalY,
      duration: 300,
      ease: 'Power2'
    });
  }
  this.specialCleanupButtons(element);
} else {
  // Existing normal tree logic
  this.tweens.add({
    targets: element,
    x: element.originalX,
    y: element.originalY,
    duration: 300,
    ease: 'Power2'
  });

  const droppedCount = this.droppedElements.get(textureKey) || 0;
  this.availableCopies.set(textureKey, 
    (this.availableCopies.get(textureKey) || 0) + 1);
  this.droppedElements.set(textureKey, droppedCount - 1);
  element.setDisplaySize(element.originalSize.width, element.originalSize.height);
  element.isPlaced = false;
  this.cleanupButtons(element);
}
}

cleanupButtons(element) {
  if (element.checkButton) element.checkButton.destroy();
  if (element.cancelButton) element.cancelButton.destroy();
  element.checkButton = null;
  element.cancelButton = null;
}

  showErrorFeedback(element) {
    this.tweens.add({
      targets: element,
      alpha: 0.5,
      yoyo: true,
      duration: 200,
      repeat:  2
    });
  }

  createElementHolder(x, y, columns, rows, type, startIndex, holderWidth = 300 * 0.7) {
    const squareSize = 80;
    const spacing = 20;
    const holderHeight = rows * 100 * 1.05;

    const startX = x - (columns * (squareSize + spacing)) / 2 + squareSize / 2;
    const startY = y - (rows * (squareSize + spacing)) / 2 + squareSize / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const px = startX + col * (squareSize + spacing);
        const py = startY + row * (squareSize + spacing);
        const textureKey = `societytree${startIndex + row * columns + col}`;
        const isSpecial = this.specialTrees.has(textureKey);

        this.add.image(px, py, 'societysquarePlaceholder').setDisplaySize(squareSize, squareSize);
        
        const element = this.add.image(px, py, textureKey)
          .setInteractive()
          .setDisplaySize(120, 120)
          .setDepth(0); // Set initial depth for holder elements
        
        element.holderOriginalX = px;
        element.holderOriginalY = py;
        element.originalX = px;
        element.originalY = py;
        element.originalSize = { width: 120, height: 120 };
        this.elements.push(element);

        this.availableCopies.set(textureKey, isSpecial ? 0 : Infinity);
        this.droppedElements.set(textureKey, 0);

        const treeName = this.treeNames[startIndex + row * columns + col - 1];
        this.add.text(px, py + 50, treeName, {
          fontSize: '14px',
          fill: '#000',
          fontFamily: 'Arial',
          backgroundColor: '#ffffff', // Add white background
          // padding: { x: 8, y: 4 }     // Add padding for better readability
        }).setOrigin(0.5);
      }
    }
  }

  createMainImageHolder(x, y, width, height) {
    this.mainImageHolder = this.add.image(x, y, 'societygardenBg').setDisplaySize(width, height);
    this.mainImageBounds = this.mainImageHolder.getBounds();
    this.tileWidth = this.mainImageBounds.width / 10;
    this.tileHeight = this.mainImageBounds.height / 5;

    this.add.graphics()
      .lineStyle(4, 0x00ff00)
      .strokeRect(
        this.mainImageBounds.x,
        this.mainImageBounds.y,
        this.mainImageBounds.width,
        this.mainImageBounds.height
      );
  }

  //.............................

specialActionButton(element) {
  // Destroy the check and cancel buttons
  this.specialCleanupButtons(element);
}

// specialCleanupButtons(element) {
//   console.log("Cleaning up buttons for element:", element.texture.key);

//   if (element.checkButton) {
//     console.log("Destroying check button");
//     element.checkButton.destroy(); // Destroy the check button
//     element.checkButton = null; // Clear the reference
//   } else {
//     console.log("Check button does not exist or is already destroyed");
//   }

//   if (element.cancelButton) {
//     console.log("Destroying cancel button");
//     element.cancelButton.destroy(); // Destroy the cancel button
//     element.cancelButton = null; // Clear the reference
//   } else {
//     console.log("Cancel button does not exist or is already destroyed");
//   }
// }

specialCleanupButtons(element) {
  if (element.checkButton) {
      element.checkButton.destroy();
      element.checkButton = null;
  }
  if (element.cancelButton) {
      element.cancelButton.destroy();
      element.cancelButton = null;
  }
}

specialHandleCheckButtonClick(element) {
  console.log("Check button clicked for special tree:", element.texture.key);
  this.checkSound.play();

  // Increase size by 30%
  element.setDisplaySize(element.originalSize.width * 2.2, element.originalSize.height * 2.2);

  // Create a copy in the original position with the original size
  const copy = this.add.image(element.holderOriginalX, element.holderOriginalY, element.texture.key)
    .setInteractive()
    .setDisplaySize(element.originalSize.width, element.originalSize.height)
    .setDepth(0); // Set initial depth for holder elements

  // Set properties for the copy
  copy.holderOriginalX = element.holderOriginalX;
  copy.holderOriginalY = element.holderOriginalY;
  copy.originalX = element.holderOriginalX;
  copy.originalY = element.holderOriginalY;
  copy.originalSize = { ...element.originalSize };
  this.elements.push(copy);
  this.input.setDraggable(copy);

  // Mark the original element as placed
  element.isPlaced = true;
  this.specialCleanupButtons(element); // Force cleanup
  element.setDepth(this.currentDepth++); // Bring to front

  // Call the special action button logic
  this.specialActionButton(element);
}

specialHandleCancelButtonClick(element) {
  console.log("Cancel button clicked for special tree:", element.texture.key);
  this.cancelSound.play();

  // Move the special tree back to its original position
  this.tweens.add({
    targets: element,
    x: element.holderOriginalX,
    y: element.holderOriginalY,
    duration: 300,
    ease: 'Power2'
  });

  // Reset the size to the original size
  element.setDisplaySize(element.originalSize.width, element.originalSize.height);

  // Mark the element as not placed
  element.isPlaced = false;

  // Call the special action button logic
  this.specialActionButton(element);
}
//..................................

  saveFinalDesign() {
    if (this.finalDesign || !this.scene) return;

    if (this.timerEvent) {
      this.timerEvent.remove();
      this.timerEvent = null;
    }

    const designData = {
      background: 'societygardenBg',
      elements: this.elements
        .filter(element => this.mainImageBounds.contains(element.x, element.y))
        .map(element => ({
          texture: element.texture.key,
          x: element.x,  // Keep absolute X
          y: element.y,  // Keep absolute Y
          scaleX: element.scaleX,  // Store actual scale
          scaleY: element.scaleY,
          displayWidth: element.displayWidth,
          displayHeight: element.displayHeight,
          depth: element.depth  // Store depth information
        })),
      mainImageBounds: {
        x: this.mainImageBounds.x,
        y: this.mainImageBounds.y,
        width: this.mainImageBounds.width,
        height: this.mainImageBounds.height
      }
    };

    this.scene.start('ResultPage2', { designData });
  }

  shutdown() {
    if (this.timerEvent) {
      this.timerEvent.remove();
      this.timerEvent = null;
    }
    this.elements.forEach(element => this.cleanupButtons(element));
  }
}