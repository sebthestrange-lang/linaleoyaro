import { addHighscore, loadHighscores } from '../highscores.js';

const NAMES = { lina: 'Lina', yaro: 'Yaro', leo: 'Leo' };

export class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOverScene'); }

  init(data) {
    this.character = data.character || 'lina';
    this.won       = data.won       || false;
    this.score     = data.score     || 0;
  }

  create() {
    const { width: W, height: H } = this.scale;
    const bgKey = this.won ? 'bg_cloud' : 'bg_crystal';

    this.add.image(W / 2, H / 2, bgKey).setDisplaySize(W, H).setAlpha(0.6);

    const title = this.won ? '🎉 Geschafft!' : 'Spiel vorbei';
    const color = this.won ? '#ffdd00'       : '#ff4444';

    this.add.text(W / 2, 50, title, {
      fontFamily: 'Georgia, serif', fontSize: '52px',
      color, stroke: '#000000', strokeThickness: 7
    }).setOrigin(0.5);

    const msg = this.won
      ? 'Alle Level abgeschlossen!\nDie Phantasiewelt ist gerettet!'
      : 'Versuch es noch einmal!\nDu schaffst das!';
    this.add.text(W / 2, 118, msg, {
      fontFamily: 'Georgia, serif', fontSize: '22px',
      color: '#ffffff', stroke: '#000000', strokeThickness: 4,
      align: 'center'
    }).setOrigin(0.5);

    // Ergebnis speichern
    const rank = addHighscore(this.character, this.score, this.won);

    // Linke Seite: Figur + Ergebnis
    const leftX = W * 0.28;
    this.add.image(leftX, 270, this.character).setScale(3.2);
    this.add.text(leftX, 380, `★ ${this.score} Sterne`, {
      fontFamily: 'Georgia, serif', fontSize: '28px',
      color: '#ffdd00', stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5);

    if (rank === 0) {
      const rec = this.add.text(leftX, 418, 'Neuer Rekord!', {
        fontFamily: 'Georgia, serif', fontSize: '24px',
        color: '#ff66cc', stroke: '#000000', strokeThickness: 4
      }).setOrigin(0.5);
      this.tweens.add({ targets: rec, scale: 1.15, duration: 500, yoyo: true, repeat: -1 });
    }

    // Rechte Seite: Bestenliste
    this._drawHighscores(W * 0.68, 175, rank);

    // buttons
    this._addButton(W / 2 - 120, H - 50, 'Nochmal spielen', () => {
      this.scene.start('GameScene', { character: this.character, level: 1 });
    });

    this._addButton(W / 2 + 120, H - 50, 'Zum Menü', () => {
      this.scene.start('MenuScene');
    });
  }

  _drawHighscores(x, y, highlightIdx) {
    const boxW = 330, boxH = 250;
    this.add.rectangle(x, y + boxH / 2 - 10, boxW, boxH, 0x000000, 0.45)
      .setStrokeStyle(3, 0xffdd00);

    this.add.text(x, y + 10, '🏆 Bestenliste', {
      fontFamily: 'Georgia, serif', fontSize: '26px',
      color: '#ffdd00', stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5);

    const list = loadHighscores();
    if (list.length === 0) {
      this.add.text(x, y + 100, 'Noch keine Einträge', {
        fontFamily: 'Georgia, serif', fontSize: '20px', color: '#ffffff'
      }).setOrigin(0.5);
      return;
    }

    list.forEach((e, i) => {
      const rowY = y + 55 + i * 36;
      const hl   = i === highlightIdx;
      const style = {
        fontFamily: 'Georgia, serif', fontSize: '20px',
        color: hl ? '#ff66cc' : '#ffffff', stroke: '#000000', strokeThickness: 3
      };
      this.add.image(x - 135, rowY, e.character).setScale(0.55);
      this.add.text(x - 112, rowY, `${i + 1}. ${NAMES[e.character] || e.character}`, style).setOrigin(0, 0.5);
      this.add.text(x + 20, rowY, `★ ${e.score}`, { ...style, color: hl ? '#ff66cc' : '#ffdd00' }).setOrigin(0, 0.5);
      this.add.text(x + 150, rowY, e.date || '', { ...style, fontSize: '14px' }).setOrigin(1, 0.5);
    });
  }

  _addButton(x, y, label, callback) {
    const btn = this.add.text(x, y, label, {
      fontFamily: 'Georgia, serif', fontSize: '22px',
      color: '#ffffff', backgroundColor: '#330066',
      padding: { x: 18, y: 10 },
      stroke: '#000000', strokeThickness: 2
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#6600cc' }));
    btn.on('pointerout',  () => btn.setStyle({ backgroundColor: '#330066' }));
    btn.on('pointerdown', callback);
  }
}
