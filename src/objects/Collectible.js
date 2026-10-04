export class Collectible extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'star');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(1.2);
    this.body.setAllowGravity(false);
    this.body.setSize(24, 24);
    this.body.moves = false;  // Physics lässt Sprite in Ruhe → Tween läuft konfliktfrei

    scene.tweens.add({
      targets: this, y: y - 8, duration: 700,
      ease: 'Sine.easeInOut', yoyo: true, repeat: -1
    });
  }

  collect(scene) {
    this.disableBody(true, false);
    scene.tweens.add({
      targets: this, scaleX: 2, scaleY: 2, alpha: 0, duration: 250,
      onComplete: () => this.destroy()
    });
  }
}
