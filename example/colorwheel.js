import { Iris } from 'iris';

/** Color Wheels, size = 0.0 to 1.0 (percent) */
function drawHueWheel(canvas, type = 'rgb', size = 0.75) {
    let ctx = canvas.getContext('2d');
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let eye = new Iris();

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let ax = x - (canvas.width / 2);
            let ay = y - (canvas.height / 2);
            let h = Math.atan2(ay, ax) * (180 / Math.PI) + 90;
            let s = 1;
            let l = (Math.pow((Math.pow(ax, 2) + Math.pow(ay, 2)), 0.5) / (canvas.width));
            if (l > (size / 2)) {
                eye.set(h, s, l, 'hsl');
                if (type === 'ryb') eye.rybAdjust();
                setPixel(img, x, y, eye.red(), eye.green(), eye.blue(), 255);
            }
        }
    }

    ctx.putImageData(img, 0, 0);

    if (size > 0) {
        ctx.beginPath();
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.width / 2) * size, 0, Math.PI * 2, false);
        ctx.stroke();
    }
}

function setPixel(img, x, y, r, g, b, a) {
    x = Math.floor(x);
    y = Math.floor(y);
    let pos = (y * img.width * 4) + (x * 4);
    if (pos >= 0 && pos <= img.data.length - 4) {
        img.data[pos]     = r;
        img.data[pos + 1] = g;
        img.data[pos + 2] = b;
        img.data[pos + 3] = a;
    }
}

/** Color highlight */
function placeCircle(canvas, type = 'rgb', circle, hue) {
    let eye = new Iris();
    eye.set(hue, 1.0, 0.5, 'hsl');

    let h = eye.hue();
    if (type === 'ryb') h = eye.hueRYB();

    let box = canvas.getBoundingClientRect();
    let cir = circle.getBoundingClientRect();
    let pos = calculateCartesian(canvas.width * 0.5, h - 90);

    circle.style.left = box.left + (box.width / 2) + pos.x - (cir.width / 2) + 'px';
    circle.style.top = box.top + (box.height / 2) + pos.y - (cir.height / 2) + 'px';
}

export { drawHueWheel, placeCircle };

/******************** INTERNAL ********************/

function calculateCartesian(r, theta) {
    let radians = (Math.PI / 180) * theta;
    let x = r * Math.cos(radians);
    let y = r * Math.sin(radians);
    return { x: x, y: y };
}

function calculatePolar(x, y) {
    let r = Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 0.5);
    let theta = Math.atan2(y, x);
    return { magnitude: r, angle: theta };
}

function rotatePoint(centerX, centerY, x, y, degrees, target) {
    let radians = (Math.PI / 180) * degrees;
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    target.x = (cos * (x - centerX)) + (sin * (y - centerY)) + centerX;
    target.y = (cos * (y - centerY)) - (sin * (x - centerX)) + centerY;
}
