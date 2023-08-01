import { Iris } from 'iris';
import { drawHueWheel, placeCircle } from './colorwheel.js';

const _color = new Iris();
const _clrStart = new Iris();
const _clr1 = new Iris();
const _clr2 = new Iris();

const colorBox = document.getElementById('colorBox');
const colorPicker = document.getElementById('colorPicker');
const rgbR = document.getElementById('sliderRgbR'), txtRgbR = document.getElementById('rgbValueR');
const rgbG = document.getElementById('sliderRgbG'), txtRgbG = document.getElementById('rgbValueG');
const rgbB = document.getElementById('sliderRgbB'), txtRgbB = document.getElementById('rgbValueB');
const rybR = document.getElementById('sliderRybR'), txtRybR = document.getElementById('rybValueR');
const rybY = document.getElementById('sliderRybY'), txtRybY = document.getElementById('rybValueY');
const rybB = document.getElementById('sliderRybB'), txtRybB = document.getElementById('rybValueB');

const rgbWheel = document.getElementById('colorWheelRgb');
const rybWheel = document.getElementById('colorWheelRyb');
const rgbCircle = document.getElementById('circleRgb');
const rybCircle = document.getElementById('circleRyb');

// Complement
const clrRgb1 = document.getElementById('colorRgb1'), clrRyb1 = document.getElementById('colorRyb1');
const clrRgb2 = document.getElementById('colorRgb2'), clrRyb2 = document.getElementById('colorRyb2');
const clrRgb3 = document.getElementById('colorRgb3'), clrRyb3 = document.getElementById('colorRyb3');
const clrRgb4 = document.getElementById('colorRgb4'), clrRyb4 = document.getElementById('colorRyb4');
const clrRgb5 = document.getElementById('colorRgb5'), clrRyb5 = document.getElementById('colorRyb5');
const clrRgb6 = document.getElementById('colorRgb6'), clrRyb6 = document.getElementById('colorRyb6');
const clrRgb7 = document.getElementById('colorRgb7'), clrRyb7 = document.getElementById('colorRyb7');
const clrRgb8 = document.getElementById('colorRgb8'), clrRyb8 = document.getElementById('colorRyb8');
const clrRgb9 = document.getElementById('colorRgb9'), clrRyb9 = document.getElementById('colorRyb9');

// Triadic
const triRgb1 = document.getElementById('triadRgb1'), triRyb1 = document.getElementById('triadRyb1');
const triRgb2 = document.getElementById('triadRgb2'), triRyb2 = document.getElementById('triadRyb2');
const triRgb3 = document.getElementById('triadRgb3'), triRyb3 = document.getElementById('triadRyb3');
const triRgb4 = document.getElementById('triadRgb4'), triRyb4 = document.getElementById('triadRyb4');
const triRgb5 = document.getElementById('triadRgb5'), triRyb5 = document.getElementById('triadRyb5');
const triRgb6 = document.getElementById('triadRgb6'), triRyb6 = document.getElementById('triadRyb6');
const triRgb7 = document.getElementById('triadRgb7'), triRyb7 = document.getElementById('triadRyb7');
const triRgb8 = document.getElementById('triadRgb8'), triRyb8 = document.getElementById('triadRyb8');
const triRgb9 = document.getElementById('triadRgb9'), triRyb9 = document.getElementById('triadRyb9');

function connectElements() {
    colorPicker.addEventListener('input', () => {
        updateElements(colorPicker.value);
    });

    rgbR.addEventListener('input', rgbSliderChange);
    rgbG.addEventListener('input', rgbSliderChange);
    rgbB.addEventListener('input', rgbSliderChange);
    rybR.addEventListener('input', rybSliderChange);
    rybY.addEventListener('input', rybSliderChange);
    rybB.addEventListener('input', rybSliderChange);

    drawHueWheel(rgbWheel, 'rgb', 0.5);
    drawHueWheel(rybWheel, 'ryb', 0.5);

    const colorBoxStyle = getComputedStyle(colorBox);
    updateElements(colorBoxStyle.backgroundColor);
}

