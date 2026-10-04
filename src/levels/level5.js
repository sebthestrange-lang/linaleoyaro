export const level5 = {
  name: 'Das Kuschel-Level',
  levelIndex: 5,
  background: 'bg_kuschel',
  platformKey: 'platform_pillow',
  enemyType: 'staubfluse',
  worldWidth: 5400,
  worldHeight: 540,
  spawn: { x: 100, y: 400 },
  goal:  { x: 5280, y: 300 },

  ground: { y: 500, segments: [
    { x: 0, width: 5400 }
  ]},

  platforms: [
    { x: 300,  y: 400, width: 192 },
    { x: 560,  y: 310, width: 288 },
    { x: 920,  y: 230, width: 192 },
    { x: 1180, y: 330, width: 192 },
    { x: 1440, y: 410, width: 192 },
    { x: 1700, y: 310, width: 288 },
    { x: 2060, y: 220, width: 192 },
    { x: 2320, y: 320, width: 192 },
    { x: 2580, y: 410, width: 192 },
    { x: 2840, y: 310, width: 288 },
    { x: 3200, y: 220, width: 192 },
    { x: 3460, y: 320, width: 192 },
    { x: 3720, y: 240, width: 288 },
    { x: 4080, y: 330, width: 192 },
    { x: 4340, y: 240, width: 192 },
    { x: 4600, y: 340, width: 192 },
    { x: 4860, y: 260, width: 288 },
    { x: 5150, y: 290, width: 192 }
  ],

  enemies: [
    { x: 750,  y: 470 },
    { x: 680,  y: 280 },
    { x: 1280, y: 300 },
    { x: 1550, y: 470 },
    { x: 1820, y: 280 },
    { x: 2420, y: 290 },
    { x: 2750, y: 470 },
    { x: 2970, y: 280 },
    { x: 3560, y: 290 },
    { x: 3850, y: 470 },
    { x: 3870, y: 210 },
    { x: 4450, y: 470 },
    { x: 4680, y: 310 },
    { x: 4980, y: 230 }
  ],

  // Teddybären zum Kuscheln (y = Mittelpunkt, sitzen auf dem Boden/Kissen)
  friendText: 'Kuschel! +1',
  friends: [
    { key: 'teddy', x: 450,  y: 466 },
    { key: 'teddy', x: 720,  y: 276 },
    { key: 'teddy', x: 1010, y: 196 },
    { key: 'teddy', x: 1330, y: 466 },
    { key: 'teddy', x: 1860, y: 466 },
    { key: 'teddy', x: 2150, y: 186 },
    { key: 'teddy', x: 2670, y: 376 },
    { key: 'teddy', x: 3120, y: 466 },
    { key: 'teddy', x: 3290, y: 186 },
    { key: 'teddy', x: 3860, y: 206 },
    { key: 'teddy', x: 4220, y: 466 },
    { key: 'teddy', x: 4430, y: 206 },
    { key: 'teddy', x: 5010, y: 226 }
  ],

  collectibles: [
    { x: 390,  y: 360 },
    { x: 640,  y: 270 },
    { x: 780,  y: 270 },
    { x: 1000, y: 150 },
    { x: 1270, y: 290 },
    { x: 1530, y: 370 },
    { x: 1780, y: 270 },
    { x: 1920, y: 270 },
    { x: 2150, y: 140 },
    { x: 2410, y: 280 },
    { x: 2920, y: 270 },
    { x: 3060, y: 270 },
    { x: 3550, y: 280 },
    { x: 3800, y: 200 },
    { x: 3940, y: 200 },
    { x: 4170, y: 290 },
    { x: 4690, y: 300 },
    { x: 4940, y: 220 },
    { x: 5080, y: 220 },
    { x: 5240, y: 250 }
  ],

  // Kuscheldecken schweben statt Wolken am Himmel
  decorations: [
    { key: 'blanket_pink', x: 250,  y: 130 },
    { key: 'blanket_blue', x: 800,  y: 110 },
    { key: 'blanket_pink', x: 1400, y: 140 },
    { key: 'blanket_blue', x: 2000, y: 115 },
    { key: 'blanket_pink', x: 2600, y: 135 },
    { key: 'blanket_blue', x: 3300, y: 110 },
    { key: 'blanket_pink', x: 3950, y: 140 },
    { key: 'blanket_blue', x: 4600, y: 120 },
    { key: 'blanket_pink', x: 5200, y: 130 }
  ]
};
