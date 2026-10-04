export const level4 = {
  name: 'Das Katzen-Level',
  levelIndex: 4,
  background: 'bg_cat',
  platformKey: 'platform_cat',
  enemyType: 'wollknaeuel',
  worldWidth: 5400,
  worldHeight: 540,
  spawn: { x: 100, y: 400 },
  goal:  { x: 5280, y: 300 },

  ground: { y: 500, segments: [
    { x: 0, width: 5400 }
  ]},

  platforms: [
    { x: 280,  y: 410, width: 192 },
    { x: 540,  y: 320, width: 288 },
    { x: 900,  y: 240, width: 192 },
    { x: 1150, y: 340, width: 192 },
    { x: 1420, y: 420, width: 192 },
    { x: 1680, y: 320, width: 288 },
    { x: 2040, y: 230, width: 192 },
    { x: 2300, y: 330, width: 192 },
    { x: 2560, y: 420, width: 192 },
    { x: 2820, y: 320, width: 288 },
    { x: 3180, y: 230, width: 192 },
    { x: 3440, y: 330, width: 192 },
    { x: 3700, y: 250, width: 288 },
    { x: 4060, y: 340, width: 192 },
    { x: 4320, y: 250, width: 192 },
    { x: 4580, y: 350, width: 192 },
    { x: 4840, y: 270, width: 288 },
    { x: 5150, y: 290, width: 192 }
  ],

  enemies: [
    { x: 700,  y: 470 },
    { x: 650,  y: 290 },
    { x: 1250, y: 310 },
    { x: 1500, y: 470 },
    { x: 1800, y: 290 },
    { x: 2400, y: 300 },
    { x: 2700, y: 470 },
    { x: 2950, y: 290 },
    { x: 3550, y: 300 },
    { x: 3800, y: 470 },
    { x: 3850, y: 220 },
    { x: 4400, y: 470 },
    { x: 4650, y: 320 },
    { x: 4950, y: 240 }
  ],

  // Freundliche Katzen zum Streicheln (y = Mittelpunkt, sitzen auf dem Boden/Plattform)
  friendText: 'Miau! +1',
  friends: [
    { key: 'cat_orange', x: 420,  y: 467 },
    { key: 'cat_grey',   x: 690,  y: 287 },
    { key: 'cat_black',  x: 990,  y: 207 },
    { key: 'cat_white',  x: 1300, y: 467 },
    { key: 'cat_orange', x: 1820, y: 467 },
    { key: 'cat_white',  x: 2130, y: 197 },
    { key: 'cat_grey',   x: 2650, y: 387 },
    { key: 'cat_black',  x: 3100, y: 467 },
    { key: 'cat_orange', x: 3270, y: 197 },
    { key: 'cat_white',  x: 3840, y: 217 },
    { key: 'cat_grey',   x: 4200, y: 467 },
    { key: 'cat_black',  x: 4410, y: 217 },
    { key: 'cat_orange', x: 4990, y: 237 }
  ],

  collectibles: [
    { x: 370,  y: 370 },
    { x: 620,  y: 280 },
    { x: 760,  y: 280 },
    { x: 980,  y: 160 },
    { x: 1240, y: 300 },
    { x: 1510, y: 380 },
    { x: 1760, y: 280 },
    { x: 1900, y: 280 },
    { x: 2130, y: 150 },
    { x: 2390, y: 290 },
    { x: 2900, y: 280 },
    { x: 3040, y: 280 },
    { x: 3530, y: 290 },
    { x: 3780, y: 210 },
    { x: 3920, y: 210 },
    { x: 4150, y: 300 },
    { x: 4670, y: 310 },
    { x: 4920, y: 230 },
    { x: 5060, y: 230 },
    { x: 5240, y: 250 }
  ],

  decorations: [
    { key: 'yarn_deco', x: 200,  y: 488 },
    { key: 'fish_deco', x: 560,  y: 488 },
    { key: 'yarn_deco', x: 1100, y: 488 },
    { key: 'fish_deco', x: 1650, y: 488 },
    { key: 'yarn_deco', x: 2250, y: 488 },
    { key: 'fish_deco', x: 2900, y: 488 },
    { key: 'yarn_deco', x: 3450, y: 488 },
    { key: 'fish_deco', x: 4000, y: 488 },
    { key: 'yarn_deco', x: 4600, y: 488 },
    { key: 'fish_deco', x: 5100, y: 488 }
  ]
};
