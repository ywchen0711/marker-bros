// Episode 1: Attack of Sockzilla!  (every line is [中文, English])
const A = (c, x, p, e, o = {}) => ({ c, x, p, e, ...o });
const B = (t, x, y, to, o = {}) => ({ t, x, y, to, ...o });
const S = (t, x, y, o = {}) => ({ t, x, y, ...o });

export default {
  id: 'ep1',
  title: ['#1 臭襪怪來了！', '#1 Attack of Sockzilla!'],
  pages: [
    { type: 'cover', title: ['麥克筆兄弟', 'MARKER BROS'], sub: ['臭襪怪來了！', 'ATTACK OF SOCKZILLA!'], badge: ['第1集', '#1'], by: ['作者：Josh 和 Jasper', 'by Josh & Jasper'],
      art: { bg: 'boom', scale: 1.05, a: [A('sockzilla', 0.78, 'stand', 'evil', { s: 1.25, y: 0.9 }), A('jeff', 0.16, 'shock', 'shock', { y: 0.97, s: 1.1 }), A('erin', 0.33, 'point', 'angry', { y: 0.99, s: 1.1 }), A('josh', 0.52, 'cheer', 'grin', { y: 0.99, hold: 'marker', s: 1.3 }), A('jasper', 0.7, 'draw', 'grin', { y: 0.99, hold: 'marker', s: 1.25 }), A('mochi', 0.9, 'stand', 'shock', { y: 0.99, stache: true, f: true, s: 1.3 })],
        fx: [{ k: 'stink', x: 0.62, y: 0.45 }] } },

    // 1 · Hi, it's us
    { rows: [[1], [1, 1]], h: [1.2, 1], panels: [
      { bg: 'room', a: [A('josh', 0.3, 'wave', 'grin'), A('jasper', 0.68, 'stand', 'happy', { f: true })],
        b: [B(['嗨！我是 Josh！我最會運動！', 'Hi! I’m Josh! I’m great at sports!'], 0.25, 0.12, 0), B(['我是 Jasper！我最會科學……還有打嗝。', 'I’m Jasper! I’m great at science... and burping.'], 0.72, 0.12, 1), B(['……後面那個不用說啦。', '...You didn’t have to say that last part.'], 0.27, 0.36, 0, { w: 0.3 })] },
      { bg: 'color', bgo: { color: '#ffe8a8' }, a: [A('josh', 0.45, 'hold', 'proud', { hold: 'paper' })], b: [B(['這是我們自己畫的漫畫！', 'We drew this comic ourselves!'], 0.5, 0.12, 0, { w: 0.8 })], cap2: { t: ['警告：本漫畫含有大量臭襪子。', 'WARNING: this comic contains lots of stinky socks.'], w: 0.9 } },
      { bg: 'color', bgo: { color: '#d8f0ff' }, a: [A('jasper', 0.3, 'point', 'smug'), A('josh', 0.75, 'shock', 'angry', { f: true })], b: [B(['如果畫得很醜，那是 Josh 畫的。', 'If any drawing looks bad, Josh drew it.'], 0.36, 0.12, 0, { w: 0.6 }), B(['喂！', 'HEY!'], 0.8, 0.34, 1, { k: 'shout' })] },
    ] },

    // 2 · Saturday morning
    { rows: [[1], [1, 1], [1]], h: [1.1, 1, 1], panels: [
      { bg: 'kitchen', cap: ['星期六早上……', 'Saturday morning...'], a: [A('jeff', 0.62, 'hold', 'happy', { hold: 'spatula' }), A('josh', 0.18, 'stand', 'bored'), A('jasper', 0.34, 'stand', 'bored')], props: [{ k: 'pancakes', x: 0.84, y: 0.62, s: 0.7 }],
        b: [B(['早安，兒子們！要不要聽一個鬆餅的笑話？', 'Morning, boys! Wanna hear a pancake joke?'], 0.66, 0.12, 0, { w: 0.42 }), B(['不要。', 'No.'], 0.18, 0.3, 1), B(['不要。', 'No.'], 0.38, 0.36, 2)] },
      { bg: 'kitchen', a: [A('jeff', 0.5, 'shrug', 'laugh')], b: [B(['鬆餅最怕什麼？……最怕被人「翻」舊帳！哈哈哈！', 'Why are pancakes great at baseball? They have the best BATTER! HA HA!'], 0.5, 0.13, 0, { w: 0.86 })] },
      { bg: 'kitchen', a: [A('josh', 0.3, 'facepalm', 'bored'), A('jasper', 0.7, 'stand', 'bored', { f: true })], props: [{ k: 'cookie', x: 0.5, y: 0.9, s: 0.8, front: true }],
        b: [B(['爸……', 'Dad...'], 0.22, 0.12, 0), B(['這是這禮拜第 47 個冷笑話了。', 'That’s joke number 47 this week.'], 0.68, 0.14, 1, { w: 0.58 })] },
      { bg: 'kitchen', a: [A('erin', 0.75, 'point', 'angry', { hold2: 'clipboard', f: true }), A('josh', 0.18, 'shock', 'shock'), A('jasper', 0.36, 'shock', 'shock'), A('mochi', 0.53, 'sit', 'shock')],
        b: [B(['吃完早餐，兩位先生去打掃房間！你們的臭襪子已經可以自己走路了！', 'After breakfast, you two clean your room! Your stinky socks can walk on their own now!'], 0.66, 0.13, 0, { w: 0.6 }), B(['蛤——！', 'AWWW!'], 0.25, 0.2, 1, { k: 'shout' })] },
    ] },

    // 3 · The room, the attic, the box
    { rows: [[1, 1], [1], [1, 1]], h: [1, 1.1, 1], panels: [
      { bg: 'room', a: [A('josh', 0.35, 'stand', 'sad'), A('jasper', 0.78, 'think', 'think', { f: true })], props: [{ k: 'socks', x: 0.55, y: 0.95, s: 0.55, front: true }],
        b: [B(['打掃好無聊喔……', 'Cleaning is SO boring...'], 0.3, 0.12, 0, { w: 0.5 }), B(['我們需要一個……科學的辦法。', 'We need... a SCIENCE solution.'], 0.66, 0.3, 1, { w: 0.55 })] },
      { bg: 'attic', cap: ['於是他們跑去閣樓找工具……', 'So they went up to the attic to find some tools...'], a: [A('josh', 0.32, 'hold', 'happy'), A('jasper', 0.6, 'point', 'shock')], props: [{ k: 'box', x: 0.5, y: 0.97, s: 0.9, front: true, label: '爸爸的舊東西' }],
        b: [B(['這箱子上面寫「爸爸的舊東西，不准碰」。', 'This box says “DAD’S OLD STUFF. DO NOT TOUCH.”'], 0.3, 0.32, 0, { w: 0.36 }), B(['那我們一定要碰。', 'So we HAVE to touch it.'], 0.78, 0.2, 1, { w: 0.3 })] },
      { bg: 'color', bgo: { color: '#fff3c0' }, props: [{ k: 'markers', x: 0.5, y: 0.78, s: 1.5, label: 'MIGHTY' }], fx: [{ k: 'shine', x: 0.2, y: 0.25 }, { k: 'shine', x: 0.82, y: 0.3 }],
        cap: { t: ['超級麥克筆：畫什麼，就變成真的！（大概吧）', 'MIGHTY MARKERS: whatever you draw comes TRUE! (probably)'], w: 0.92 } },
      { bg: 'attic', a: [A('josh', 0.3, 'shrug', 'think'), A('jasper', 0.72, 'hold', 'smug', { f: true, hold: 'marker' })],
        b: [B(['「大概吧」是什麼意思？', 'What does “probably” mean?'], 0.28, 0.12, 0, { w: 0.5 }), B(['只有一個方法可以知道。', 'Only one way to find out.'], 0.72, 0.28, 1, { w: 0.5 })] },
    ] },

    // 4 · Mochi's mustache
    { rows: [[1], [1, 1], [1]], h: [1, 1, 1.05], panels: [
      { bg: 'yard', a: [A('mochi', 0.22, 'sit', 'happy'), A('jasper', 0.6, 'draw', 'grin', { hold: 'paper' }), A('josh', 0.84, 'stand', 'think', { f: true })],
        b: [B(['你畫麻糬幹嘛？', 'Why are you drawing Mochi?'], 0.84, 0.14, 2, { w: 0.3 }), B(['我要幫牠加一點……帥氣。', 'I’m giving him a little... STYLE.'], 0.48, 0.14, 1, { w: 0.34 })] },
      { bg: 'boom', bgo: { color: '#bfe7ff' }, a: [A('mochi', 0.5, 'sit', 'shock', { s: 1.3 })], sfx: [S(['咻～！', 'ZWOOP!'], 0.5, 0.22, { fill: C_P(), rot: -6 })], fx: [{ k: 'stars', x: 0.3, y: 0.4 }, { k: 'stars', x: 0.75, y: 0.5 }] },
      { bg: 'yard', a: [A('mochi', 0.5, 'sit', 'proud', { s: 1.3, stache: true })], b: [B(['我好帥。', 'I look AMAZING.'], 0.5, 0.18, 0, { k: 'think', w: 0.5 })] },
      { bg: 'yard', a: [A('josh', 0.24, 'shock', 'shock'), A('jasper', 0.5, 'cheer', 'grin'), A('mochi', 0.8, 'stand', 'proud', { stache: true, f: true })],
        b: [B(['牠真的長鬍子了！！', 'He REALLY grew a mustache!!'], 0.22, 0.13, 0, { k: 'shout', w: 0.36 }), B(['這是魔法麥克筆！我們可以畫一個機器人來幫我們打掃！', 'The markers are MAGIC! We can draw a robot to clean our room!'], 0.66, 0.15, 1, { w: 0.48 })] },
    ] },

    { type: 'chapter', n: ['第一章', 'CHAPTER 1'], title: ['掃把機器人', 'The Robo-Broom'],
      art: { bg: 'room', a: [A('josh', 0.18, 'cheer', 'grin'), A('robobroom', 0.52, 'stand', 'happy', { s: 1.1 }), A('jasper', 0.84, 'cheer', 'grin', { f: true })], props: [{ k: 'socks', x: 0.5, y: 0.98, s: 0.7, front: true }] } },

    // 6 · Building the robot
    { rows: [[1, 1], [1], [1, 1]], h: [1, 1.15, 1], panels: [
      { bg: 'room', a: [A('jasper', 0.3, 'draw', 'grin', { hold: 'paper' }), A('josh', 0.74, 'point', 'grin', { f: true })],
        b: [B(['幫它加很多手臂！', 'Give it LOTS of arms!'], 0.72, 0.12, 1, { w: 0.5 }), B(['還有火箭！還有雷射！', 'And rockets! And LASERS!'], 0.3, 0.3, 0, { w: 0.5 })] },
      { bg: 'boom', a: [A('robobroom', 0.5, 'stand', 'happy', { s: 1.15 })], sfx: [S(['轟隆！', 'KA-BLAM!'], 0.2, 0.25, { size: 72 })],
        b: [B(['嗶嗶！我是掃把機器人！任務：清除所有髒東西！', 'BEEP BOOP! I AM ROBO-BROOM! MISSION: CLEAN ALL THE MESS!'], 0.72, 0.16, 0, { w: 0.42, fill: '#e6fff4' })] },
      { bg: 'speed', a: [A('robobroom', 0.55, 'stand', 'happy', { r: 12 })], props: [{ k: 'sock', x: 0.2, y: 0.4, s: 0.8, rot: 40 }, { k: 'sock', x: 0.3, y: 0.7, s: 0.7, rot: -30 }], fx: [{ k: 'speed', x: 0.9, y: 0.5, dir: 1, len: 90 }], sfx: [S(['刷刷刷！', 'SWISH!'], 0.75, 0.2, { size: 50, fill: '#7ff0c0' })] },
      { bg: 'room', a: [A('josh', 0.2, 'stand', 'shock'), A('jasper', 0.4, 'stand', 'worry'), A('robobroom', 0.76, 'stand', 'happy', { f: true })], props: [{ k: 'sock', x: 0.76, y: 0.28, s: 0.6, stink: true }],
        b: [B(['嗶！襪子，好吃。', 'BEEP! Socks. Yummy.'], 0.7, 0.12, 2, { w: 0.4, fill: '#e6fff4' }), B(['它……是不是在吃襪子？', 'Is it... EATING the socks?'], 0.28, 0.22, 1, { w: 0.42 })] },
    ] },

    // 7 · Uh-oh
    { rows: [[1], [1, 1], [1]], h: [1, 1, 1.25], panels: [
      { bg: 'room', a: [A('robobroom', 0.5, 'stand', 'angry', { s: 1.05 })], fx: [{ k: 'stink', x: 0.3, y: 0.5 }, { k: 'stink', x: 0.68, y: 0.45 }], sfx: [S(['嗝！', 'BURP!'], 0.82, 0.3, { fill: '#9be07a', size: 56 })],
        b: [B(['警告！警告！襪子……太……臭……了！', 'WARNING! WARNING! SOCKS... TOO... STINKY!'], 0.3, 0.14, 0, { w: 0.48, fill: '#ffe0e0', k: 'shout' })] },
      { bg: 'room', a: [A('josh', 0.5, 'shock', 'scared')], b: [B(['它要爆炸了嗎？', 'Is it gonna EXPLODE?'], 0.5, 0.12, 0, { w: 0.7 })] },
      { bg: 'room', a: [A('jasper', 0.5, 'think', 'worry')], b: [B(['科學上來說……是的。', 'Scientifically speaking... yes.'], 0.5, 0.12, 0, { w: 0.7 })] },
      { bg: 'boom', a: [A('sockzilla', 0.6, 'stand', 'evil', { s: 0.95 }), A('josh', 0.12, 'shock', 'scared', { s: 0.6 }), A('jasper', 0.25, 'shock', 'scared', { s: 0.6 })], sfx: [S(['碰——！', 'KA-BOOM!'], 0.25, 0.2, { size: 80, fill: C_R() })],
        b: [B(['我是……臭襪怪！我要讓全世界都變得臭臭的！哇哈哈哈！', 'I AM... SOCKZILLA! I will make the WHOLE WORLD stinky! MWA-HA-HA!'], 0.3, 0.42, 0, { w: 0.42, k: 'shout' })] },
    ] },

    { type: 'chapter', n: ['第二章', 'CHAPTER 2'], title: ['冷笑話的力量', 'The Power of Dad Jokes'],
      art: { bg: 'street', a: [A('sockzilla', 0.68, 'stand', 'evil', { s: 1.0 }), A('jeff', 0.22, 'point', 'angry', { hold: 'spatula', cape: C_R() })], fx: [{ k: 'stink', x: 0.5, y: 0.35 }] } },

    // 9 · In the street
    { rows: [[1], [1, 1], [1, 1]], h: [1.15, 1, 1], panels: [
      { bg: 'street', cap: ['臭襪怪衝出了房子……', 'Sockzilla stomped out of the house...'], a: [A('sockzilla', 0.6, 'stand', 'evil', { s: 0.95, r: -6 })], fx: [{ k: 'stink', x: 0.25, y: 0.5 }, { k: 'stink', x: 0.88, y: 0.4 }], sfx: [S(['咚！咚！', 'STOMP! STOMP!'], 0.22, 0.85, { size: 50, fill: C_O() })] },
      { bg: 'street', a: [A('jeff', 0.45, 'run', 'angry', { hold: 'spatula' })], fx: [{ k: 'speed', x: 0.2, y: 0.55 }], b: [B(['誰都不准在我的鬆餅日搗蛋！', 'NOBODY ruins my pancake day!'], 0.55, 0.12, 0, { w: 0.8, k: 'shout' })] },
      { bg: 'street', a: [A('jeff', 0.5, 'point', 'grin')], b: [B(['臭襪怪！你知道襪子為什麼都要成雙成對嗎？因為一隻太「孤單」……喔不，太「單」薄了！', 'Hey Sockzilla! Why did the sock go to school? To get SMART-WOOL! HA!'], 0.5, 0.15, 0, { w: 0.86 })] },
      { bg: 'street', a: [A('sockzilla', 0.55, 'stand', 'dizzy', { s: 0.7 })], fx: [{ k: 'ice', x: 0.55, y: 0.98, w: 0.62, h: 0.92 }], b: [B(['好……冷……', 'So... COLD...'], 0.25, 0.15, 0, { w: 0.4 })] },
      { bg: 'street', a: [A('josh', 0.25, 'cheer', 'grin'), A('jeff', 0.72, 'cheer', 'proud', { f: true })], b: [B(['爸！你的冷笑話把怪獸冷凍了！', 'Dad! Your joke was so bad it FROZE him!'], 0.27, 0.12, 0, { w: 0.48 }), B(['我的笑話終於派上用場了！', 'FINALLY! My jokes are a SUPER-POWER!'], 0.72, 0.13, 1, { w: 0.46 })] },
    ] },

    // 10 · It is not over
    { rows: [[1, 1], [1], [1, 1]], h: [1, 1.1, 1], panels: [
      { bg: 'street', a: [A('sockzilla', 0.55, 'stand', 'angry', { s: 0.72 })], props: [{ k: 'eraserbit', x: 0.3, y: 0.85, s: 1, front: true }], sfx: [S(['喀啦！', 'CRACK!'], 0.25, 0.3, { size: 48, fill: '#bfe7ff' })], b: [B(['哼！這點冷算什麼！', 'HA! A little cold can’t stop ME!'], 0.6, 0.12, 0, { w: 0.6 })] },
      { bg: 'street', a: [A('coach', 0.5, 'run', 'angry')], props: [{ k: 'whistle', x: 0.6, y: 0.32, s: 1 }], b: [B(['嗶——！犯規！在社區亂丟襪子，黃牌一張！', 'TWEEEET! FOUL! Throwing socks in the neighborhood! Yellow card!'], 0.5, 0.13, 0, { w: 0.86, k: 'shout' })] },
      { bg: 'street', a: [A('coach', 0.36, 'fall', 'dizzy'), A('sockzilla', 0.8, 'throw', 'evil', { s: 0.6, f: true })], props: [{ k: 'sock', x: 0.42, y: 0.5, s: 1, rot: -30, stink: true, front: true }], sfx: [S(['啪！', 'SPLAT!'], 0.55, 0.3, { size: 56, fill: '#9be07a' })],
        b: [B(['嗚哇！好臭！我的眼睛！', 'AAAH! So STINKY! My EYES!'], 0.25, 0.14, 0, { w: 0.4 })] },
      { bg: 'street', a: [A('erin', 0.5, 'stand', 'smug', { hold2: 'clipboard' })], b: [B(['好了，大家冷靜一點。', 'Okay. Everybody calm down.'], 0.5, 0.12, 0, { w: 0.7 })] },
      { bg: 'street', a: [A('josh', 0.18, 'shock', 'happy'), A('jasper', 0.36, 'shock', 'happy'), A('erin', 0.76, 'hold', 'smug', { hold: 'marker', f: true })],
        b: [B(['臭襪子……要怎麼處理呢？', 'So... what do we do with stinky socks?'], 0.72, 0.12, 2, { w: 0.48 }), B(['……洗衣服？', '...Do the laundry?'], 0.28, 0.24, 0, { w: 0.4 })] },
    ] },

    // 11 · Mom draws
    { rows: [[1], [1, 1]], h: [1.1, 1], panels: [
      { bg: 'speed', bgo: { color: '#ffe8f0' }, a: [A('erin', 0.4, 'draw', 'proud', { hold: 'paper' })], fx: [{ k: 'speed', x: 0.85, y: 0.4, dir: 1 }], sfx: [S(['唰唰唰！', 'SKETCH SKETCH SKETCH!'], 0.72, 0.2, { size: 46, fill: C_P() })], cap: ['媽媽畫畫超級快。', 'Mom draws REALLY fast.'] },
      { bg: 'laundry', a: [A('washer', 0.5, 'stand', 'grin', { s: 1.05 })], sfx: [S(['登登！', 'TA-DA!'], 0.25, 0.22, { size: 44, fill: C_Y() })], b: [B(['洗衣服時間到！', 'LAUNDRY TIME!'], 0.66, 0.12, 0, { w: 0.5, k: 'shout' })] },
      { bg: 'street', a: [A('sockzilla', 0.5, 'shock', 'scared', { s: 0.68 })], b: [B(['不——！不要洗我！我好不容易才變得這麼臭的！', 'NOOO! Don’t wash me! It took me YEARS to get this stinky!'], 0.5, 0.12, 0, { w: 0.86, k: 'shout' })] },
    ] },

    { type: 'flip', title: ['翻翻樂 #1', 'FLIP-O-RAMA #1'], how: ['按住下面的「翻！」，或一直點畫面，讓洗衣機動起來！', 'Hold the FLIP! button (or keep tapping the picture) to make it move!'], chant: ['轉轉轉！洗洗洗！', 'SPIN! SPIN! SPIN!'],
      a: { bg: 'laundry', a: [A('washer', 0.3, 'stand', 'evil', { s: 1.05 }), A('sockzilla', 0.72, 'scared', 'scared', { s: 0.7, r: -14 })], fx: [{ k: 'speed', x: 0.95, y: 0.4, dir: 1, n: 4 }] },
      b: { bg: 'laundry', a: [A('washer', 0.3, 'stand', 'laugh', { s: 1.05, spin: true }), A('sockzilla', 0.6, 'scared', 'dizzy', { s: 0.42, r: 70, y: 0.55 })], props: [{ k: 'sock', x: 0.8, y: 0.3, s: 1, rot: 70 }, { k: 'sock', x: 0.88, y: 0.7, s: 0.9, rot: -40 }], sfx: [S(['轟轟轟', 'WHIRRR'], 0.75, 0.2, { size: 50, fill: C_B() })] } },

    // 13 · Clean
    { rows: [[1], [1, 1], [1]], h: [1, 1, 1.05], panels: [
      { bg: 'laundry', a: [A('washer', 0.38, 'stand', 'proud', { s: 0.95 }), A('sockzilla', 0.78, 'stand', 'clean', { s: 0.32 })], sfx: [S(['叮！', 'DING!'], 0.15, 0.2, { size: 60, fill: C_Y() })], fx: [{ k: 'shine', x: 0.7, y: 0.5 }, { k: 'shine', x: 0.88, y: 0.62 }],
        b: [B(['洗好囉！', 'All clean!'], 0.38, 0.1, 0, { w: 0.3 }), B(['我……我好香喔。', 'I... I smell like FLOWERS.'], 0.78, 0.36, 1, { w: 0.34 })] },
      { bg: 'yard', a: [A('sockzilla', 0.3, 'stand', 'clean', { s: 0.38 }), A('jasper', 0.72, 'hug', 'love', { f: true })], b: [B(['對不起，我再也不當壞襪子了。', 'Sorry. I’ll never be a bad sock again.'], 0.3, 0.2, 0, { w: 0.5 }), B(['那你可以當我的寵物襪子！', 'Then you can be my PET SOCK!'], 0.7, 0.12, 1, { w: 0.5 })] },
      { bg: 'yard', a: [A('mochi', 0.5, 'sit', 'angry', { stache: true, s: 1.2 })], b: [B(['汪！（那我呢？）', 'WOOF! (What about ME?)'], 0.5, 0.15, 0, { w: 0.7 })] },
      { bg: 'yard', a: [A('jeff', 0.14, 'cheer', 'laugh'), A('erin', 0.32, 'stand', 'happy'), A('josh', 0.52, 'cheer', 'grin'), A('jasper', 0.68, 'cheer', 'grin'), A('mochi', 0.86, 'jump', 'happy', { stache: true, f: true })],
        b: [B(['今天真是……「襪」塞！好精彩的一天！', 'Well, today was a real... SOCK-CESS!'], 0.24, 0.12, 0, { w: 0.4 }), B(['爸——！', 'DAAAD!'], 0.68, 0.14, 3, { k: 'shout' })] },
    ] },

    // 14 · The end...?
    { rows: [[1], [1]], h: [1, 1.1], panels: [
      { bg: 'room', a: [A('erin', 0.74, 'point', 'angry', { f: true }), A('josh', 0.22, 'stand', 'worry'), A('jasper', 0.4, 'stand', 'worry')], props: [{ k: 'socks', x: 0.32, y: 0.98, s: 0.7, front: true }],
        b: [B(['所以……房間打掃好了嗎？', 'So... is your room clean yet?'], 0.72, 0.12, 0, { w: 0.4 }), B(['我們……忘記打掃了。', 'We... forgot to clean it.'], 0.3, 0.2, 1, { w: 0.4 })] },
      { bg: 'night', cap: ['那天晚上……', 'That night...'], a: [A('eraser', 0.72, 'hold', 'evil', { hold: 'marker' })], props: [{ k: 'markers', x: 0.25, y: 0.92, s: 0.9 }],
        b: [B(['嘿嘿嘿……找到了，超級麥克筆……', 'Heh heh heh... at last... the MIGHTY MARKERS...'], 0.66, 0.14, 0, { w: 0.5, k: 'whisper' })], cap2: { t: ['完……嗎？', 'THE END...?'], fs: 30, fill: '#ffffff' } },
    ] },

    { type: 'howto', title: ['如何畫麻糬', 'HOW TO DRAW MOCHI'], sub: ['跟著 6 個步驟，你也畫得出來！（鬍子自己加）', 'Six easy steps! (Add the mustache yourself.)'] },
  ],
};
function C_P() { return '#ff8fb8'; } function C_R() { return '#ff4b3e'; } function C_O() { return '#ff9a2e'; } function C_Y() { return '#ffd93d'; } function C_B() { return '#3d8bff'; }
