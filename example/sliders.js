//
// Description:     Iris
// Author:          Copyright (c) 2022 Stephens Nunnally and Scidian Studios
// License:         Distributed under the MIT License
// Source(s):       https://github.com/scidian/iris
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

import { Iris } from 'iris';

import { drawHueWheel, placeCircle } from './colorwheel.js';

/////////////////////////////////////////////////////////////////////////////////////
////    File Scope Variables
/////////////////////////////////////////////////////////////////////////////////////

let eye = new Iris();
let ryb = new Iris();
let colorBox = document.getElementById('colorBox');
let rgbR = document.getElementById('sliderRgbR'), txtRgbR = document.getElementById('rgbValueR');
let rgbG = document.getElementById('sliderRgbG'), txtRgbG = document.getElementById('rgbValueG');
let rgbB = document.getElementById('sliderRgbB'), txtRgbB = document.getElementById('rgbValueB');
let rybR = document.getElementById('sliderRybR'), txtRybR = document.getElementById('rybValueR');
let rybY = document.getElementById('sliderRybY'), txtRybY = document.getElementById('rybValueY');
let rybB = document.getElementById('sliderRybB'), txtRybB = document.getElementById('rybValueB');

let rgbWheel = document.getElementById('colorWheelRgb');
let rybWheel = document.getElementById('colorWheelRyb');
let rgbCircle = document.getElementById('circleRgb');
let rybCircle = document.getElementById('circleRyb');

// Complement
let clrRgb1 = document.getElementById('colorRgb1');
let clrRgb2 = document.getElementById('colorRgb2');
let clrRgb3 = document.getElementById('colorRgb3');
let clrRgb4 = document.getElementById('colorRgb4');
let clrRgb5 = document.getElementById('colorRgb5');
let clrRgb6 = document.getElementById('colorRgb6');
let clrRgb7 = document.getElementById('colorRgb7');
let clrRgb8 = document.getElementById('colorRgb8');
let clrRgb9 = document.getElementById('colorRgb9');

let clrRyb1 = document.getElementById('colorRyb1');
let clrRyb2 = document.getElementById('colorRyb2');
let clrRyb3 = document.getElementById('colorRyb3');
let clrRyb4 = document.getElementById('colorRyb4');
let clrRyb5 = document.getElementById('colorRyb5');
let clrRyb6 = document.getElementById('colorRyb6');
let clrRyb7 = document.getElementById('colorRyb7');
let clrRyb8 = document.getElementById('colorRyb8');
let clrRyb9 = document.getElementById('colorRyb9');

// Triad
let triRgb1 = document.getElementById('triadRgb1');
let triRgb2 = document.getElementById('triadRgb2');
let triRgb3 = document.getElementById('triadRgb3');
let triRgb4 = document.getElementById('triadRgb4');
let triRgb5 = document.getElementById('triadRgb5');
let triRgb6 = document.getElementById('triadRgb6');
let triRgb7 = document.getElementById('triadRgb7');
let triRgb8 = document.getElementById('triadRgb8');
let triRgb9 = document.getElementById('triadRgb9');

let triRyb1 = document.getElementById('triadRyb1');
let triRyb2 = document.getElementById('triadRyb2');
let triRyb3 = document.getElementById('triadRyb3');
let triRyb4 = document.getElementById('triadRyb4');
let triRyb5 = document.getElementById('triadRyb5');
let triRyb6 = document.getElementById('triadRyb6');
let triRyb7 = document.getElementById('triadRyb7');
let triRyb8 = document.getElementById('triadRyb8');
let triRyb9 = document.getElementById('triadRyb9');

/////////////////////////////////////////////////////////////////////////////////////
////    Initialization
/////////////////////////////////////////////////////////////////////////////////////

function connectSliders() {
    onSliderChange(rgbR, updateSlider, updateRgbR);
    onSliderChange(rgbG, updateSlider, updateRgbG);
    onSliderChange(rgbB, updateSlider, updateRgbB);
    onSliderChange(rybR, updateSlider, updateRybR);
    onSliderChange(rybY, updateSlider, updateRybY);
    onSliderChange(rybB, updateSlider, updateRybB);

    const colorStyle = getComputedStyle(colorBox);
    eye.set(colorStyle.backgroundColor);

    updateRgb();
    updateRyb();

    drawHueWheel(rgbWheel, 'rgb', 0.5);
    drawHueWheel(rybWheel, 'ryb', 0.5);
}

/////////////////////////////////////////////////////////////////////////////////////
////    Callback
/////////////////////////////////////////////////////////////////////////////////////

function updateSlider(event) {
    const colorStyle = getComputedStyle(colorBox);
    eye.set(colorStyle.backgroundColor);
    event.target.updateFunction(event);
    colorBox.style.backgroundColor = eye.cssString();
}

/////////////////////////////////////////////////////////////////////////////////////
////    Update Sliders / Values
/////////////////////////////////////////////////////////////////////////////////////

function updateRgbR(event) { eye.set(event.target.value, rgbG.value, rgbB.value, 'rgb'); updateRyb(); }
function updateRgbG(event) { eye.set(rgbR.value, event.target.value, rgbB.value, 'rgb'); updateRyb(); }
function updateRgbB(event) { eye.set(rgbR.value, rgbG.value, event.target.value, 'rgb'); updateRyb(); }

