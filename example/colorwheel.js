//
// Description:     ColorEye
// Author:          Copyright (c) 2022 Stephens Nunnally and Scidian Software
// License:         Distributed under the MIT License
// Source(s):       https://github.com/stevinz/coloreye
//
// MIT License
//
// Copyright (c) 2022 Stephens Nunnally (@stevinz)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/////////////////////////////////////////////////////////////////////////////////////
////    Imports
/////////////////////////////////////////////////////////////////////////////////////
import { Coloreye } from '../src/coloreye.js';


/////////////////////////////////////////////////////////////////////////////////////
////    Math Utils
/////////////////////////////////////////////////////////////////////////////////////
function calculateCartesian(r, theta) {
    let x = r * Math.cos(theta);
    let y = r * Math.sin(theta);
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


/////////////////////////////////////////////////////////////////////////////////////
////    Color Wheels / Boxes
/////////////////////////////////////////////////////////////////////////////////////
function drawColorWheel(canvas, type = 'rgb', saturation = 1, size = 0.75 /* 0.0 to 1.0 */) {
    let ctx = canvas.getContext('2d');
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let eye = new Coloreye();
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let ax = x - (canvas.width / 2);
            let ay = y - (canvas.height / 2);
            let h = Math.atan2(ay, ax) * (180 / Math.PI) + 90;
            let s = saturation;
            let l = (Math.pow((Math.pow(ax, 2) + Math.pow(ay, 2)), 0.5) / canvas.width);
            if (l > (size / 2.0)) {
                eye.set(h, s, l, 'hsl');
                if (type === 'ryb') eye.adjustToRyb();
                setPixel(img, x, y, eye.r, eye.g, eye.b, 255);
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

function drawColorBox(canvas, type = 'rgb', hue = 0, size = 0.75 /* 0.0 to 1.0 */) {
    let ctx = canvas.getContext('2d');
    let inMemoryCanvas = document.createElement('canvas');
        inMemoryCanvas.width = Math.round(canvas.width * size);
        inMemoryCanvas.height = Math.round(canvas.height * size);
    let ctxMemory = inMemoryCanvas.getContext('2d');
    let img = ctxMemory.getImageData(0, 0, inMemoryCanvas.width, inMemoryCanvas.height);
    let eye = new Coloreye();
    for (let y = 0; y < inMemoryCanvas.height; y++) {
        for (let x = 0; x < inMemoryCanvas.width; x++) {
            let h = hue;
            let s = 1.0 - (y / inMemoryCanvas.height);
            let l = 1.0 - (x / inMemoryCanvas.width);
                l = (0.5 * s) + (l * (1.0 - s)); 
            eye.set(h, s, l, 'hsl');
            if (type === 'ryb') eye.adjustToRyb();
            setPixel(img, x, y, eye.r, eye.g, eye.b, 255);
        }
    }
    ctxMemory.putImageData(img, 0, 0);
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(hue * (Math.PI / 180));
    ctx.drawImage(inMemoryCanvas, -inMemoryCanvas.width/2, -inMemoryCanvas.height/2);
    ctx.restore();
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


/////////////////////////////////////////////////////////////////////////////////////
////    Exports
/////////////////////////////////////////////////////////////////////////////////////
export { drawColorBox, drawColorWheel };
