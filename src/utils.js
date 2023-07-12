import quickNoise from 'quick-perlin-noise-js';

const gridAbstract = ({ rows = 1, cols = 1, cb }) => [...Array(rows).keys()]
  .map((r) => [...Array(cols).keys()].map((c) => cb(r, c)));

const noiseGrid = ({
  rows = 1,
  cols = 1,
  sc = 1,
  sdx = 0,
  sdy = 0,
  cb = (x) => x,
}) => gridAbstract({
  rows,
  cols,
  cb: (r, c) => cb(quickNoise.noise(sc * (r - rows / 2) + sdx, sc * (c - cols / 2) + sdy)),
});

const lerpColor = (pFrom, pTo, pRatio) => {
  const ar = (pFrom & 0xFF0000) >> 16;
  const ag = (pFrom & 0x00FF00) >> 8;
  const ab = (pFrom & 0x0000FF);

  const br = (pTo & 0xFF0000) >> 16;
  const bg = (pTo & 0x00FF00) >> 8;
  const bb = (pTo & 0x0000FF);

  const rr = ar + pRatio * (br - ar);
  const rg = ag + pRatio * (bg - ag);
  const rb = ab + pRatio * (bb - ab);

  return (rr << 16) + (rg << 8) + (rb | 0);
};

const lerp2Color = (p00, p01, p10, p11, pRatioX, pRatioY) => lerpColor(
  lerpColor(p00, p01, pRatioX),
  lerpColor(p10, p11, pRatioX),
  pRatioY,
);

export {
  gridAbstract, noiseGrid, lerpColor, lerp2Color,
};
