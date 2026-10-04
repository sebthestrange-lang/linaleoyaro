const CHARACTERS = [
  {
    key: 'lina', name: 'Lina', color: 0xaa44cc,
    ability: 'Doppelsprung\n(zweimal in der Luft springen)'
  },
  {
    key: 'yaro', name: 'Yaro', color: 0x222244,
    ability: 'Dash\n(Shift = Schnellsprint)'
  },
  {
    key: 'leo',  name: 'Leo',  color: 0x2255cc,
    ability: 'Wandgleiten\n(an Wänden gleiten & abspringen)'
  }
];

export class CharacterSelectScene extends Phaser.Scene {
  constructor() { super('CharacterSelectScene'); }

  create() {
    const { width: W, height: H } = this.scale;
    this._started = false;

    this.add.image(W / 2, H / 2, 'bg_forest').setDisplaySize(W, H).setAlpha(0.6);

    this.add.text(W / 2, 38, 'Wähle deine Figur', {
      fontFamily: 'Georgia, serif', fontSize: '40px',
      color: '#ffffff', stroke: '#330066', strokeThickness: 6
    }).setOrigin(0.5);

    // 3 Karten gleichmäßig verteilt
    const positions = [W * 0.22, W * 0.5, W * 0.78];
    CHARACTERS.forEach((ch, i) => this._addCard(positions[i], H / 2 - 10, ch));

    // "Los geht's!"-Button — Container animieren, damit Hitbox immer stimmt
    const btnY   = H - 52;
    const btnBtn = this.add.container(W / 2, btnY);
    const btnBg  = this.add.rectangle(0, 0, 240, 56, 0x6600cc).setStrokeStyle(3, 0x000000);
    const btnTxt = this.add.text(0, 0, '▶  Los geht\'s!', {
      fontFamily: 'Georgia, serif', fontSize: '28px',
      color: '#ffffff', stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);
    btnBtn.add([btnBg, btnTxt]);
    btnBtn.setSize(240, 56);
    btnBtn.setInteractive({ useHandCursor: true });

    btnBtn.on('pointerover', () => btnBg.setFillStyle(0xaa44ff));
    btnBtn.on('pointerout',  () => btnBg.setFillStyle(0x6600cc));
    btnBtn.on('pointerdown', () => this._start());

    this.tweens.add({
      targets: btnBtn, y: btnY - 5,
      duration: 800, ease: 'Sine.easeInOut', yoyo: true, repeat: -1
    });

    // Tastatur — keine removeAllListeners(), da create() beim Szenenstart frisch läuft
    this._selectedIdx = 0;
    this.input.keyboard.on('keydown-LEFT',  () => this._move(-1));
    this.input.keyboard.on('keydown-RIGHT', () => this._move(+1));
    this.input.keyboard.on('keydown-A',     () => this._move(-1));
    this.input.keyboard.on('keydown-D',     () => this._move(+1));
    this.input.keyboard.on('keydown-ENTER', () => this._start());
    this.input.keyboard.on('keydown-SPACE', () => this._start());

    this._highlight(0);
  }

  _addCard(x, y, ch) {
    const card = this.add.container(x, y);

    const bg = this.add.rectangle(0, 0, 230, 320, ch.color, 0.85)
      .setStrokeStyle(4, 0x000000);

    const scaleMap = { lina: 3.0, yaro: 2.6, leo: 2.5 };
    const sprite = this.add.image(0, -68, ch.key).setScale(scaleMap[ch.key] || 2.8);

    const nameText = this.add.text(0, 42, ch.name, {
      fontFamily: 'Georgia, serif', fontSize: '30px',
      color: '#ffffff', stroke: '#000000', strokeThickness: 5
    }).setOrigin(0.5);

    const abilityText = this.add.text(0, 94, ch.ability, {
      fontFamily: 'Georgia, serif', fontSize: '16px',
      color: '#ffeeaa', stroke: '#000000', strokeThickness: 3,
      align: 'center', wordWrap: { width: 205 }
    }).setOrigin(0.5);

    card.add([bg, sprite, nameText, abilityText]);
    card.setSize(230, 320);
    card.setInteractive({ useHandCursor: true });
    card.on('pointerdown', () => {
      this._highlight(CHARACTERS.findIndex(c => c.key === ch.key));
    });

    this[`_card_${ch.key}`] = card;
    this[`_bg_${ch.key}`]   = bg;
  }

  _move(dir) {
    this._highlight(Phaser.Math.Clamp(this._selectedIdx + dir, 0, CHARACTERS.length - 1));
  }

  _highlight(idx) {
    this._selectedIdx = idx;
    CHARACTERS.forEach((ch, i) => {
      const sel = i === idx;
      this[`_bg_${ch.key}`].setStrokeStyle(sel ? 6 : 4, sel ? 0xffdd00 : 0x000000);
      this[`_card_${ch.key}`].setScale(sel ? 1.07 : 1.0);
    });
  }

  _start() {
    if (this._started) return;
    this._started = true;
    const ch = CHARACTERS[this._selectedIdx];
    this.scene.start('GameScene', { character: ch.key, level: 1 });
    this.time.delayedCall(1500, () => { this._started = false; });
  }
}
