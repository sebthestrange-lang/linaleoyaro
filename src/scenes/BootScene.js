export class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    this._makePlayer('lina', 0xaa44cc, 0xff88dd, 0xf5c518, 40, 56);
    this._makePlayer('leo',  0x2255cc, 0x44aaff, 0xf5c518, 34, 48);
    this._makePlayer('yaro', 0x2255cc, 0x111111, 0x3a2010, 37, 52, false, 0x1a55dd);
    this._makePlatform('platform_grass',   0x5aad3f, 0x3d7a2a, 0x8bc34a);
    this._makePlatform('platform_cloud',   0xeef6ff, 0xc8dcf0, 0xffffff);
    this._makePlatform('platform_crystal', 0x6a3fa0, 0x9b59b6, 0xda8fff);
    this._makeEnemy('waldgeist',     0x55cc55, 0x228822);
    this._makeEnemy('windgeist',     0x88ccff, 0x4488cc);
    this._makeEnemy('steinwaechter', 0x998877, 0x665544);
    this._makeStar();
    this._makeHeart();
    this._makePortal();
    this._makeBackground('bg_forest',  [0x87ceeb, 0x98d8a0]);
    this._makeBackground('bg_cloud',   [0xddeeff, 0xb8d4f0]);
    this._makeBackground('bg_crystal', [0x1a0a2e, 0x2d1654]);
    this._makeDecoration();

    // Katzen-Level
    this._makePlatform('platform_cat', 0xff99cc, 0xcc6699, 0xffccee);
    this._makeBackground('bg_cat', [0xfbd3e9, 0xe2c6f5]);
    this._makeYarnEnemy('wollknaeuel', 0xff66aa);
    this._makeCat('cat_orange', 0xff9933, 0xcc6600, 0x33aa33);
    this._makeCat('cat_grey',   0xaaaaaa, 0x777777, 0x3388dd);
    this._makeCat('cat_black',  0x333333, 0x111111, 0xffdd00);
    this._makeCat('cat_white',  0xffffff, 0xdddddd, 0x3388dd);
    this._makeCatDecorations();

    // Kuschel-Level
    this._makePillowPlatform('platform_pillow');
    this._makeBackground('bg_kuschel', [0xffe9d6, 0xf8d0c0]);
    this._makeBlanket('blanket_pink', 0xff9ec7, 0xff7fb0, 0xffffff);
    this._makeBlanket('blanket_blue', 0x9fd3ff, 0x7bbcf0, 0xffffff);
    this._makeTeddy();
    this._makeDustBunny('staubfluse');

    // Fußball-Level
    this._makePitchPlatform('platform_pitch');
    this._makeBackground('bg_pitch', [0x6fcf6f, 0x4caf50]);
    this._makeSoccerBall('fussball');
    this._makePitchDecorations();

    this.scene.start('MenuScene');
  }

  // ── helpers ──────────────────────────────────────────────

  _gfx() { return this.make.graphics({ x: 0, y: 0, add: false }); }

  _save(g, key, w, h) { g.generateTexture(key, w, h); g.destroy(); }

  /** Draw a filled + stroked star using fillPoints/strokePoints. */
  _drawStar(g, cx, cy, points, outerR, innerR) {
    const step = Math.PI / points;
    const pts  = [];
    for (let i = 0; i < points * 2; i++) {
      const r     = i % 2 === 0 ? outerR : innerR;
      const angle = i * step - Math.PI / 2;
      pts.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
    }
    g.fillPoints(pts, true);
    g.strokePoints(pts, true);
  }

  // ── player sprites ────────────────────────────────────────

  _makePlayer(key, bodyColor, shirtColor, hairColor, W = 40, H = 56, camo = false, pantsColor = 0x334477) {
    const g  = this._gfx();
    // Lina braucht oben Platz für die Katzenohren am Haarreif
    const padTop = key === 'lina' ? 5 : 0;
    g.translateCanvas(0, padTop);
    const cx = W / 2;

    // Proportionen relativ zu W/H berechnen
    const headR   = W * 0.32;
    const headY   = H * 0.26;
    const bodyTop = H * 0.38;
    const bodyH   = H * 0.35;
    const bodyW   = W * 0.6;
    const bodyX   = cx - bodyW / 2;
    const legTop  = bodyTop + bodyH;
    const legH    = H * 0.20;
    const legW    = bodyW * 0.38;
    const shoeH   = H * 0.10;

    // legs
    g.lineStyle(2, 0x000000, 1);
    g.fillStyle(pantsColor, 1);
    g.fillRect(bodyX,           legTop, legW, legH); g.strokeRect(bodyX,           legTop, legW, legH);
    g.fillRect(bodyX + bodyW - legW, legTop, legW, legH); g.strokeRect(bodyX + bodyW - legW, legTop, legW, legH);

    // shoes
    g.fillStyle(0x221100, 1);
    g.fillRoundedRect(bodyX - 1,               legTop + legH - 2, legW + 3, shoeH, 2);
    g.strokeRoundedRect(bodyX - 1,             legTop + legH - 2, legW + 3, shoeH, 2);
    g.fillRoundedRect(bodyX + bodyW - legW - 1, legTop + legH - 2, legW + 3, shoeH, 2);
    g.strokeRoundedRect(bodyX + bodyW - legW - 1, legTop + legH - 2, legW + 3, shoeH, 2);

    // Arme (hinter dem Körper): Ärmel, Unterarm, Hand
    const armW    = W * 0.13;
    const sleeveH = bodyH * 0.5;
    const armH    = bodyH * 0.85;
    [bodyX - armW + 1, bodyX + bodyW - 1].forEach(ax => {
      g.lineStyle(1.5, 0x000000, 1);
      g.fillStyle(0xffcc99, 1);
      g.fillRect(ax, bodyTop + 2, armW, armH);
      g.strokeRect(ax, bodyTop + 2, armW, armH);
      g.fillCircle(ax + armW / 2, bodyTop + 2 + armH, armW * 0.62);
      g.strokeCircle(ax + armW / 2, bodyTop + 2 + armH, armW * 0.62);
      g.fillStyle(shirtColor, 1);
      g.fillRect(ax, bodyTop + 1, armW, sleeveH);
      g.strokeRect(ax, bodyTop + 1, armW, sleeveH);
      if (key === 'leo') {
        // Trikot: weißes Ärmelbündchen
        g.fillStyle(0xffffff, 1);
        g.fillRect(ax + 1, bodyTop + sleeveH - 1.5, armW - 2, 2);
      }
    });

    // body / shirt
    g.fillStyle(shirtColor, 1);
    g.fillRoundedRect(bodyX, bodyTop, bodyW, bodyH, 3);
    if (camo) {
      // Camouflage-Flecken
      const spots = [
        [bodyX + bodyW*0.1, bodyTop + bodyH*0.1, bodyW*0.28, bodyH*0.28, 0x2d4a1a],
        [bodyX + bodyW*0.5, bodyTop + bodyH*0.05, bodyW*0.35, bodyH*0.22, 0x6b8a3a],
        [bodyX + bodyW*0.2, bodyTop + bodyH*0.45, bodyW*0.30, bodyH*0.25, 0x2d4a1a],
        [bodyX + bodyW*0.6, bodyTop + bodyH*0.50, bodyW*0.28, bodyH*0.30, 0x5a7a2a],
        [bodyX + bodyW*0.05,bodyTop + bodyH*0.70, bodyW*0.40, bodyH*0.22, 0x6b8a3a],
        [bodyX + bodyW*0.55,bodyTop + bodyH*0.75, bodyW*0.30, bodyH*0.18, 0x2d4a1a],
      ];
      spots.forEach(([sx, sy, sw, sh, sc]) => {
        g.fillStyle(sc, 0.85);
        g.fillEllipse(sx + sw/2, sy + sh/2, sw, sh);
      });
    }
    if (key === 'leo') {
      // Trikot: weiße Seitenstreifen
      g.fillStyle(0xffffff, 1);
      g.fillRect(bodyX + 2, bodyTop + 2, 1.2, bodyH - 3);
      g.fillRect(bodyX + bodyW - 3.2, bodyTop + 2, 1.2, bodyH - 3);
    }
    g.lineStyle(2, 0x000000, 1);
    g.strokeRoundedRect(bodyX, bodyTop, bodyW, bodyH, 3);

    if (key === 'leo') {
      // Rotes Auto auf dem Trikot
      const carW = bodyW * 0.62, carH = bodyH * 0.2;
      const carX = cx - carW / 2, carY = bodyTop + bodyH * 0.58;
      g.lineStyle(1, 0x000000, 1);
      g.fillStyle(0xff2222, 1);
      // Dach mit Fenster
      g.fillRoundedRect(cx - carW * 0.3, carY - carH * 0.85, carW * 0.6, carH, 1.5);
      g.strokeRoundedRect(cx - carW * 0.3, carY - carH * 0.85, carW * 0.6, carH, 1.5);
      // Karosserie
      g.fillRoundedRect(carX, carY, carW, carH, 1.5);
      g.strokeRoundedRect(carX, carY, carW, carH, 1.5);
      g.fillStyle(0xaaddff, 1);
      g.fillRect(cx - carW * 0.2, carY - carH * 0.6, carW * 0.4, carH * 0.5);
      // Räder
      g.fillStyle(0x111111, 1);
      g.fillCircle(carX + carW * 0.25, carY + carH, carH * 0.55);
      g.fillCircle(carX + carW * 0.75, carY + carH, carH * 0.55);
    } else if (key === 'lina') {
      // Herz mit Katze auf dem Shirt
      const s  = W * 0.16;
      const hy = bodyTop + bodyH * 0.56;
      g.fillStyle(0xe8174f, 1);
      g.fillCircle(cx - s * 0.5, hy, s * 0.56);
      g.fillCircle(cx + s * 0.5, hy, s * 0.56);
      g.fillTriangle(cx - s * 1.04, hy + s * 0.15, cx + s * 1.04, hy + s * 0.15, cx, hy + s * 1.2);
      // Katzenkopf mit Ohren
      const ky = hy + s * 0.25, kr = s * 0.4;
      g.fillStyle(0xffffff, 1);
      g.fillCircle(cx, ky, kr);
      g.fillTriangle(cx - kr, ky - kr * 0.2, cx - kr * 0.85, ky - kr * 1.45, cx - kr * 0.2, ky - kr * 0.85);
      g.fillTriangle(cx + kr, ky - kr * 0.2, cx + kr * 0.85, ky - kr * 1.45, cx + kr * 0.2, ky - kr * 0.85);
      g.fillStyle(0x000000, 1);
      g.fillRect(cx - kr * 0.5, ky - kr * 0.15, 1, 1);
      g.fillRect(cx + kr * 0.5 - 1, ky - kr * 0.15, 1, 1);
    } else {
      // Stern-Abzeichen auf dem Shirt
      g.fillStyle(0xffdd00, 1);
      g.lineStyle(1.5, 0x000000, 1);
      this._drawStar(g, cx, bodyTop + bodyH * 0.45, 5, W * 0.13, W * 0.07);
    }

    // head
    g.lineStyle(2, 0x000000, 1);
    g.fillStyle(0xffcc99, 1);
    g.fillCircle(cx, headY, headR); g.strokeCircle(cx, headY, headR);

    // eyes
    const eyeY  = headY - headR * 0.1;
    const eyeOff = headR * 0.38;
    g.fillStyle(0x000000, 1);
    g.fillCircle(cx - eyeOff, eyeY, headR * 0.18);
    g.fillCircle(cx + eyeOff, eyeY, headR * 0.18);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(cx - eyeOff + 1, eyeY - 1, headR * 0.07);
    g.fillCircle(cx + eyeOff + 1, eyeY - 1, headR * 0.07);

    // smile
    g.lineStyle(1.5, 0x000000, 1);
    g.beginPath();
    g.arc(cx, headY + headR * 0.25, headR * 0.35, 0.2, Math.PI - 0.2, false);
    g.strokePath();

    // Haare
    g.fillStyle(hairColor, 1);
    if (key === 'lina') {
      // Lange blonde Haare bis auf die Schultern, Pony über den Augen
      g.lineStyle(1.5, 0xaa8800, 1);
      const strandW = headR * 0.42;
      const strandY = headY - headR * 0.6;
      const strandH = headR * 1.75;
      g.fillRoundedRect(cx - headR * 1.12, strandY, strandW, strandH, 3);
      g.strokeRoundedRect(cx - headR * 1.12, strandY, strandW, strandH, 3);
      g.fillRoundedRect(cx + headR * 1.12 - strandW, strandY, strandW, strandH, 3);
      g.strokeRoundedRect(cx + headR * 1.12 - strandW, strandY, strandW, strandH, 3);
      // Pony (endet oberhalb der Augen)
      g.fillStyle(hairColor, 1);
      g.fillEllipse(cx, headY - headR * 0.68, headR * 2.2, headR * 0.74);
      g.strokeEllipse(cx, headY - headR * 0.68, headR * 2.2, headR * 0.74);
      // Haarreif mit Katzenohren
      const bandR = headR * 1.0;
      [-1, 1].forEach(side => {
        const a  = Math.PI * 1.5 + side * Math.PI * 0.22;   // Position auf dem Reif
        const da = Math.PI * 0.09;                           // halbe Ohrbreite
        const p1 = [cx + Math.cos(a - da) * bandR, headY + Math.sin(a - da) * bandR];
        const p2 = [cx + Math.cos(a + da) * bandR, headY + Math.sin(a + da) * bandR];
        const tip = [cx + Math.cos(a) * headR * 1.5, headY + Math.sin(a) * headR * 1.5];
        g.fillStyle(0xff4499, 1);
        g.lineStyle(1.5, 0x000000, 1);
        g.fillTriangle(p1[0], p1[1], p2[0], p2[1], tip[0], tip[1]);
        g.strokeTriangle(p1[0], p1[1], p2[0], p2[1], tip[0], tip[1]);
        // Inneres Ohr
        const mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
        g.fillStyle(0xffccee, 1);
        g.fillTriangle(
          (p1[0] + mid[0]) / 2, (p1[1] + mid[1]) / 2,
          (p2[0] + mid[0]) / 2, (p2[1] + mid[1]) / 2,
          (tip[0] * 2 + mid[0]) / 3, (tip[1] * 2 + mid[1]) / 3
        );
      });
      g.lineStyle(4, 0x000000, 1);
      g.beginPath(); g.arc(cx, headY, bandR, Math.PI * 1.12, Math.PI * 1.88, false); g.strokePath();
      g.lineStyle(2.2, 0xff4499, 1);
      g.beginPath(); g.arc(cx, headY, bandR, Math.PI * 1.12, Math.PI * 1.88, false); g.strokePath();

      // Kleine orange Katze im Arm
      const kx = bodyX + bodyW + 1, ky = bodyTop + bodyH * 0.68;
      g.lineStyle(1.2, 0x000000, 1);
      g.fillStyle(0xff9933, 1);
      // Schwanz hängt herunter
      g.fillRect(kx + 3, ky + 2, 1.6, 6); g.strokeRect(kx + 3, ky + 2, 1.6, 6);
      // Körper
      g.fillEllipse(kx - 1, ky + 1, 12, 8); g.strokeEllipse(kx - 1, ky + 1, 12, 8);
      // Ohren + Kopf
      g.fillTriangle(kx - 3.5, ky - 6, kx - 3, ky - 11, kx - 0.5, ky - 8);
      g.strokeTriangle(kx - 3.5, ky - 6, kx - 3, ky - 11, kx - 0.5, ky - 8);
      g.fillTriangle(kx + 3.5, ky - 6, kx + 3, ky - 11, kx + 0.5, ky - 8);
      g.strokeTriangle(kx + 3.5, ky - 6, kx + 3, ky - 11, kx + 0.5, ky - 8);
      g.fillCircle(kx, ky - 5, 4.5); g.strokeCircle(kx, ky - 5, 4.5);
      g.fillStyle(0x000000, 1);
      g.fillRect(kx - 2.2, ky - 6, 1.2, 1.4);
      g.fillRect(kx + 1, ky - 6, 1.2, 1.4);
      g.fillStyle(0xff6699, 1);
      g.fillRect(kx - 0.6, ky - 4, 1.2, 1);
      // Linas Unterarm hält die Katze von unten
      g.fillStyle(0xffcc99, 1);
      g.lineStyle(1.2, 0x000000, 1);
      g.fillRoundedRect(kx - 8, ky + 3.5, 13, 3.2, 1.5);
      g.strokeRoundedRect(kx - 8, ky + 3.5, 13, 3.2, 1.5);
      g.fillCircle(kx - 7.5, ky + 5, 2.2); g.strokeCircle(kx - 7.5, ky + 5, 2.2);
    } else if (key === 'leo') {
      // Kurze, glatte blonde Haare
      g.lineStyle(1.5, 0xaa8800, 1);
      g.fillEllipse(cx, headY - headR * 0.66, headR * 2.1, headR * 0.72);
      g.strokeEllipse(cx, headY - headR * 0.66, headR * 2.1, headR * 0.72);
      // Koteletten seitlich
      g.fillStyle(hairColor, 1);
      g.fillRect(cx - headR * 0.98, headY - headR * 0.6, headR * 0.22, headR * 0.45);
      g.fillRect(cx + headR * 0.76, headY - headR * 0.6, headR * 0.22, headR * 0.45);
    } else if (key === 'yaro') {
      // Kurzes, dunkles Militar-Haar (Buzzcut)
      g.lineStyle(1.5, 0x1a0e06, 1);
      g.fillStyle(hairColor, 1);
      // flache Kappe oben auf dem Kopf
      g.fillRect(cx - headR * 0.85, headY - headR * 1.0, headR * 1.7, headR * 0.6);
      g.strokeRect(cx - headR * 0.85, headY - headR * 1.0, headR * 1.7, headR * 0.6);
      // Haaransatz seitlich
      g.fillRect(cx - headR * 0.9, headY - headR * 0.55, headR * 0.22, headR * 0.5);
      g.fillRect(cx + headR * 0.68, headY - headR * 0.55, headR * 0.22, headR * 0.5);
    }

    this._save(g, key, W, H + padTop);
  }

  // ── platforms ─────────────────────────────────────────────

  _makePlatform(key, topColor, bodyColor, lineColor) {
    const W = 96, H = 24;
    const g = this._gfx();

    g.fillStyle(bodyColor, 1);
    g.fillRect(0, 6, W, H - 6);
    g.lineStyle(3, 0x000000, 1);
    g.strokeRect(0, 6, W, H - 6);

    g.fillStyle(topColor, 1);
    g.fillRect(0, 0, W, 8);
    g.strokeRect(0, 0, W, 8);

    g.lineStyle(1, lineColor, 0.5);
    for (let x = 16; x < W; x += 22) {
      g.lineBetween(x, 9, x, H - 3);
    }

    this._save(g, key, W, H);
  }

  // ── enemies ───────────────────────────────────────────────

  _makeEnemy(key, bodyColor, darkColor) {
    const W = 40, H = 40;
    const g = this._gfx();

    // body
    g.fillStyle(bodyColor, 1);
    g.fillCircle(20, 24, 16);
    g.lineStyle(3, 0x000000, 1);
    g.strokeCircle(20, 24, 16);

    // angry eyes
    g.fillStyle(0xff2222, 1);
    g.fillCircle(13, 20, 5); g.fillCircle(27, 20, 5);
    g.fillStyle(0x000000, 1);
    g.fillCircle(13, 20, 2.5); g.fillCircle(27, 20, 2.5);

    // eyebrows
    g.lineStyle(3, 0x000000, 1);
    g.lineBetween(8,  14, 18, 17);
    g.lineBetween(22, 17, 32, 14);

    // mouth
    g.lineStyle(2.5, 0x000000, 1);
    g.beginPath();
    g.arc(20, 30, 5, Math.PI + 0.4, 2 * Math.PI - 0.4, false);
    g.strokePath();

    // horns
    g.fillStyle(darkColor, 1);
    g.lineStyle(2, 0x000000, 1);
    g.fillTriangle(10, 10, 14, 1, 18, 10); g.strokeTriangle(10, 10, 14, 1, 18, 10);
    g.fillTriangle(22, 10, 26, 1, 30, 10); g.strokeTriangle(22, 10, 26, 1, 30, 10);

    this._save(g, key, W, H);
  }

  // ── collectible star ──────────────────────────────────────

  _makeStar() {
    const g = this._gfx();
    g.fillStyle(0xffdd00, 1);
    g.lineStyle(2.5, 0x000000, 1);
    this._drawStar(g, 16, 16, 5, 14, 6);
    g.fillStyle(0xffffff, 0.6);
    g.fillCircle(11, 11, 3);
    this._save(g, 'star', 32, 32);
  }

  // ── heart (HUD life) ─────────────────────────────────────

  _makeHeart() {
    const g = this._gfx();

    // draw heart with two top circles + bottom triangle
    g.fillStyle(0xff3355, 1);
    g.fillCircle(10, 11, 8);
    g.fillCircle(22, 11, 8);
    g.fillTriangle(2, 15, 16, 30, 30, 15);

    g.lineStyle(2, 0x000000, 1);
    g.strokeCircle(10, 11, 8);
    g.strokeCircle(22, 11, 8);
    g.strokeTriangle(2, 15, 16, 30, 30, 15);

    // cover the gap between circles and triangle
    g.lineStyle(0, 0, 0);
    g.fillStyle(0xff3355, 1);
    g.fillRect(2, 11, 28, 6);

    // shine
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(8, 9, 3);

    this._save(g, 'heart', 32, 32);
  }

  // ── portal (level goal) ──────────────────────────────────

  _makePortal() {
    const W = 60, H = 80;
    const g = this._gfx();

    g.fillStyle(0x6600cc, 0.5);
    g.fillEllipse(30, 40, 44, 68);

    g.lineStyle(5, 0xaa00ff, 1);
    g.strokeEllipse(30, 40, 50, 74);
    g.lineStyle(2.5, 0xff88ff, 1);
    g.strokeEllipse(30, 40, 36, 56);

    g.fillStyle(0xffffff, 0.8);
    [[18,28],[36,20],[40,46],[20,54],[30,35]].forEach(([x,y]) => g.fillCircle(x, y, 2));

    this._save(g, 'portal', W, H);
  }

  // ── level backgrounds ────────────────────────────────────

  _makeBackground(key, colors) {
    const W = 960, H = 540;
    const g = this._gfx();
    const step = Math.ceil(H / colors.length);
    colors.forEach((c, i) => {
      g.fillStyle(c, 1);
      g.fillRect(0, i * step, W, step + 2);
    });
    this._save(g, key, W, H);
  }

  // ── decorative objects ────────────────────────────────────

  _makeDecoration() {
    // bush
    const b = this._gfx();
    b.fillStyle(0x33aa33, 1);
    b.lineStyle(2, 0x000000, 1);
    b.fillCircle(22, 22, 18); b.strokeCircle(22, 22, 18);
    b.fillCircle(36, 24, 14); b.strokeCircle(36, 24, 14);
    b.fillCircle(9,  24, 12); b.strokeCircle(9, 24, 12);
    this._save(b, 'bush', 52, 38);

    // Katzen-Wolken
    this._makeCatCloudHead();
    this._makeCatCloudLying();

    // crystal decoration
    const cr = this._gfx();
    cr.fillStyle(0xcc44ff, 1);
    cr.lineStyle(2, 0x000000, 1);
    cr.fillTriangle(15, 0, 0, 32, 30, 32); cr.strokeTriangle(15, 0, 0, 32, 30, 32);
    cr.fillStyle(0xffffff, 0.35);
    cr.fillTriangle(15, 5, 9, 20, 20, 12);
    this._save(cr, 'crystal_deco', 32, 34);
  }

  // ── Katzen-Wolken ─────────────────────────────────────────

  // Zeichnet eine Wolken-Silhouette aus Kreisen + Dreiecken (Ohren):
  // erst Schatten/Umriss etwas größer und nach unten versetzt, dann weiß darüber.
  _drawCloudShape(g, circles, ears) {
    const outline = 0xa9bfdc;
    g.fillStyle(outline, 1);
    circles.forEach(([x, y, r]) => g.fillCircle(x, y + 3, r + 2));
    ears.forEach(([a, b, c]) => {
      g.fillTriangle(a[0] - 2, a[1] + 3, b[0], b[1] + 1, c[0] + 2, c[1] + 3);
    });
    g.fillStyle(0xffffff, 1);
    ears.forEach(([a, b, c]) => g.fillTriangle(a[0], a[1], b[0], b[1], c[0], c[1]));
    circles.forEach(([x, y, r]) => g.fillCircle(x, y, r));
    // inneres Ohr
    g.fillStyle(0xffd6e8, 1);
    ears.forEach(([a, b, c]) => {
      const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2;
      g.fillTriangle((a[0] + mx) / 2, (a[1] + my) / 2 + 2, b[0] + (mx - b[0]) * 0.3, b[1] + (my - b[1]) * 0.3,
                     (c[0] + mx) / 2, (c[1] + my) / 2 + 2);
    });
  }

  // Glückliches Katzengesicht (geschlossene Augen, Bäckchen, ω-Mund, Schnurrhaare)
  _drawCloudCatFace(g, x, y, s) {
    const line = 0x6a7fa8;
    g.lineStyle(2, line, 1);
    g.beginPath(); g.arc(x - 9 * s, y, 4 * s, Math.PI * 1.1, Math.PI * 1.9, false); g.strokePath();
    g.beginPath(); g.arc(x + 9 * s, y, 4 * s, Math.PI * 1.1, Math.PI * 1.9, false); g.strokePath();
    g.fillStyle(0xffa6c9, 0.7);
    g.fillEllipse(x - 15 * s, y + 6 * s, 8 * s, 5 * s);
    g.fillEllipse(x + 15 * s, y + 6 * s, 8 * s, 5 * s);
    g.fillStyle(0xff8fb8, 1);
    g.fillTriangle(x - 2 * s, y + 4 * s, x + 2 * s, y + 4 * s, x, y + 6 * s);
    g.lineStyle(1.5, line, 1);
    g.beginPath(); g.arc(x - 2 * s, y + 7 * s, 2 * s, 0, Math.PI, false); g.strokePath();
    g.beginPath(); g.arc(x + 2 * s, y + 7 * s, 2 * s, 0, Math.PI, false); g.strokePath();
    g.lineStyle(1, line, 0.6);
    g.lineBetween(x - 7 * s, y + 6 * s, x - 19 * s, y + 3 * s);
    g.lineBetween(x - 7 * s, y + 8 * s, x - 19 * s, y + 9 * s);
    g.lineBetween(x + 7 * s, y + 6 * s, x + 19 * s, y + 3 * s);
    g.lineBetween(x + 7 * s, y + 8 * s, x + 19 * s, y + 9 * s);
  }

  _makeCatCloudHead() {
    const g = this._gfx();
    const circles = [
      [50, 38, 24], [30, 44, 16], [70, 44, 16], [40, 54, 14], [60, 54, 14],
      [50, 56, 13], [24, 36, 11], [76, 36, 11], [18, 48, 9], [82, 48, 9]
    ];
    const ears = [
      [[26, 30], [32, 6], [48, 20]],
      [[74, 30], [68, 6], [52, 20]]
    ];
    this._drawCloudShape(g, circles, ears);
    this._drawCloudCatFace(g, 50, 40, 1);
    this._save(g, 'cloud_deco', 100, 74);
  }

  _makeCatCloudLying() {
    const g = this._gfx();
    const circles = [
      // Körper
      [58, 40, 16], [76, 36, 18], [96, 40, 15], [110, 45, 11], [68, 48, 13], [88, 49, 13], [48, 48, 11],
      // Kopf
      [34, 34, 18], [22, 42, 10],
      // Schwanz, eingerollt nach oben
      [118, 36, 7], [123, 28, 6], [125, 20, 6], [121, 13, 5]
    ];
    const ears = [
      [[18, 26], [20, 6], [32, 17]],
      [[50, 26], [46, 6], [36, 17]]
    ];
    this._drawCloudShape(g, circles, ears);
    this._drawCloudCatFace(g, 34, 34, 0.75);
    // Pfötchen vorne
    g.lineStyle(1.5, 0xa9bfdc, 1);
    g.beginPath(); g.arc(46, 55, 5, Math.PI * 1.1, Math.PI * 1.9, false); g.strokePath();
    g.beginPath(); g.arc(56, 56, 5, Math.PI * 1.1, Math.PI * 1.9, false); g.strokePath();
    this._save(g, 'cloud_cat_lying', 134, 68);
  }

  // ── Kuschel-Level ─────────────────────────────────────────

  // Kissen-Plattform (wird nebeneinander gekachelt)
  _makePillowPlatform(key) {
    const W = 96, H = 24;
    const g = this._gfx();
    g.fillStyle(0xc9b6ff, 1);
    g.lineStyle(2, 0x6b4fa8, 1);
    g.fillRoundedRect(1, 1, W - 2, H - 2, 10);
    g.strokeRoundedRect(1, 1, W - 2, H - 2, 10);
    // heller oberer Rand (weich)
    g.fillStyle(0xe4daff, 1);
    g.fillRoundedRect(6, 3, W - 12, 6, 3);
    // Knöpfe
    g.fillStyle(0x8f72d6, 1);
    [24, 48, 72].forEach(x => g.fillCircle(x, 14, 2.2));
    // Nähte zu den Knöpfen
    g.lineStyle(1, 0x8f72d6, 0.6);
    [24, 48, 72].forEach(x => {
      g.lineBetween(x - 6, 10, x, 14); g.lineBetween(x + 6, 10, x, 14);
      g.lineBetween(x - 6, 18, x, 14); g.lineBetween(x + 6, 18, x, 14);
    });
    this._save(g, key, W, H);
  }

  // Schwebende karierte Kuscheldecke (ersetzt die Wolken)
  _makeBlanket(key, base, stripe, stitch) {
    const W = 120, H = 66;
    const g = this._gfx();
    const x0 = 8, y0 = 6, bw = 104, bh = 46;

    // Schatten
    g.fillStyle(0x000000, 0.12);
    g.fillRoundedRect(x0 + 3, y0 + 5, bw, bh, 8);
    // Decke
    g.fillStyle(base, 1);
    g.fillRoundedRect(x0, y0, bw, bh, 8);
    // Karomuster
    g.fillStyle(stripe, 0.55);
    for (let x = x0 + 12; x < x0 + bw - 6; x += 22) g.fillRect(x, y0 + 2, 8, bh - 4);
    for (let y = y0 + 10; y < y0 + bh - 6; y += 16) g.fillRect(x0 + 2, y, bw - 4, 6);
    g.fillStyle(0xffffff, 0.25);
    for (let x = x0 + 12; x < x0 + bw - 6; x += 22) {
      for (let y = y0 + 10; y < y0 + bh - 6; y += 16) g.fillRect(x, y, 8, 6);
    }
    // Umriss
    g.lineStyle(2, 0x000000, 0.55);
    g.strokeRoundedRect(x0, y0, bw, bh, 8);
    // gestrichelte Naht
    g.lineStyle(1.5, stitch, 0.9);
    for (let x = x0 + 8; x < x0 + bw - 8; x += 8) {
      g.lineBetween(x, y0 + 5, x + 4, y0 + 5);
      g.lineBetween(x, y0 + bh - 5, x + 4, y0 + bh - 5);
    }
    for (let y = y0 + 9; y < y0 + bh - 8; y += 8) {
      g.lineBetween(x0 + 5, y, x0 + 5, y + 4);
      g.lineBetween(x0 + bw - 5, y, x0 + bw - 5, y + 4);
    }
    // Fransen unten
    g.lineStyle(2, stripe, 1);
    for (let x = x0 + 6; x <= x0 + bw - 6; x += 7) g.lineBetween(x, y0 + bh, x + 1, y0 + bh + 7);
    this._save(g, key, W, H);
  }

  // Teddybär zum Kuscheln (sitzend)
  _makeTeddy() {
    const W = 44, H = 46;
    const g = this._gfx();
    const cx = 22, fur = 0xb87a45, light = 0xe8c49a;
    g.lineStyle(2, 0x000000, 1);
    g.fillStyle(fur, 1);
    // Beine
    g.fillCircle(cx - 9, 40, 6); g.strokeCircle(cx - 9, 40, 6);
    g.fillCircle(cx + 9, 40, 6); g.strokeCircle(cx + 9, 40, 6);
    // Bauch/Körper
    g.fillEllipse(cx, 32, 24, 22); g.strokeEllipse(cx, 32, 24, 22);
    // Arme
    g.fillEllipse(cx - 12, 30, 8, 12); g.strokeEllipse(cx - 12, 30, 8, 12);
    g.fillEllipse(cx + 12, 30, 8, 12); g.strokeEllipse(cx + 12, 30, 8, 12);
    // Ohren
    g.fillCircle(cx - 10, 6, 5); g.strokeCircle(cx - 10, 6, 5);
    g.fillCircle(cx + 10, 6, 5); g.strokeCircle(cx + 10, 6, 5);
    g.fillStyle(light, 1);
    g.fillCircle(cx - 10, 6, 2.5); g.fillCircle(cx + 10, 6, 2.5);
    // Kopf
    g.fillStyle(fur, 1);
    g.fillCircle(cx, 14, 11); g.strokeCircle(cx, 14, 11);
    // Schnauze, Bauch, Fußsohlen
    g.fillStyle(light, 1);
    g.fillEllipse(cx, 18, 10, 7);
    g.fillEllipse(cx, 33, 13, 12);
    g.fillCircle(cx - 9, 41, 3); g.fillCircle(cx + 9, 41, 3);
    // Augen, Nase, Mund
    g.fillStyle(0x000000, 1);
    g.fillCircle(cx - 4.5, 12, 1.6); g.fillCircle(cx + 4.5, 12, 1.6);
    g.fillEllipse(cx, 16.5, 4, 2.6);
    g.lineStyle(1.2, 0x000000, 1);
    g.beginPath(); g.arc(cx, 18, 2.5, 0.3, Math.PI - 0.3, false); g.strokePath();
    // Herz auf dem Bauch
    g.fillStyle(0xff4d88, 1);
    g.fillCircle(cx - 1.6, 32, 2); g.fillCircle(cx + 1.6, 32, 2);
    g.fillTriangle(cx - 3.6, 32.5, cx + 3.6, 32.5, cx, 36.5);
    this._save(g, 'teddy', W, H);
  }

  // Gegner: graue Staubfluse
  _makeDustBunny(key) {
    const W = 40, H = 42;
    const g = this._gfx();
    // Fusseln rundherum
    g.fillStyle(0x8a8a99, 1);
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      g.fillCircle(20 + Math.cos(a) * 14, 23 + Math.sin(a) * 14, 4.5);
    }
    g.fillStyle(0xa8a8b8, 1);
    g.fillCircle(20, 23, 14);
    g.fillStyle(0xc4c4d2, 1);
    g.fillCircle(16, 18, 5);
    // grummelige Augen
    g.fillStyle(0xffffff, 1);
    g.fillCircle(14, 22, 4.5); g.fillCircle(26, 22, 4.5);
    g.fillStyle(0x000000, 1);
    g.fillCircle(14.5, 23, 2.2); g.fillCircle(26.5, 23, 2.2);
    g.lineStyle(2, 0x000000, 1);
    g.lineBetween(9, 17, 18, 19); g.lineBetween(22, 19, 31, 17);
    g.beginPath(); g.arc(20, 33, 3.5, Math.PI + 0.5, 2 * Math.PI - 0.5, false); g.strokePath();
    this._save(g, key, W, H);
  }

  // ── Fußball-Level ─────────────────────────────────────────

  // Rasen-Plattform mit Kreidelinien
  _makePitchPlatform(key) {
    const W = 96, H = 24;
    const g = this._gfx();
    g.fillStyle(0x4caf50, 1);
    g.lineStyle(2, 0x2e7d32, 1);
    g.fillRoundedRect(1, 2, W - 2, H - 3, 3);
    g.strokeRoundedRect(1, 2, W - 2, H - 3, 3);
    // abwechselnde Mäh-Streifen
    g.fillStyle(0x5cbf5c, 0.6);
    g.fillRect(1, 2, 24, H - 3);
    g.fillRect(49, 2, 24, H - 3);
    // weiße Mittellinie
    g.lineStyle(2, 0xffffff, 0.9);
    g.lineBetween(4, 6, W - 4, 6);
    this._save(g, key, W, H);
  }

  // Fußball-Gegner: rollender Ball mit Fünfeck-Muster und frechen Augen
  _makeSoccerBall(key) {
    const W = 40, H = 40;
    const g = this._gfx();
    const cx = 20, cy = 20, r = 17;
    g.fillStyle(0xffffff, 1);
    g.lineStyle(2.5, 0x222222, 1);
    g.fillCircle(cx, cy, r); g.strokeCircle(cx, cy, r);
    // schwarze Fünfecke (vereinfacht als Sechsecke/Kreise)
    g.fillStyle(0x222222, 1);
    this._drawStar(g, cx, cy - 5, 5, 6, 3);
    [[cx - 11, cy + 3], [cx + 11, cy + 3], [cx - 6, cy + 14], [cx + 6, cy + 14]].forEach(([x, y]) => {
      g.fillCircle(x, y, 4);
    });
    g.lineStyle(1, 0x222222, 0.7);
    g.lineBetween(cx, cy - 5, cx - 11, cy + 3);
    g.lineBetween(cx, cy - 5, cx + 11, cy + 3);
    // freche Augen
    g.fillStyle(0xffffff, 1);
    g.fillCircle(cx - 6, cy - 2, 4.5); g.fillCircle(cx + 6, cy - 2, 4.5);
    g.fillStyle(0x1a1a2e, 1);
    g.fillCircle(cx - 5, cy - 2, 2.2); g.fillCircle(cx + 7, cy - 2, 2.2);
    g.lineStyle(2, 0x222222, 1);
    g.lineBetween(cx - 11, cy - 7, cx - 2, cy - 4);
    g.lineBetween(cx + 2, cy - 4, cx + 11, cy - 7);
    this._save(g, key, W, H);
  }

  _makePitchDecorations() {
    // Hütchen
    const c = this._gfx();
    c.fillStyle(0xff6a00, 1);
    c.lineStyle(2, 0x000000, 1);
    c.fillTriangle(16, 2, 2, 30, 30, 30); c.strokeTriangle(16, 2, 2, 30, 30, 30);
    c.fillStyle(0xffffff, 1);
    c.fillRect(5, 17, 22, 5); c.strokeRect(5, 17, 22, 5);
    this._save(c, 'cone_deco', 32, 32);

    // Mini-Tor mit Netz
    const g = this._gfx();
    g.lineStyle(3, 0xffffff, 1);
    g.strokeRect(2, 2, 40, 26);
    g.lineStyle(1, 0xdddddd, 0.8);
    for (let x = 6; x < 42; x += 7) g.lineBetween(x, 2, x, 28);
    for (let y = 6; y < 28; y += 7) g.lineBetween(2, y, 42, y);
    this._save(g, 'goal_deco', 44, 30);

    // Wimpelkette (Dreiecksfähnchen am Himmel)
    const p = this._gfx();
    const colors = [0xff4444, 0xffd54f, 0x4faaff, 0x66cc66];
    p.lineStyle(2, 0x555555, 1);
    p.lineBetween(0, 4, 120, 4);
    colors.forEach((col, i) => {
      const x = 8 + i * 28;
      p.fillStyle(col, 1);
      p.fillTriangle(x, 4, x + 12, 4, x + 6, 20);
      p.lineStyle(1, 0x000000, 0.6);
      p.strokeTriangle(x, 4, x + 12, 4, x + 6, 20);
    });
    this._save(p, 'pennant_deco', 120, 24);
  }

  // ── Katzen-Level ──────────────────────────────────────────

  // Sitzende Katze, von vorne
  _makeCat(key, furColor, darkColor, eyeColor) {
    const W = 44, H = 44;
    const g = this._gfx();
    const cx = 22;

    // Schwanz (geschwungen, rechts)
    g.lineStyle(6, 0x000000, 1);
    g.beginPath(); g.arc(36, 30, 9, Math.PI * 0.5, Math.PI * 1.6, true); g.strokePath();
    g.lineStyle(3.5, furColor, 1);
    g.beginPath(); g.arc(36, 30, 9, Math.PI * 0.5, Math.PI * 1.6, true); g.strokePath();

    // Körper
    g.fillStyle(furColor, 1);
    g.lineStyle(2, 0x000000, 1);
    g.fillEllipse(cx, 33, 26, 20); g.strokeEllipse(cx, 33, 26, 20);
    // Pfoten
    g.fillEllipse(cx - 6, 42, 8, 4); g.strokeEllipse(cx - 6, 42, 8, 4);
    g.fillEllipse(cx + 6, 42, 8, 4); g.strokeEllipse(cx + 6, 42, 8, 4);

    // Ohren
    g.fillTriangle(cx - 11, 14, cx - 10, 1, cx - 2, 8); g.strokeTriangle(cx - 11, 14, cx - 10, 1, cx - 2, 8);
    g.fillTriangle(cx + 11, 14, cx + 10, 1, cx + 2, 8); g.strokeTriangle(cx + 11, 14, cx + 10, 1, cx + 2, 8);
    g.fillStyle(0xffaacc, 1);
    g.fillTriangle(cx - 9, 11, cx - 9, 4, cx - 5, 8);
    g.fillTriangle(cx + 9, 11, cx + 9, 4, cx + 5, 8);

    // Kopf
    g.fillStyle(furColor, 1);
    g.lineStyle(2, 0x000000, 1);
    g.fillCircle(cx, 15, 11); g.strokeCircle(cx, 15, 11);

    // Streifen auf der Stirn
    g.lineStyle(1.5, darkColor, 1);
    g.lineBetween(cx, 5, cx, 9); g.lineBetween(cx - 4, 6, cx - 3, 9); g.lineBetween(cx + 4, 6, cx + 3, 9);

    // Augen
    g.fillStyle(eyeColor, 1);
    g.fillCircle(cx - 5, 14, 3); g.fillCircle(cx + 5, 14, 3);
    g.fillStyle(0x000000, 1);
    g.fillEllipse(cx - 5, 14, 1.6, 4.5); g.fillEllipse(cx + 5, 14, 1.6, 4.5);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(cx - 4, 13, 0.9); g.fillCircle(cx + 6, 13, 0.9);

    // Nase + Mund
    g.fillStyle(0xff6699, 1);
    g.fillTriangle(cx - 2, 18, cx + 2, 18, cx, 20);
    g.lineStyle(1, 0x000000, 1);
    g.beginPath(); g.arc(cx - 1.5, 20, 1.5, 0, Math.PI, false); g.strokePath();
    g.beginPath(); g.arc(cx + 1.5, 20, 1.5, 0, Math.PI, false); g.strokePath();

    // Schnurrhaare
    g.lineStyle(1, 0x000000, 0.8);
    g.lineBetween(cx - 4, 19, cx - 13, 17); g.lineBetween(cx - 4, 20, cx - 13, 21);
    g.lineBetween(cx + 4, 19, cx + 13, 17); g.lineBetween(cx + 4, 20, cx + 13, 21);

    this._save(g, key, W, H);
  }

  // Gegner: rollendes Wollknäuel mit Augen
  _makeYarnEnemy(key, color) {
    const W = 40, H = 40;
    const g = this._gfx();

    // loser Faden
    g.lineStyle(2, color, 1);
    g.beginPath(); g.arc(34, 36, 5, Math.PI, Math.PI * 1.9, false); g.strokePath();

    g.fillStyle(color, 1);
    g.lineStyle(3, 0x000000, 1);
    g.fillCircle(20, 22, 16); g.strokeCircle(20, 22, 16);

    // Wollfäden
    g.lineStyle(1.5, 0xcc3377, 1);
    g.beginPath(); g.arc(8, 14, 16, -0.2, 1.3, false); g.strokePath();
    g.beginPath(); g.arc(34, 34, 18, Math.PI, Math.PI * 1.45, false); g.strokePath();
    g.beginPath(); g.arc(30, 8, 14, Math.PI * 0.55, Math.PI * 1.0, false); g.strokePath();

    // freche Augen
    g.fillStyle(0xffffff, 1);
    g.fillCircle(14, 20, 5); g.fillCircle(26, 20, 5);
    g.fillStyle(0x000000, 1);
    g.fillCircle(15, 21, 2.5); g.fillCircle(27, 21, 2.5);
    g.lineStyle(2.5, 0x000000, 1);
    g.lineBetween(9, 14, 18, 16);
    g.lineBetween(22, 16, 31, 14);

    this._save(g, key, W, H);
  }

  _makeCatDecorations() {
    // Fisch
    const f = this._gfx();
    f.fillStyle(0x66ccff, 1);
    f.lineStyle(2, 0x000000, 1);
    f.fillEllipse(16, 12, 24, 14); f.strokeEllipse(16, 12, 24, 14);
    f.fillTriangle(27, 12, 36, 4, 36, 20); f.strokeTriangle(27, 12, 36, 4, 36, 20);
    f.fillStyle(0x000000, 1);
    f.fillCircle(9, 10, 1.8);
    this._save(f, 'fish_deco', 38, 24);

    // Korb mit Wollknäueln
    const y = this._gfx();
    y.lineStyle(2, 0x000000, 1);
    [[12, 14, 0xff66aa], [26, 12, 0x66ccff], [19, 8, 0xffdd44]].forEach(([x, yy, c]) => {
      y.fillStyle(c, 1);
      y.fillCircle(x, yy, 8); y.strokeCircle(x, yy, 8);
    });
    y.fillStyle(0xbb8844, 1);
    y.fillRoundedRect(2, 16, 36, 16, 4); y.strokeRoundedRect(2, 16, 36, 16, 4);
    y.lineStyle(1, 0x7a5522, 1);
    for (let x = 8; x < 38; x += 6) y.lineBetween(x, 18, x, 30);
    this._save(y, 'yarn_deco', 40, 34);
  }
}
