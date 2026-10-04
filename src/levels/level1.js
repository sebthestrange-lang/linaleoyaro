export const level1 = {
  name: 'Der Zauberwald',
  levelIndex: 1,
  background: 'bg_forest',
  platformKey: 'platform_grass',
  enemyType: 'waldgeist',
  worldWidth: 4800,
  worldHeight: 540,
  spawn: { x: 100, y: 380 },
  goal:  { x: 4680, y: 340 },

  // ground tiles (auto-generated as a row)
  ground: { y: 500, segments: [
    { x: 0,    width: 4800 }
  ]},

  platforms: [
    { x: 320,  y: 400, width: 192 },
    { x: 560,  y: 330, width: 192 },
    { x: 800,  y: 400, width: 192 },
    { x: 1050, y: 310, width: 192 },
    { x: 1280, y: 400, width: 192 },
    { x: 1520, y: 330, width: 288 },
    { x: 1850, y: 260, width: 192 },
    { x: 2100, y: 380, width: 192 },
    { x: 2350, y: 300, width: 192 },
    { x: 2600, y: 230, width: 192 },
    { x: 2850, y: 350, width: 288 },
    { x: 3150, y: 270, width: 192 },
    { x: 3400, y: 380, width: 192 },
    { x: 3650, y: 300, width: 288 },
    { x: 3950, y: 220, width: 192 },
    { x: 4200, y: 340, width: 192 },
    { x: 4450, y: 260, width: 288 }
  ],

  enemies: [
    { x: 700,  y: 470 },
    { x: 1100, y: 470 },
    { x: 1400, y: 300 },
    { x: 1700, y: 470 },
    { x: 2200, y: 470 },
    { x: 2500, y: 290 },
    { x: 2900, y: 320 },
    { x: 3200, y: 470 },
    { x: 3500, y: 270 },
    { x: 3800, y: 470 },
    { x: 4100, y: 470 }
  ],

  collectibles: [
    { x: 400,  y: 360 },
    { x: 640,  y: 290 },
    { x: 900,  y: 360 },
    { x: 1130, y: 270 },
    { x: 1600, y: 290 },
    { x: 1930, y: 220 },
    { x: 2180, y: 340 },
    { x: 2430, y: 260 },
    { x: 2680, y: 190 },
    { x: 2930, y: 310 },
    { x: 3230, y: 230 },
    { x: 3730, y: 260 },
    { x: 4030, y: 180 },
    { x: 4280, y: 300 },
    { x: 4530, y: 220 }
  ],

  decorations: [
    { key: 'bush', x: 200,  y: 478 },
    { key: 'bush', x: 500,  y: 478 },
    { key: 'bush', x: 950,  y: 478 },
    { key: 'bush', x: 1450, y: 478 },
    { key: 'bush', x: 2000, y: 478 },
    { key: 'bush', x: 2700, y: 478 },
    { key: 'bush', x: 3300, y: 478 },
    { key: 'bush', x: 4000, y: 478 },
    { key: 'cloud_deco', x: 300,  y: 110 },
    { key: 'cloud_cat_lying', x: 900,  y: 90 },
    { key: 'cloud_deco', x: 1600, y: 120 },
    { key: 'cloud_cat_lying', x: 2400, y: 100 },
    { key: 'cloud_deco', x: 3200, y: 115 },
    { key: 'cloud_cat_lying', x: 4100, y: 95 }
  ]
};
