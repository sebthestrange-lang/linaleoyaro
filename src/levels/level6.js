export const level6 = {
  name: 'Das Fußball-Level',
  levelIndex: 6,
  background: 'bg_pitch',
  platformKey: 'platform_pitch',
  enemyType: 'fussball',
  worldWidth: 5400,
  worldHeight: 540,
  spawn: { x: 100, y: 400 },
  goal:  { x: 5280, y: 300 },

  ground: { y: 500, segments: [
    { x: 0, width: 5400 }
  ]},

  platforms: [
    { x: 300,  y: 410, width: 192 },
    { x: 560,  y: 320, width: 288 },
    { x: 920,  y: 240, width: 192 },
    { x: 1180, y: 340, width: 192 },
    { x: 1440, y: 420, width: 192 },
    { x: 1700, y: 320, width: 288 },
    { x: 2060, y: 230, width: 192 },
    { x: 2320, y: 330, width: 192 },
    { x: 2580, y: 420, width: 192 },
    { x: 2840, y: 320, width: 288 },
    { x: 3200, y: 230, width: 192 },
    { x: 3460, y: 330, width: 192 },
    { x: 3720, y: 250, width: 288 },
    { x: 4080, y: 340, width: 192 },
    { x: 4340, y: 250, width: 192 },
    { x: 4600, y: 350, width: 192 },
    { x: 4860, y: 270, width: 288 },
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
    { x: 4950, y: 240 },
    { x: 5200, y: 470 }
  ],

  collectibles: [
    { x: 390,  y: 370 },
    { x: 640,  y: 280 },
    { x: 780,  y: 280 },
    { x: 1000, y: 160 },
    { x: 1270, y: 300 },
    { x: 1530, y: 380 },
    { x: 1780, y: 280 },
    { x: 1920, y: 280 },
    { x: 2150, y: 150 },
    { x: 2410, y: 290 },
    { x: 2920, y: 280 },
    { x: 3060, y: 280 },
    { x: 3550, y: 290 },
    { x: 3800, y: 210 },
    { x: 3940, y: 210 },
    { x: 4170, y: 300 },
    { x: 4690, y: 310 },
    { x: 4940, y: 230 },
    { x: 5080, y: 230 },
    { x: 5240, y: 250 }
  ],

  decorations: [
    { key: 'pennant_deco', x: 200,  y: 90  },
    { key: 'cone_deco',    x: 480,  y: 488 },
    { key: 'goal_deco',    x: 900,  y: 488 },
    { key: 'pennant_deco', x: 1100, y: 95  },
    { key: 'cone_deco',    x: 1600, y: 488 },
    { key: 'pennant_deco', x: 2000, y: 85  },
    { key: 'goal_deco',    x: 2450, y: 488 },
    { key: 'cone_deco',    x: 2900, y: 488 },
    { key: 'pennant_deco', x: 3200, y: 95  },
    { key: 'cone_deco',    x: 3650, y: 488 },
    { key: 'pennant_deco', x: 4100, y: 90  },
    { key: 'goal_deco',    x: 4500, y: 488 },
    { key: 'cone_deco',    x: 4950, y: 488 },
    { key: 'pennant_deco', x: 5250, y: 95  }
  ]
};
