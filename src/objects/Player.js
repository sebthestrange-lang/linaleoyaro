export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, character) {
    super(scene, x, y, character);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.character   = character;
    this.lives       = 3;
    this.score       = 0;
    this.isInvincible = false;

    // Charakter-spezifische Werte
    if (character === 'lina') {
      this.maxJumps    = 2;
      this.speed       = 220;
      this.canWallSlide = false;
      this.canDash     = false;
    } else if (character === 'leo') {
      this.maxJumps    = 1;
      this.speed       = 240;
      this.canWallSlide = true;
      this.canDash     = false;
    } else if (character === 'yaro') {
      this.maxJumps    = 1;
      this.speed       = 230;
      this.canWallSlide = false;
      this.canDash     = true;
      this._dashCooldown   = 0;
      this._dashDuration   = 0;
      this._DASH_SPEED     = 520;
      this._DASH_DURATION  = 180;  // ms
      this._DASH_COOLDOWN  = 900;  // ms
    }

    this.jumpsLeft    = this.maxJumps;
    this._wallSliding = false;
    this._lastWallDir = 0;
    this._isDashing   = false;

    // Skalierung: Lina > Yaro > Leo
    const scaleMap = { lina: 2.0, yaro: 1.85, leo: 1.7 };
    this.setScale(scaleMap[character] || 2.0)
      .setCollideWorldBounds(true);
    this.body.setGravityY(0);
    this.body.setMaxVelocityY(700);

    // Physics-Body pro Charakter (Texturgrößen: Lina 40x61 (5px Rand oben), Yaro 37x52, Leo 34x48)
    const bodies = {
      lina: { w: 18, h: 46, ox: 11, oy: 11 },
      yaro: { w: 17, h: 42, ox: 10, oy: 6 },
      leo:  { w: 16, h: 38, ox:  9, oy: 6 }
    };
    const b = bodies[character] || bodies.lina;
    this.body.setSize(b.w, b.h);
    this.body.setOffset(b.ox, b.oy);

    // Shift-Taste für Yaro
    if (this.canDash) {
      this._shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }
  }

  update(cursors, wasd) {
    const onGround = this.body.blocked.down;
    const onWall   = this.body.blocked.left || this.body.blocked.right;
    const now      = this.scene.time.now;

    if (onGround) {
      this.jumpsLeft    = this.maxJumps;
      this._wallSliding = false;
    }

    // ── Dash (Yaro) ───────────────────────────────────────
    if (this.canDash && this._shiftKey) {
      const dashReady = now > this._dashCooldown;
      if (Phaser.Input.Keyboard.JustDown(this._shiftKey) && dashReady && !this._isDashing) {
        this._isDashing   = true;
        this._dashDir     = this.flipX ? -1 : 1;
        this._dashEnd     = now + this._DASH_DURATION;
        this._dashCooldown = now + this._DASH_COOLDOWN;
        // Dash-Effekt: kurzes Aufleuchten
        this.scene.tweens.add({
          targets: this, alpha: 0.4, duration: 80,
          yoyo: true, repeat: 2,
          onComplete: () => this.setAlpha(1)
        });
      }
      if (this._isDashing) {
        if (now < this._dashEnd) {
          this.setVelocityX(this._dashDir * this._DASH_SPEED);
          this.setVelocityY(0);
          this.body.setAllowGravity(false);
          return; // Keine andere Bewegung während Dash
        } else {
          this._isDashing = false;
          this.body.setAllowGravity(true);
        }
      }
    }

    // ── Horizontale Bewegung ──────────────────────────────
    const left  = cursors.left.isDown  || wasd.left.isDown;
    const right = cursors.right.isDown || wasd.right.isDown;

    if (left) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (right) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    // ── Wandgleiten (Leo) ─────────────────────────────────
    if (this.canWallSlide && !onGround && onWall && this.body.velocity.y > 0) {
      this._wallSliding = true;
      this._lastWallDir = this.body.blocked.left ? -1 : 1;
      this.setVelocityY(Math.min(this.body.velocity.y, 80));
    } else {
      this._wallSliding = false;
    }

    // ── Sprung ────────────────────────────────────────────
    const jumpPressed = Phaser.Input.Keyboard.JustDown(cursors.up)
      || Phaser.Input.Keyboard.JustDown(cursors.space)
      || Phaser.Input.Keyboard.JustDown(wasd.up);

    if (jumpPressed) {
      if (this._wallSliding) {
        this.setVelocityY(-580);
        this.setVelocityX(-this._lastWallDir * this.speed * 1.2);
        this.jumpsLeft = 0;
      } else if (this.jumpsLeft > 0) {
        this.setVelocityY(-580);
        this.jumpsLeft--;
      }
    }
  }

  hit() {
    if (this.isInvincible) return false;
    this.lives--;
    this.isInvincible = true;
    this.setAlpha(0.5);
    this.scene.time.delayedCall(1800, () => {
      this.isInvincible = false;
      this.setAlpha(1);
    });
    return true;
  }

  collect() {
    this.score++;
  }
}
