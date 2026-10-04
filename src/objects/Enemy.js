export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.type = type;
    this.hitsLeft = type === 'steinwaechter' ? 2 : 1;
    this.dead = false;

    const speeds = { waldgeist: 80, windgeist: 130, steinwaechter: 50, wollknaeuel: 100, staubfluse: 90, fussball: 140 };
    this.moveSpeed = speeds[type] || 80;
    this.direction = 1;

    this.setScale(1.6).setCollideWorldBounds(true);
    this.body.setAllowGravity(false);
    this.body.setSize(28, 28);
    this.body.setOffset(4, 8);
  }

  update() {
    if (this.dead) return;

    // Wand-Kollision
    if (this.body.blocked.left || this.body.blocked.right) {
      this.direction *= -1;
    }

    // Kantenerkennung: prüfen ob vor den Füßen noch Boden ist
    const aheadX = this.x + this.direction * (this.body.halfWidth + 6);
    const belowY  = this.body.bottom + 6;
    const ground  = this.scene.physics.overlapRect(aheadX - 4, belowY, 8, 8, false, true);
    if (ground.length === 0) {
      this.direction *= -1;
    }

    this.setVelocityX(this.direction * this.moveSpeed);
    this.setFlipX(this.direction < 0);
  }

  stomp() {
    this.hitsLeft--;
    if (this.hitsLeft <= 0) {
      this.dead = true;
      this.setVelocity(0, 0);
      this.scene.tweens.add({
        targets: this,
        scaleY: 0, alpha: 0, duration: 300,
        onComplete: () => this.destroy()
      });
      return true;
    }
    // flash on hit
    this.scene.tweens.add({
      targets: this, alpha: 0.3, duration: 80,
      yoyo: true, repeat: 2
    });
    return false;
  }
}