function rgbSliderChange() {
    _color.set(rgbR.value, rgbG.value, rgbB.value, 'rgb');
    updateElements(_color.hex());
}

function rybSliderChange() {
    _color.set(rybR.value, rybY.value, rybB.value, 'ryb');
    updateElements(_color.hex());
}

function updateElements(color) {
    _color.set(color);
    colorBox.style.background = _color.hexString();

    const rgb = _color.getRGB();
    rgbR.value = rgb.r * 255;
    rgbG.value = rgb.g * 255;
    rgbB.value = rgb.b * 255;

    const ryb = _color.getRYB();
    rybR.value = ryb.r * 255;
    rybY.value = ryb.y * 255;
    rybB.value = ryb.b * 255;

    txtRgbR.innerHTML = rgbR.value;
    txtRgbG.innerHTML = rgbG.value;
    txtRgbB.innerHTML = rgbB.value;
    txtRybR.innerHTML = rybR.value;
    txtRybY.innerHTML = rybY.value;
    txtRybB.innerHTML = rybB.value;

    // Complement
    _clr1.set(_color).rgbComplementary();
    clrRgb1.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.000).cssString();
    clrRgb2.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.125).cssString();
    clrRgb3.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.250).cssString();
    clrRgb4.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.325).cssString();
    clrRgb5.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.500).cssString();
    clrRgb6.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.625).cssString();
    clrRgb7.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.750).cssString();
    clrRgb8.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.875).cssString();
    clrRgb9.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 1.000).cssString();

    _clr1.set(_color).rybComplementary();
    clrRyb1.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.000).cssString();
    clrRyb2.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.125).cssString();
    clrRyb3.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.250).cssString();
    clrRyb4.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.325).cssString();
    clrRyb5.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.500).cssString();
    clrRyb6.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.625).cssString();
    clrRyb7.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.750).cssString();
    clrRyb8.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.875).cssString();
    clrRyb9.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 1.000).cssString();

    // Triad
    _clr1.set(_color).rgbRotateHue(120);
    _clr2.set(_color).rgbRotateHue(240);
    triRgb1.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.000).cssString();
    triRgb2.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.250).cssString();
    triRgb3.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.500).cssString();
    triRgb4.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.750).cssString();
    triRgb5.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 1.000).cssString();
    triRgb6.style.backgroundColor = _clrStart.set(_clr1).mix(_clr2, 0.250).cssString();
    triRgb7.style.backgroundColor = _clrStart.set(_clr1).mix(_clr2, 0.500).cssString();
    triRgb8.style.backgroundColor = _clrStart.set(_clr1).mix(_clr2, 0.750).cssString();
    triRgb9.style.backgroundColor = _clrStart.set(_clr1).mix(_clr2, 1.000).cssString();

    _clr1.set(_color).rybRotateHue(120);
    _clr2.set(_color).rybRotateHue(240);
    triRyb1.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.000).cssString();
    triRyb2.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.250).cssString();
    triRyb3.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.500).cssString();
    triRyb4.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 0.750).cssString();
    triRyb5.style.backgroundColor = _clrStart.set(_color).mix(_clr1, 1.000).cssString();
    triRyb6.style.backgroundColor = _clrStart.set(_clr1).mix(_clr2, 0.250).cssString();
    triRyb7.style.backgroundColor = _clrStart.set(_clr1).mix(_clr2, 0.500).cssString();
    triRyb8.style.backgroundColor = _clrStart.set(_clr1).mix(_clr2, 0.750).cssString();
    triRyb9.style.backgroundColor = _clrStart.set(_clr1).mix(_clr2, 1.000).cssString();

    placeCircle(rgbWheel, 'rgb', rgbCircle, _color.hue());
    placeCircle(rybWheel, 'ryb', rybCircle, _color.hue());
}

export { connectElements, updateElements };
