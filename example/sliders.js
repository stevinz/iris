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
import { ColorEye } from '../src/coloreye.js';


/////////////////////////////////////////////////////////////////////////////////////
////    File Scope Variables
/////////////////////////////////////////////////////////////////////////////////////
let eye = new ColorEye();
let colorBox = document.getElementById('colorBox');
let rgbR = document.getElementById('sliderRgbR'), txtRgbR = document.getElementById('rgbValueR');
let rgbG = document.getElementById('sliderRgbG'), txtRgbG = document.getElementById('rgbValueG');
let rgbB = document.getElementById('sliderRgbB'), txtRgbB = document.getElementById('rgbValueB');
let rybR = document.getElementById('sliderRybR'), txtRybR = document.getElementById('rybValueR');
let rybY = document.getElementById('sliderRybY'), txtRybY = document.getElementById('rybValueY');
let rybB = document.getElementById('sliderRybB'), txtRybB = document.getElementById('rybValueB');


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
    updateText();
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

