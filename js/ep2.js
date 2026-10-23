// Episode 2: Revenge of Dr. Eraser  (every line is [中文, English])
const A = (c, x, p, e, o = {}) => ({ c, x, p, e, ...o });
const B = (t, x, y, to, o = {}) => ({ t, x, y, to, ...o });
const S = (t, x, y, o = {}) => ({ t, x, y, ...o });
const PINK = '#ff8fb8', YEL = '#ffd93d', RED = '#ff4b3e', BLUE = '#3d8bff', ORANGE = '#ff9a2e';

export default {
  id: 'ep2',
  title: ['#2 橡皮擦博士的逆襲', '#2 Revenge of Dr. Eraser'],
  pages: [
    { type: 'cover', title: ['麥克筆兄弟', 'MARKER BROS'], sub: ['橡皮擦博士的逆襲', 'REVENGE OF DR. ERASER'], badge: ['第2集', '#2'], by: ['作者：Josh 和 Jasper', 'by Josh & Jasper'],
      art: { bg: 'boom', bgo: { color: '#ffd0e4' }, scale: 1.05, a: [A('eraser', 0.72, 'hold', 'evil', { s: 1.45, y: 0.88, hold: 'blaster' }), A('pencil', 0.13, 'stand', 'proud', { s: 0.95, y: 0.99 }), A('josh', 0.36, 'throw', 'angry', { y: 0.99, s: 1.25, hold: 'ball' }), A('jasper', 0.54, 'point', 'grin', { y: 0.99, s: 1.2 }), A('mochi', 0.88, 'jump', 'angry', { y: 0.99, s: 1.2, stache: true, f: true })],
        fx: [{ k: 'ghost', x: 0.42, y: 0.66, w: 0.2, h: 0.12 }] } },

    // 1 · We're back
    { rows: [[1, 1], [1]], h: [1, 1.15], panels: [
      { bg: 'room', a: [A('josh', 0.5, 'wave', 'grin')], b: [B(['上一集，我們打敗了臭襪怪！', 'Last time, we beat SOCKZILLA!'], 0.5, 0.12, 0, { w: 0.8 })] },
      { bg: 'room', a: [A('jasper', 0.5, 'stand', 'happy')], props: [{ k: 'sock', x: 0.82, y: 0.88, s: 0.9, color: '#ffffff' }], fx: [{ k: 'hearts', x: 0.78, y: 0.55 }], b: [B(['現在牠是我的寵物襪子，叫「小白」。', 'Now he’s my pet sock. His name is Fluffy.'], 0.5, 0.12, 0, { w: 0.8 })] },
      { bg: 'color', bgo: { color: '#ffd0e4' }, a: [A('josh', 0.3, 'shock', 'scared'), A('jasper', 0.7, 'shock', 'scared', { f: true })], sfx: [S(['！？', '?!'], 0.5, 0.45, { size: 70, fill: PINK })],
        b: [B(['這一集更恐怖……', 'This one is even SCARIER...'], 0.27, 0.12, 0, { w: 0.4 }), B(['……比考試還恐怖！', '...scarier than a math test!'], 0.73, 0.12, 1, { w: 0.4 })] },
    ] },

    { type: 'chapter', n: ['第一章', 'CHAPTER 1'], title: ['橡皮擦博士', 'Dr. Eraser'],
      art: { bg: 'lab', a: [A('eraser', 0.5, 'cheer', 'evil', { hold: 'marker' })], fx: [{ k: 'stars', x: 0.2, y: 0.3 }] } },

    // 3 · The villain's story
    { rows: [[1], [1, 1], [1]], h: [1.1, 1, 1.05], panels: [
      { bg: 'lab', cap: ['在城市另一頭的祕密實驗室……', 'Meanwhile, in a secret lab across town...'], a: [A('eraser', 0.62, 'hold', 'evil', { hold: 'marker' })],
        b: [B(['哇哈哈！超級麥克筆終於是我的了！', 'MWA-HA-HA! The Mighty Markers are finally MINE!'], 0.3, 0.42, 0, { w: 0.42 })] },
      { bg: 'color', bgo: { color: '#e8e0ff' }, cap: ['很久以前……', 'Long ago...'], a: [A('rivera', 0.68, 'point', 'angry', { f: true }), A('eraser', 0.26, 'sit', 'sad', { s: 0.8 })],
        b: [B(['擦掉！重寫！', 'ERASE IT! Do it again!'], 0.66, 0.12, 0, { w: 0.5 })] },
      { bg: 'color', bgo: { color: '#e8e0ff' }, a: [A('eraser', 0.5, 'shock', 'sad')], props: [{ k: 'eraserbit', x: 0.5, y: 0.95, s: 1.4, front: true }],
        b: [B(['我小時候寫的每個字，老師都叫我擦掉。我擦啊擦啊擦……', 'When I was little, the teacher made me erase EVERYTHING. I erased and erased and erased...'], 0.5, 0.14, 0, { w: 0.86 })] },
      { bg: 'lab', a: [A('eraser', 0.5, 'cheer', 'evil', { hold: 'blaster' })], sfx: [S(['嗡嗡嗡', 'VRRRMM'], 0.85, 0.3, { size: 44, fill: PINK })],
        b: [B(['……直到我自己變成了橡皮擦！現在，我要把全世界都擦掉！', '...until I TURNED INTO an eraser! Now I will ERASE THE WHOLE WORLD!'], 0.5, 0.13, 0, { w: 0.86, k: 'shout' })] },
    ] },

    // 4 · Monday at school
    { rows: [[1], [1, 1], [1, 1]], h: [1.1, 1, 1], panels: [
      { bg: 'school', cap: ['星期一，學校運動會……', 'Monday. Field Day at school...'], a: [A('coach', 0.24, 'wave', 'grin'), A('josh', 0.56, 'cheer', 'grin'), A('jasper', 0.78, 'stand', 'happy', { f: true })], props: [{ k: 'whistle', x: 0.31, y: 0.36, s: 1 }],
        b: [B(['嗶！各位同學，運動會開始！', 'TWEET! Field Day starts NOW!'], 0.26, 0.12, 0, { w: 0.4 }), B(['耶！我要拿冠軍！', 'YES! I’m gonna win EVERYTHING!'], 0.62, 0.22, 1, { w: 0.34 })] },
      { bg: 'school', a: [A('eraser', 0.55, 'hold', 'evil', { hold: 'blaster' })], sfx: [S(['磅！', 'BAM!'], 0.2, 0.25, { size: 64, fill: PINK })], b: [B(['不准開始！', 'NOT SO FAST!'], 0.5, 0.12, 0, { k: 'shout', w: 0.6 })] },
      { bg: 'school', a: [A('josh', 0.3, 'shock', 'shock'), A('jasper', 0.7, 'shock', 'shock', { f: true })], b: [B(['你是誰啊？！', 'Who are YOU?!'], 0.5, 0.12, 0, { w: 0.6 })] },
      { bg: 'field', a: [A('eraser', 0.3, 'point', 'evil', { hold: 'blaster' })], fx: [{ k: 'ghost', x: 0.76, y: 0.62, w: 0.36, h: 0.34 }], sfx: [S(['擦擦擦！', 'SCRUB SCRUB!'], 0.72, 0.85, { size: 40, fill: PINK })],
        b: [B(['我是橡皮擦博士！先把你們的溜滑梯擦掉！', 'I am DR. ERASER! First, I’ll erase your SLIDE!'], 0.35, 0.13, 0, { w: 0.6 })] },
      { bg: 'field', a: [A('coach', 0.5, 'shock', 'sad')], b: [B(['我的哨子！他把我的哨子擦掉了！', 'My WHISTLE! He erased my whistle!'], 0.5, 0.13, 0, { w: 0.86 })] },
    ] },

    // 5 · Josh's cap
    { rows: [[1, 1], [1], [1, 1]], h: [1, 1.1, 1], panels: [
      { bg: 'field', a: [A('josh', 0.5, 'throw', 'angry', { hold: 'ball' })], b: [B(['吃我的快速球！', 'Take my FASTBALL!'], 0.5, 0.12, 0, { k: 'shout', w: 0.8 })] },
      { bg: 'field', a: [A('eraser', 0.5, 'point', 'smug', { hold: 'blaster' })], fx: [{ k: 'ghost', x: 0.15, y: 0.5, w: 0.2, h: 0.2, t: ['球？', 'ball?'] }], b: [B(['沒用的！任何東西我都擦得掉！', 'Useless! I can erase ANYTHING!'], 0.5, 0.12, 0, { w: 0.86 })] },
      { bg: 'boom', bgo: { color: '#ffd0e4' }, a: [A('josh', 0.5, 'shock', 'shock', { nocap: true, s: 1.1 })], sfx: [S(['咻！', 'FWIP!'], 0.2, 0.3, { size: 64, fill: PINK })], fx: [{ k: 'ghost', x: 0.8, y: 0.38, w: 0.2, h: 0.18, t: ['帽子', 'cap'] }],
        b: [B(['我……我的帽子！！', 'My... my CAP!!'], 0.5, 0.12, 0, { k: 'shout', w: 0.6 })] },
      { bg: 'field', a: [A('jasper', 0.5, 'shrug', 'laugh')], b: [B(['原來你帽子底下長這樣！', 'So THAT’S what’s under your cap!'], 0.5, 0.12, 0, { w: 0.86 })] },
      { bg: 'field', a: [A('josh', 0.5, 'point', 'angry', { nocap: true })], b: [B(['不准笑！我們快回家找爸媽！', 'Stop laughing! Let’s go get Mom and Dad!'], 0.5, 0.12, 0, { w: 0.86 })] },
    ] },

    { type: 'chapter', n: ['第二章', 'CHAPTER 2'], title: ['以擦制擦！', 'Fight Erasers with Erasers!'],
      art: { bg: 'sky', a: [A('jeff', 0.3, 'fly', 'grin', { cape: RED, y: 0.6 }), A('erin', 0.66, 'fly', 'proud', { cape: PINK, y: 0.8 })], fx: [{ k: 'speed', x: 0.1, y: 0.4, n: 4 }] } },

    // 7 · The plan
    { rows: [[1], [1, 1], [1]], h: [1.1, 1, 1], panels: [
      { bg: 'kitchen', a: [A('erin', 0.7, 'hold', 'think', { hold: 'clipboard', f: true }), A('jeff', 0.46, 'stand', 'worry'), A('josh', 0.16, 'stand', 'sad', { nocap: true }), A('jasper', 0.3, 'stand', 'happy')],
        b: [B(['好，我們來擬定計畫。第一步：找到他的弱點。', 'Okay, let’s make a plan. Step one: find his weakness.'], 0.68, 0.12, 0, { w: 0.5 })] },
      { bg: 'kitchen', a: [A('jasper', 0.5, 'think', 'think')], b: [B(['橡皮擦的弱點是……原子筆！原子筆擦不掉！', 'An eraser’s weakness is... PEN! You can’t erase pen!'], 0.5, 0.12, 0, { w: 0.86 })] },
      { bg: 'kitchen', a: [A('jeff', 0.5, 'up', 'grin')], b: [B(['還有我的冷笑話！', 'And my DAD JOKES!'], 0.5, 0.12, 0, { w: 0.8 })] },
      { bg: 'kitchen', a: [A('erin', 0.3, 'facepalm', 'bored'), A('josh', 0.74, 'draw', 'grin', { hold: 'paper', nocap: true, f: true })],
        b: [B(['……好吧，那也算一個。', '...Fine. That counts too.'], 0.3, 0.12, 0, { w: 0.46 }), B(['我有個更好的點子！我們畫一個超級英雄！', 'I’ve got an even better idea! Let’s DRAW a superhero!'], 0.7, 0.14, 1, { w: 0.5 })] },
    ] },

    // 8 · Pencil Pal
    { rows: [[1], [1, 1]], h: [1.25, 1], panels: [
      { bg: 'boom', a: [A('pencil', 0.5, 'stand', 'proud', { s: 0.95 })], sfx: [S(['登登登——！', 'TA-DA-DAAA!'], 0.22, 0.2, { size: 52, fill: YEL })],
        b: [B(['鉛筆俠參上！哪裡被擦掉，我就畫回來！', 'PENCIL PAL is here! Whatever gets erased, I draw it back!'], 0.72, 0.36, 0, { w: 0.42, k: 'shout' })] },
      { bg: 'kitchen', a: [A('jasper', 0.5, 'shrug', 'worry')], b: [B(['等等……鉛筆不是一擦就掉嗎？', 'Wait... can’t pencil be ERASED?'], 0.5, 0.12, 0, { w: 0.86 })] },
      { bg: 'kitchen', a: [A('pencil', 0.5, 'stand', 'smug', { s: 0.62 })], b: [B(['放心。我頭上也有一塊橡皮擦。', 'Relax. I’ve got an eraser on my head too.'], 0.5, 0.12, 0, { w: 0.86 })] },
    ] },

    // 9 · The showdown
    { rows: [[1], [1, 1], [1, 1]], h: [1.1, 1, 1], panels: [
      { bg: 'field', a: [A('eraser', 0.75, 'hold', 'evil', { hold: 'blaster', f: true, s: 0.95 }), A('pencil', 0.22, 'stand', 'angry', { s: 0.62 })], sfx: [S(['VS', 'VS'], 0.5, 0.45, { size: 80, fill: RED })],
        b: [B(['哈！一支鉛筆？我最喜歡擦鉛筆了！', 'HA! A PENCIL? Erasing pencils is my FAVORITE!'], 0.66, 0.12, 0, { w: 0.5 })] },
      { bg: 'field', a: [A('jeff', 0.5, 'point', 'grin')], b: [B(['橡皮擦博士！你知道你為什麼會輸嗎？因為你太「擦」了！', 'Hey Dr. Eraser! You know why you’ll lose? You’re just too RUBBER at this!'], 0.5, 0.14, 0, { w: 0.86 })] },
      { bg: 'field', a: [A('eraser', 0.5, 'stand', 'dizzy', { s: 0.82 })], fx: [{ k: 'ice', x: 0.5, y: 0.98, w: 0.5, h: 0.9 }], b: [B(['好……冷……', 'So... COLD...'], 0.22, 0.14, 0, { w: 0.4 })] },
      { bg: 'field', a: [A('josh', 0.5, 'cheer', 'grin', { nocap: true })], b: [B(['又冷凍一個！鉛筆俠，上！', 'Frozen AGAIN! Go, Pencil Pal!'], 0.5, 0.12, 0, { w: 0.86, k: 'shout' })] },
      { bg: 'field', a: [A('mochi', 0.5, 'run', 'yum', { stache: true, s: 1.2 })], fx: [{ k: 'speed', x: 0.2, y: 0.6 }], b: [B(['汪！（粉紅色的……是草莓麻糬嗎？）', 'WOOF! (Is that pink thing... a strawberry MOCHI?)'], 0.5, 0.13, 0, { w: 0.86 })] },
    ] },

    { type: 'flip', title: ['翻翻樂 #2', 'FLIP-O-RAMA #2'], how: ['按住「翻！」看鉛筆俠大戰橡皮擦博士！', 'Hold FLIP! to watch Pencil Pal battle Dr. Eraser!'], chant: ['擦！畫！擦！畫！', 'ERASE! DRAW! ERASE! DRAW!'],
      a: { bg: 'field', a: [A('pencil', 0.26, 'stand', 'angry', { r: 18, s: 0.62 }), A('eraser', 0.72, 'hold', 'evil', { hold: 'blaster', f: true })], fx: [{ k: 'speed', x: 0.12, y: 0.45, n: 4 }] },
      b: { bg: 'field', a: [A('pencil', 0.36, 'stand', 'grin', { r: -24, s: 0.62 }), A('eraser', 0.76, 'shock', 'shock', { f: true })], props: [{ k: 'eraserbit', x: 0.6, y: 0.5, s: 2 }], fx: [{ k: 'ghost', x: 0.64, y: 0.6, w: 0.18, h: 0.12, t: ['光線槍', 'blaster'] }], sfx: [S(['擦！', 'SCRUB!'], 0.8, 0.22, { size: 70, fill: PINK })] } },

    // 11 · Chomp
    { rows: [[1], [1, 1], [1]], h: [1.1, 1, 1], panels: [
      { bg: 'field', a: [A('eraser', 0.62, 'shock', 'scared'), A('mochi', 0.5, 'jump', 'angry', { stache: true, y: 0.5, s: 1.1 })], sfx: [S(['咬！', 'CHOMP!'], 0.2, 0.3, { size: 76, fill: RED })],
        b: [B(['哎呀！不要咬！我不是麻糬！', 'OUCH! Stop biting! I’m not a MOCHI!'], 0.8, 0.14, 0, { w: 0.36, k: 'shout' })] },
      { bg: 'field', a: [A('pencil', 0.5, 'stand', 'proud', { s: 0.6 })], b: [B(['好，現在把所有東西畫回來！', 'Now, let’s draw everything BACK!'], 0.5, 0.12, 0, { w: 0.86 })], sfx: [S(['唰唰唰！', 'SKETCH!'], 0.8, 0.86, { size: 40, fill: YEL })] },
      { bg: 'school', a: [A('coach', 0.5, 'cheer', 'grin')], props: [{ k: 'whistle', x: 0.6, y: 0.24, s: 1.2 }], b: [B(['我的哨子回來了！嗶嗶嗶——！', 'My whistle’s BACK! TWEET TWEET TWEEEET!'], 0.5, 0.12, 0, { w: 0.86 })] },
      { bg: 'field', a: [A('josh', 0.3, 'cheer', 'proud'), A('jasper', 0.7, 'cheer', 'grin', { f: true })], b: [B(['我的帽子也回來了！', 'And my CAP is back!'], 0.3, 0.12, 0, { w: 0.46 }), B(['可惜。', 'Too bad.'], 0.72, 0.18, 1, { w: 0.3 })] },
    ] },

    // 12 · What to do with him
    { rows: [[1, 1], [1], [1]], h: [1, 1.1, 1], panels: [
      { bg: 'field', a: [A('eraser', 0.5, 'sit', 'sad', { s: 0.75 })], b: [B(['嗚嗚……我只是不想再被擦掉了……', 'Boo hoo... I just didn’t want to be erased anymore...'], 0.5, 0.12, 0, { w: 0.86 })] },
      { bg: 'field', a: [A('erin', 0.5, 'hug', 'happy')], b: [B(['寫錯字沒關係啊。擦掉，再寫一次就好了。', 'Mistakes are okay. You just erase them and try again.'], 0.5, 0.13, 0, { w: 0.86 })] },
      { bg: 'school', a: [A('rivera', 0.68, 'point', 'happy', { f: true }), A('eraser', 0.26, 'stand', 'happy', { s: 0.8 })], props: [{ k: 'book', x: 0.4, y: 0.6, s: 1, label: 'ABC' }],
        b: [B(['而且你是一塊很棒的橡皮擦！你要不要來我們班幫忙？', 'And you’re a GREAT eraser! Want to help out in my class?'], 0.66, 0.12, 0, { w: 0.5 }), B(['真……真的嗎？', 'R... really?'], 0.24, 0.3, 1, { w: 0.3 })] },
      { bg: 'school', a: [A('rivera', 0.8, 'stand', 'happy', { f: true }), A('josh', 0.2, 'shock', 'shock'), A('jasper', 0.4, 'shock', 'shock')],
        b: [B(['好了，同學們！運動會結束，大家回教室考數學！', 'Okay, class! Field Day is over. Back inside for the MATH TEST!'], 0.72, 0.12, 0, { w: 0.5 }), B(['蛤——！', 'AWWW!'], 0.3, 0.2, 1, { k: 'shout' })] },
    ] },

    // 13 · The end
    { rows: [[1], [1]], h: [1, 1.1], panels: [
      { bg: 'kitchen', cap: ['那天晚上……', 'That night...'], a: [A('jeff', 0.14, 'shrug', 'laugh'), A('erin', 0.34, 'stand', 'happy'), A('josh', 0.56, 'stand', 'happy'), A('jasper', 0.74, 'stand', 'grin'), A('mochi', 0.9, 'sit', 'happy', { stache: true, f: true })], props: [{ k: 'pancakes', x: 0.45, y: 0.62, s: 0.6 }],
        b: [B(['今天的晚餐是……鬆餅！因為我們今天真的很「拼」（餅）！', 'Dinner tonight is... PANCAKES! Because today was a real FLIP-out!'], 0.22, 0.13, 0, { w: 0.4 }), B(['爸——！', 'DAAAD!'], 0.74, 0.16, 3, { k: 'shout' })] },
      { bg: 'room', a: [A('josh', 0.3, 'hold', 'proud', { hold: 'markers' }), A('jasper', 0.7, 'wave', 'grin', { f: true })], props: [{ k: 'sock', x: 0.88, y: 0.92, s: 0.8, color: '#ffffff', front: true }],
        b: [B(['這次我們把麥克筆鎖起來了。', 'This time we LOCKED the markers away.'], 0.28, 0.12, 0, { w: 0.46 }), B(['下一集見！記得多畫畫喔！', 'See you next time! Keep drawing!'], 0.72, 0.15, 1, { w: 0.46 })], cap2: { t: ['完', 'THE END'], fs: 30, fill: '#ffffff' } },
    ] },
  ],
};