function updateRgb() {
    let rgb = eye.getRGB();
    rgbR.value = rgb.r * 255;
    rgbG.value = rgb.g * 255;
    rgbB.value = rgb.b * 255;
    updateText();
}

function updateRybR(event) { eye.set(event.target.value, rybY.value, rybB.value, 'ryb'); updateRgb(); }
function updateRybY(event) { eye.set(rybR.value, event.target.value, rybB.value, 'ryb'); updateRgb(); }
function updateRybB(event) { eye.set(rybR.value, rybY.value, event.target.value, 'ryb'); updateRgb(); }

function updateRyb() {
    let ryb = eye.getRYB();
    rybR.value = ryb.r * 255;
    rybY.value = ryb.y * 255;
    rybB.value = ryb.b * 255;
    updateText();
}

function updateText() {
    txtRgbR.innerHTML = rgbR.value;
    txtRgbG.innerHTML = rgbG.value;
    txtRgbB.innerHTML = rgbB.value;
    txtRybR.innerHTML = rybR.value;
    txtRybY.innerHTML = rybY.value;
    txtRybB.innerHTML = rybB.value;

    let clrStart = new Iris();
    let clr1 = new Iris();
    let clr2 = new Iris();

    // Complement
    clr1 = new Iris(eye).rgbComplementary();
    clrRgb1.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.000).cssString();
    clrRgb2.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.125).cssString();
    clrRgb3.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.250).cssString();
    clrRgb4.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.325).cssString();
    clrRgb5.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.500).cssString();
    clrRgb6.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.625).cssString();
    clrRgb7.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.750).cssString();
    clrRgb8.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.875).cssString();
    clrRgb9.style.backgroundColor = clrStart.set(eye).mix(clr1, 1.000).cssString();

    clr1 = new Iris(eye).rybComplementary();
    clrRyb1.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.000).cssString();
    clrRyb2.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.125).cssString();
    clrRyb3.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.250).cssString();
    clrRyb4.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.325).cssString();
    clrRyb5.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.500).cssString();
    clrRyb6.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.625).cssString();
    clrRyb7.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.750).cssString();
    clrRyb8.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.875).cssString();
    clrRyb9.style.backgroundColor = clrStart.set(eye).mix(clr1, 1.000).cssString();

    // Triad
    clr1 = new Iris(eye).rgbRotateHue(120);
    clr2 = new Iris(eye).rgbRotateHue(240);
    triRgb1.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.000).cssString();
    triRgb2.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.250).cssString();
    triRgb3.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.500).cssString();
    triRgb4.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.750).cssString();
    triRgb5.style.backgroundColor = clrStart.set(eye).mix(clr1, 1.000).cssString();
    triRgb6.style.backgroundColor = clrStart.set(clr1).mix(clr2, 0.250).cssString();
    triRgb7.style.backgroundColor = clrStart.set(clr1).mix(clr2, 0.500).cssString();
    triRgb8.style.backgroundColor = clrStart.set(clr1).mix(clr2, 0.750).cssString();
    triRgb9.style.backgroundColor = clrStart.set(clr1).mix(clr2, 1.000).cssString();

    clr1 = new Iris(eye).rybRotateHue(120);
    clr2 = new Iris(eye).rybRotateHue(240);
    triRyb1.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.000).cssString();
    triRyb2.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.250).cssString();
    triRyb3.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.500).cssString();
    triRyb4.style.backgroundColor = clrStart.set(eye).mix(clr1, 0.750).cssString();
    triRyb5.style.backgroundColor = clrStart.set(eye).mix(clr1, 1.000).cssString();
    triRyb6.style.backgroundColor = clrStart.set(clr1).mix(clr2, 0.250).cssString();
    triRyb7.style.backgroundColor = clrStart.set(clr1).mix(clr2, 0.500).cssString();
    triRyb8.style.backgroundColor = clrStart.set(clr1).mix(clr2, 0.750).cssString();
    triRyb9.style.backgroundColor = clrStart.set(clr1).mix(clr2, 1.000).cssString();

    placeCircle(rgbWheel, 'rgb', rgbCircle, eye.hue());
    placeCircle(rybWheel, 'ryb', rybCircle, eye.hue());
}

/////////////////////////////////////////////////////////////////////////////////////
////    Event Handler
/////////////////////////////////////////////////////////////////////////////////////

function onSliderChange(element, handler, updateFunction) {
    element.updateFunction = updateFunction;
    element.currentValue = element.value;
    element.newValue = element.value;

    element.addEventListener('input', function(event) {
        event.target.inputCalled = true;
        event.target.newValue = event.target.value;
        if (event.target.newValue !== event.target.currentValue) handler(event);
        event.target.currentValue = event.target.newValue;
    });

    element.addEventListener('change', function(event) {
        if (! event.target.inputCalled) handler(event);
    });
}

/////////////////////////////////////////////////////////////////////////////////////
////    Exports
/////////////////////////////////////////////////////////////////////////////////////

export { connectSliders };
