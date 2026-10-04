import { loadHighscores } from '../highscores.js';

export class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    const { width: W, height: H } = this.scale;

    // Hintergrund
    this.add.image(W / 2, H / 2, 'bg_forest').setDisplaySize(W, H);

    // Dekorationen
    this.add.image(60,     H - 55, 'bush').setScale(1.5);
    this.add.image(W - 60, H - 55, 'bush').setScale(1.5);
    const cloudL = this.add.image(140,     80, 'cloud_deco').setScale(1.2);
    const cloudR = this.add.image(W - 130, 95, 'cloud_cat_lying').setScale(1.0);
    [cloudL, cloudR].forEach((c, i) => {
      this.tweens.add({
        targets: c, y: c.y - 8, x: c.x + (i ? -10 : 10),
        duration: 2400 + i * 500, ease: 'Sine.easeInOut', yoyo: true, repeat: -1
      });
    });

    // Drei Figuren nebeneinander, mittig auf dem Splash
    const charY   = H / 2 + 50;
    const linaImg = this.add.image(W / 2 - 130, charY, 'lina').setScale(2.4);
    const yaroImg = this.add.image(W / 2,        charY - 8, 'yaro').setScale(2.15);
    const leoImg  = this.add.image(W / 2 + 120,  charY + 8, 'leo').setScale(1.95);

    // Sanftes Schweben der Figuren (leicht versetzt)
    [linaImg, yaroImg, leoImg].forEach((img, i) => {
      this.tweens.add({
        targets: img, y: img.y - 10, duration: 1000 + i * 150,
        ease: 'Sine.easeInOut', yoyo: true, repeat: -1, delay: i * 200
      });
    });

    // Titel-Schatten
    this.add.text(W / 2 + 4, 84, 'Lina, Yaro & Leo', {
      fontFamily: 'Georgia, serif', fontSize: '58px',
      color: '#000000', alpha: 0.35
    }).setOrigin(0.5);

    // Titel
    this.add.text(W / 2, 80, 'Lina, Yaro & Leo', {
      fontFamily: 'Georgia, serif', fontSize: '58px',
      color: '#ffffff',
      stroke: '#330066', strokeThickness: 8,
      shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 4, fill: true }
    }).setOrigin(0.5);

    this.add.text(W / 2, 148, 'Abenteuer in der Phantasiewelt', {
      fontFamily: 'Georgia, serif', fontSize: '22px',
      color: '#ffeeaa', stroke: '#330066', strokeThickness: 4
    }).setOrigin(0.5);

    // Rekord anzeigen
    const best = loadHighscores()[0];
    if (best) {
      const names = { lina: 'Lina', yaro: 'Yaro', leo: 'Leo' };
      this.add.text(W / 2, 186, `🏆 Rekord: ★ ${best.score}  (${names[best.character] || best.character})`, {
        fontFamily: 'Georgia, serif', fontSize: '20px',
        color: '#ffdd00', stroke: '#330066', strokeThickness: 4
      }).setOrigin(0.5);
    }

    // Start-Button
    const btn = this.add.text(W / 2, H - 88, '▶  Spiel starten', {
      fontFamily: 'Georgia, serif', fontSize: '32px',
      color: '#ffffff', backgroundColor: '#6600cc',
      padding: { x: 28, y: 14 },
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#aa44ff' }));
    btn.on('pointerout',  () => btn.setStyle({ backgroundColor: '#6600cc' }));
    btn.on('pointerdown', () => this.scene.start('CharacterSelectScene'));

    this.input.keyboard.on('keydown-SPACE', () => this.scene.start('CharacterSelectScene'));
    this.input.keyboard.on('keydown-ENTER', () => this.scene.start('CharacterSelectScene'));

    this.tweens.add({
      targets: btn, y: btn.y - 6, duration: 900,
      ease: 'Sine.easeInOut', yoyo: true, repeat: -1
    });
  }
}
