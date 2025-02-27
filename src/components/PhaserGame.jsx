import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import LoadingScene from '../scenes/LoadingScene';
import StartPage from './StartPage';
import SelectGardenType from '../scenes/SelectGardenType';
import TerraceGardenDesign from '../scenes/TerraceGardenDesign';
import ResultPage from '../scenes/ResultPage';
import SocietyGardenDesign from '../scenes/SocietyGardenDesign';
import ResultPage2 from '../scenes/ResultPage2';
import PublicGardenDesign from '../scenes/PublicGardenDesign';
import ResultPage3 from '../scenes/ResultPage3';
import { preload } from 'react-dom';
import TerraceSelectGardenType from '../scenes/TerraceSelectGardenType';
import SocietySelectGardenType from '../scenes/SocietySelectGardenType';
import PublicSelectGardenType from '../scenes/PublicSelectGardenType';


const PhaserGame = () => {
  const gameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {



    const resizeGame = () => {
      if (gameRef.current) {
        gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
      }
    };

    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: containerRef.current,
      // scene: [
     
      //   PublicGardenDesign,
        
      // ],
      scene: [
        LoadingScene,
        StartPage,
        SelectGardenType,
        TerraceGardenDesign,
        TerraceSelectGardenType,
        ResultPage,
        SocietyGardenDesign,
        SocietySelectGardenType,
        ResultPage2,
        PublicGardenDesign,
        PublicSelectGardenType,
        ResultPage3
      ],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      callbacks: {
        postBoot: () => {
          gameRef.current.events.on('hidden', () => {
            if (gameRef.current.sound.context.state === 'suspended') {
              gameRef.current.sound.context.resume();
            }
          });
        }
      }
    };

    gameRef.current = new Phaser.Game(config);

    const handleResize = () => {
      resizeGame();
    };

    const resumeAudioContext = () => {
      if (gameRef.current?.sound.context.state === 'suspended') {
        gameRef.current.sound.context.resume();
      }
    };


    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', resumeAudioContext);
    window.addEventListener('touchstart', resumeAudioContext);
    // window.addEventListener('beforeunload', handleUnload);

    // Cleanup
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', resumeAudioContext);
      window.removeEventListener('touchstart', resumeAudioContext);
      // window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed'
      }}
    />
  );
};

export default PhaserGame;