import * as PIXI from 'pixijs';
import { noise } from 'quick-perlin-noise-js';
import { gridAbstract, lerp2Color } from './utils';

// 0xDE3249
function Art(props) {
  const {
    r, t, b, colrs, tr,
  } = {
    r: 50,
    t: 2,
    b: 50,
    colrs: [0xf6aa1c, 0x941b0c, 0xa4161a, 0x660708],
    tr: ({ x }) => ((x % 5 !== 0) ? 255 : 0),
    ...props,
  };

  const app = new PIXI.Application({
    background: 0x101010,
    resizeTo: window,
    antialias: true,
  });

  const stage = new PIXI.Container();

  const circleGraphics = new PIXI.Graphics();
  circleGraphics.lineStyle({ width: t, color: 0xffffff });
  circleGraphics.drawCircle(0, 0, r);
  circleGraphics.cacheAsBitmap = true;
  const circleTexture = app.renderer.generateTexture(circleGraphics);

  const [W, H] = [window.innerWidth, window.innerHeight];
  const [cols, rows] = [Math.floor((W - r - b - b) / r), Math.floor((H - r - b - b) / (r * 2))];
  const [offX, offY] = [(W - cols * r + r) / 2, (H - rows * r * 2) / 2 + r];

  const xs = gridAbstract({
    rows,
    cols,
    cb: (y, x) => {
      const sprite = new PIXI.Sprite(circleTexture);
      sprite.anchor.set(0.5);
      sprite.x = offX + x * r;
      sprite.y = offY + y * 2 * r;
      stage.addChild(sprite);
      return sprite;
    },
  });

  app.stage.addChild(stage);

  let t0 = 0;
  function animate() {
    requestAnimationFrame(animate);
    gridAbstract({
      rows,
      cols,
      cb: (y, x) => {
        const sc = r / 20;
        const xn = noise(
          sc * (x - rows / 2),
          sc * (y - cols / 2),
          t0,
        ) * 0.5 + 0.5;
        const yn = noise(
          sc * (y - cols / 2) + 500,
          sc * (y - cols / 2) + 500,
          t0,
        ) * 0.5 + 0.5;
        xs[y][x].tint = lerp2Color(...colrs, xn, yn);
        xs[y][x].alpha = tr({ x, y, t0 });
      },
    });
    t0 += 0.01;
    app.render();
  }
  animate();

  return app.view;
}

export default Art;
