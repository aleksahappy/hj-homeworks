'use strict';

const canvas = document.getElementById("draw");
const ctx = canvas.getContext('2d');

let hue = 0,
    brushRadius = 100,
    curves = [],
    drawing = false,
    needsRepaint = false,
    needsReduceHue = false,
    needsReduceRadius = true;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

window.addEventListener('resize', canvasResize);

canvas.addEventListener('mousedown', (event) => {
  drawing = true;
  const point = [event.offsetX, event.offsetY, brushRadius, hue];
  const curve = [];
  curve.push(point);
  curves.push(curve);
  needsRepaint = true;
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});

canvas.addEventListener('mousemove', (event) => {
  if (drawing) {
    hue = changeHue();
    brushRadius = changebrushRadius();
    needsReduceHue = event.shiftKey;
    const point = [event.offsetX, event.offsetY, brushRadius, hue];
    curves[curves.length - 1].push(point);
    needsRepaint = true;
  }
});

canvas.addEventListener('dblclick', () => {
  curves = [];
  needsRepaint = true;
});

function canvasResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  curves = [];
  hue = 0;
  brushRadius = 100;
  needsRepaint = true;
}

function circle(point) {
  ctx.beginPath();
  ctx.arc(point[0], point[1], point[2] / 2, 0, 2 * Math.PI);
  ctx.fillStyle = `hsl(${point[3]}, 100%, 50%)`;
  ctx.fill();
}

function smoothCurve(points) {
  for(let i = 1; i < points.length - 1; i++) {
    smoothCurveBetween(points[i], points[i + 1]);
  }
}

function smoothCurveBetween(point1, point2) {
  const controlPoint = [(point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2];

  ctx.beginPath();
  ctx.moveTo(point1[0], point1[1]);
  ctx.quadraticCurveTo(controlPoint[0], controlPoint[1], point2[0], point2[1]);

  ctx.lineWidth = point1[2];
  ctx.strokeStyle = `hsl(${point1[3]}, 100%, 50%)`;
  ctx.stroke();
}

function changeHue() {
  needsReduceHue ? hue-- : hue++;
  if (hue < 0) {
    hue = 359;
  }
  if (hue > 359) {
     hue = 0;
  }
  return hue;
}

function changebrushRadius() {
  if (brushRadius === 5) {
    needsReduceRadius = false;
  }
  if (brushRadius === 100) {
    needsReduceRadius = true;
  }
  if (needsReduceRadius) {
    brushRadius--;
  } else {
    brushRadius++;
  }
  return brushRadius;
}

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  curves.forEach((curve) => {
    circle(curve[0]);
    smoothCurve(curve);
  })
}

function tick() {
  if (needsRepaint) {
    repaint();
    needsRepaint = false;
  }
  window.requestAnimationFrame(tick);
}

tick();
