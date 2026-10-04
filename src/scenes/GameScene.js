import { Player }      from '../objects/Player.js';
import { Enemy }       from '../objects/Enemy.js';
import { Collectible } from '../objects/Collectible.js';
import { level1 }      from '../levels/level1.js';
import { level2 }      from '../levels/level2.js';
import { level3 }      from '../levels/level3.js';
import { level4 }      from '../levels/level4.js';
import { level5 }      from '../levels/level5.js';

const LEVELS = { 1: level1, 2: level2, 3: level3, 4: level4, 5: level5 };

export class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  init(data) {
    this.character = data.character || 'lina';
    this.levelNum  = data.level     || 1;
    this.startScore = data.score    || 0;
  }

  create() {
    this._goalReached = false;
    const lvl = LEVELS[this.levelNum];
    const { worldWidth, worldHeight } = lvl;

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // background
    this.add.image(0, 0, lvl.background)
      .setOrigin(0, 0)
      .setDisplaySize(worldWidth, worldHeight)
      .setScrollFactor(0.3);

    // decorations (behind platforms)
    lvl.decorations.forEach(d => {
      const img = this.add.image(d.x, d.y, d.key).setOrigin(0.5, 1);
      // Katzen-Wolken und Kuscheldecken schweben sanft
      if (d.key.startsWith('cloud') || d.key.startsWith('blanket')) {
        this.tweens.add({
          targets: img, y: d.y - 8, x: d.x + 12,
          duration: 2200 + Math.random() * 1200,
          ease: 'Sine.easeInOut', yoyo: true, repeat: -1
        });
      }
      // Decken wehen zusätzlich leicht im Wind
      if (d.key.startsWith('blanket')) {
        img.setScale(1.5);
        this.tweens.add({
          targets: img, angle: { from: -4, to: 4 },
          duration: 1600 + Math.random() * 800,
          ease: 'Sine.easeInOut', yoyo: true, repeat: -1
        });
      }
    });

    // platforms
    this.platforms = this.physics.add.staticGroup();
    this._buildPlatforms(lvl);

    // portal (goal)
    this.portal = this.physics.add.staticImage(lvl.goal.x, lvl.goal.y, 'portal');
    this.portal.body.setSize(40, 70);

    // enemies
    this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: false });
    lvl.enemies.forEach(e => {
      const enemy = new Enemy(this, e.x, e.y, lvl.enemyType);
      this.enemies.add(enemy, true);
      this.physics.add.collider(enemy, this.platforms);
    });

    // collectibles
    this.collectibles = this.physics.add.group({ classType: Collectible });
    lvl.collectibles.forEach(c => {
      const col = new Collectible(this, c.x, c.y);
      this.collectibles.add(col, true);
    });

    // Freunde zum Streicheln/Kuscheln (Katzen, Teddys)
    this.friends = this.physics.add.staticGroup();
    this._friendText = lvl.friendText || 'Miau! +1';
    (lvl.friends || []).forEach(c => {
      const cat = this.friends.create(c.x, c.y, c.key);
      // größer machen, Pfoten bleiben auf dem Boden
      cat.setScale(1.6);
      cat.y = c.y + 22 - cat.displayHeight / 2;
      cat.refreshBody();
      cat.petted = false;
      // gelegentlich mit dem Schwanz wackeln
      this.tweens.add({
        targets: cat, angle: { from: -3, to: 3 }, duration: 900 + Math.random() * 400,
        ease: 'Sine.easeInOut', yoyo: true, repeat: -1
      });
    });

    // player
    this.player = new Player(this, lvl.spawn.x, lvl.spawn.y, this.character);
    this.player.score = this.startScore;
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(this.player, this.friends, this._onPetFriend, null, this);

    // collisions / overlaps
    this.physics.add.overlap(this.player, this.portal,      this._onGoal,      null, this);
    this.physics.add.overlap(this.player, this.collectibles, this._onCollect,   null, this);
    this.physics.add.overlap(this.player, this.enemies,     this._onEnemyTouch, null, this);

    // camera
    this.cameras.main
      .setBounds(0, 0, worldWidth, worldHeight)
      .startFollow(this.player, true, 0.12, 0.12);

    // input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = {
      left:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    };

    // HUD
    this._buildHUD(lvl.name);

    // fall death zone
    this._fallZone = worldHeight + 80;
  }

  _buildPlatforms(lvl) {
    // ground segments
    if (lvl.ground) {
      lvl.ground.segments.forEach(seg => {
        const tiles = Math.ceil(seg.width / 96);
        for (let i = 0; i < tiles; i++) {
          this.platforms.create(seg.x + i * 96 + 48, lvl.ground.y, lvl.platformKey);
        }
      });
    }

    // elevated platforms
    lvl.platforms.forEach(p => {
      const tiles = Math.ceil(p.width / 96);
      for (let i = 0; i < tiles; i++) {
        this.platforms.create(p.x + i * 96 + 48, p.y, lvl.platformKey);
      }
    });
  }

  _buildHUD(levelName) {
    // fixed to camera
    const cam = this.cameras.main;

    this.hud = this.add.container(0, 0).setScrollFactor(0).setDepth(10);

    // level name
    this.hud.add(this.add.text(this.scale.width / 2, 16, levelName, {
      fontFamily: 'Georgia, serif', fontSize: '20px',
      color: '#ffffff', stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5, 0));

    // hearts
    this._heartImages = [];
    for (let i = 0; i < 3; i++) {
      const h = this.add.image(24 + i * 38, 24, 'heart').setScale(0.9).setScrollFactor(0).setDepth(10);
      this._heartImages.push(h);
    }

    // score
    this._scoreTxt = this.add.text(this.scale.width - 20, 14, '★ 0', {
      fontFamily: 'Georgia, serif', fontSize: '22px',
      color: '#ffdd00', stroke: '#000000', strokeThickness: 4
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(10);
  }

  _updateHUD() {
    // hearts
    this._heartImages.forEach((h, i) => {
      h.setVisible(i < this.player.lives);
    });
    this._scoreTxt.setText('★ ' + this.player.score);
  }

  _onGoal() {
    if (this._goalReached) return;
    this._goalReached = true;

    // portal pulse
    this.tweens.add({
      targets: this.portal, scale: 1.4, alpha: 0,
      duration: 500
    });

    this.time.delayedCall(600, () => {
      const nextLevel = this.levelNum + 1;
      if (LEVELS[nextLevel]) {
        this.scene.start('GameScene', { character: this.character, level: nextLevel, score: this.player.score });
      } else {
        this.scene.start('GameOverScene', {
          character: this.character, won: true, score: this.player.score
        });
      }
    });
  }

  _onCollect(player, col) {
    player.collect();
    col.collect(this);

    // score popup
    const txt = this.add.text(col.x, col.y - 20, '+1', {
      fontFamily: 'Georgia, serif', fontSize: '20px',
      color: '#ffdd00', stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);
    this.tweens.add({
      targets: txt, y: txt.y - 40, alpha: 0, duration: 600,
      onComplete: () => txt.destroy()
    });
  }

  _onPetFriend(player, cat) {
    if (cat.petted) return;
    cat.petted = true;
    player.score += 1;

    // Katze hüpft vor Freude
    this.tweens.add({ targets: cat, y: cat.y - 18, duration: 180, yoyo: true, ease: 'Quad.easeOut' });

    const txt = this.add.text(cat.x, cat.y - 34, this._friendText, {
      fontFamily: 'Georgia, serif', fontSize: '20px',
      color: '#ff66cc', stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);
    this.tweens.add({ targets: txt, y: txt.y - 40, alpha: 0, duration: 900, onComplete: () => txt.destroy() });

    // kleine Herzen steigen auf
    for (let i = 0; i < 3; i++) {
      const h = this.add.image(cat.x + (i - 1) * 14, cat.y - 10, 'heart').setScale(0.45);
      this.tweens.add({
        targets: h, y: h.y - 50 - i * 10, alpha: 0, duration: 800, delay: i * 120,
        onComplete: () => h.destroy()
      });
    }
  }

  _onEnemyTouch(player, enemy) {
    if (enemy.dead) return;

    // stomping: player falling onto enemy from above
    const stompThreshold = enemy.y - enemy.displayHeight * 0.4;
    if (player.body.velocity.y > 0 && player.y < stompThreshold) {
      const killed = enemy.stomp();
      player.setVelocityY(-420); // bounce
      if (killed) {
        player.score += 2;
        const txt = this.add.text(enemy.x, enemy.y - 20, '+2', {
          fontFamily: 'Georgia, serif', fontSize: '20px',
          color: '#ff88ff', stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5);
        this.tweens.add({ targets: txt, y: txt.y - 50, alpha: 0, duration: 700, onComplete: () => txt.destroy() });
      }
    } else {
      if (player.hit()) {
        // knock back
        const dir = player.x < enemy.x ? -1 : 1;
        player.setVelocity(dir * 260, -300);
        this._flashHUD();

        if (player.lives <= 0) {
          this.time.delayedCall(400, () => {
            this.scene.start('GameOverScene', {
              character: this.character, won: false, score: player.score
            });
          });
        }
      }
    }
  }

  _flashHUD() {
    this.cameras.main.flash(200, 255, 0, 0, false);
  }

  update() {
    if (!this.player || !this.player.active) return;

    this.player.update(this.cursors, this.wasd);
    this._updateHUD();

    // enemy patrol edge check
    this.enemies.getChildren().forEach(e => {
      if (!e.dead) e.update();
    });

    // fall into pit
    if (this.player.y > this._fallZone) {
      if (this.player.hit()) {
        this.player.setPosition(
          LEVELS[this.levelNum].spawn.x,
          LEVELS[this.levelNum].spawn.y
        );
        this.player.setVelocity(0, 0);
        if (this.player.lives <= 0) {
          this.scene.start('GameOverScene', {
            character: this.character, won: false, score: this.player.score
          });
        }
      }
    }
  }
}
