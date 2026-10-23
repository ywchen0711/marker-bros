# 麥克筆兄弟 Marker Bros

A goofy web comic "drawn by" brothers **Josh** and **Jasper**, starring them, **Dad (Jeff)** and **Mom (Erin)**, with
guest stars **Mochi** the Shiba puppy and **Coach Coyote**. Read it at **https://ywchen0711.github.io/marker-bros/**

The boys find a box of MIGHTY MARKERS in the attic: whatever you draw comes true. Then things get out of hand.

- **#1 Attack of Sockzilla!** A cleaning robot eats too many stinky socks and turns into a giant sock monster.
  Dad's jokes are so cold they freeze it; Mom draws a washing machine.
- **#2 Revenge of Dr. Eraser** A villain who was made to erase everything as a kid wants to erase the world,
  starting with Field Day (and Josh's cap). Enter Pencil Pal, who has an eraser of his own.

Everything is drawn by code in a kid-with-markers style: wobbly thick outlines, flat colours spilling past the lines,
hand lettering. Each episode has chapters, Flip-O-Rama style flip pages (hold the FLIP! button), and episode 1 ends with
How to Draw Mochi. 繁體中文 and English; read a page at a time, or one panel at a time on a phone.

## Making more pages

A page is plain data in `js/ep1.js` / `js/ep2.js`:

```js
{ rows: [[1], [1, 1]], panels: [
  { bg: 'kitchen', a: [{ c: 'jeff', x: 0.5, p: 'shrug', e: 'laugh' }],
    b: [{ t: ['中文台詞', 'English line'], x: 0.5, y: 0.12, to: 0 }] },
  ...
] }
```

- Cast (`c`): josh, jasper, jeff, erin, mochi, coach, rivera, eraser, sockzilla, robobroom, washer, pencil
- Poses (`p`): stand, wave, point, cheer, shock, run, walk, hold, fly, think, shrug, fall, sit, draw, facepalm, punch,
  dance, up, throw, hug, scared (Mochi: stand, sit, run, jump)
- Faces (`e`): happy, grin, laugh, shock, scared, worry, angry, evil, sad, smug, bored, think, proud, love, dizzy, sleep, yum
- Extras: `f` (face left), `s` (size), `hold` / `hold2` (marker, paper, spatula, ball, clipboard, blaster, markers...),
  `cape`, `stache`, `nocap`
- Backgrounds: kitchen, room, attic, yard, street, school, field, sky, night, lab, laundry, boom, speed, color
- Balloons: `k: 'shout' | 'think' | 'whisper'`; captions `cap` / `cap2`; sound effects `sfx`; effects `fx`
  (speed, stink, stars, hearts, zzz, shine, ice, ghost)
- Page types: comic (default), cover, chapter, flip, howto

`node tools/test.mjs` draws every page in both languages and checks nothing is missing.
