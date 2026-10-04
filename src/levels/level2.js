export const level2 = {
  name: 'Die Wolkenstadt',
  levelIndex: 2,
  background: 'bg_cloud',
  platformKey: 'platform_cloud',
  enemyType: 'windgeist',
  worldWidth: 5200,
  worldHeight: 540,
  spawn: { x: 100, y: 420 },
  goal:  { x: 5080, y: 280 },

  ground: { y: 500, segments: [
    { x: 0, width: 5200 }
  ]},

  platforms: [
    { x: 0,    y: 460, width: 288 },
    { x: 320,  y: 380, width: 192 },
    { x: 560,  y: 300, width: 192 },
    { x: 780,  y: 380, width: 288 },
    { x: 1080, y: 290, width: 192 },
    { x: 1320, y: 370, width: 192 },
    { x: 1560, y: 270, width: 192 },
    { x: 1800, y: 350, width: 288 },
    { x: 2130, y: 250, width: 192 },
    { x: 2380, y: 350, width: 192 },
    { x: 2620, y: 260, width: 192 },
    { x: 2870, y: 360, width: 288 },
    { x: 3200, y: 250, width: 192 },
    { x: 3450, y: 350, width: 192 },
    { x: 3700, y: 260, width: 192 },
    { x: 3950, y: 360, width: 288 },
    { x: 4280, y: 250, width: 192 },
    { x: 4530, y: 340, width: 192 },
    { x: 4780, y: 250, width: 288 }
  ],

  enemies: [
    { x: 450,  y: 350 },
    { x: 700,  y: 270 },
    { x: 1000, y: 260 },
    { x: 1450, y: 340 },
    { x: 1700, y: 240 },
    { x: 1950, y: 320 },
    { x: 2250, y: 220 },
    { x: 2530, y: 320 },
    { x: 2780, y: 230 },
    { x: 3100, y: 330 },
    { x: 3350, y: 220 },
    { x: 3600, y: 320 },
    { x: 3850, y: 230 },
    { x: 4150, y: 330 },
    { x: 4650, y: 310 }
  ],

  collectibles: [
    { x: 160,  y: 420 },
    { x: 410,  y: 340 },
    { x: 650,  y: 260 },
    { x: 870,  y: 340 },
    { x: 1170, y: 250 },
    { x: 1410, y: 330 },
    { x: 1650, y: 230 },
    { x: 1890, y: 310 },
    { x: 2220, y: 210 },
    { x: 2470, y: 310 },
    { x: 2710, y: 220 },
    { x: 2960, y: 320 },
    { x: 3290, y: 210 },
    { x: 3540, y: 310 },
    { x: 3790, y: 220 },
    { x: 4040, y: 320 },
    { x: 4370, y: 210 },
    { x: 4620, y: 300 },
    { x: 4870, y: 210 }
  ],

  decorations: [
    { key: 'cloud_deco', x: 200,  y: 130 },
    { key: 'cloud_cat_lying', x: 700,  y: 100  },
    { key: 'cloud_deco', x: 1300, y: 140 },
    { key: 'cloud_cat_lying', x: 2000, y: 110  },
    { key: 'cloud_deco', x: 2800, y: 130 },
    { key: 'cloud_cat_lying', x: 3600, y: 105  },
    { key: 'cloud_deco', x: 4400, y: 125  }
  ]
};
