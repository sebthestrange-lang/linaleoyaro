import { BootScene } from './src/scenes/BootScene.js';
import { MenuScene } from './src/scenes/MenuScene.js';
import { CharacterSelectScene } from './src/scenes/CharacterSelectScene.js';
import { GameScene } from './src/scenes/GameScene.js';
import { GameOverScene } from './src/scenes/GameOverScene.js';

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  backgroundColor: '#1a0a2e',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 800 }, debug: false }
  },
  scene: [BootScene, MenuScene, CharacterSelectScene, GameScene, GameOverScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

new Phaser.Game(config);
