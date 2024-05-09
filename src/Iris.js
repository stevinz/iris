/**
 * @description Iris
 * @about       Color library with support for RGB, RYB, HSL color models and RYB hue shifting.
 * @author      Stephens Nunnally <@stevinz>
 * @license     MIT - Copyright (c) 2021-2024 Stephens Nunnally
 * @source      https://github.com/stevinz/iris
 */

/******************** SEE END OF FILE FOR LICENSE / ACKNOWLEDGEMENTS ********************/

//  Initialization
//      const color = new Iris();
//      ...
//      new Iris();                                 // Defaults to white, 0xffffff
//      new Iris(0xff0000);                         // Hexadecimal (0xff0000, i.e. 16711680)
//
//      new Iris(1.0, 0.0, 0.0);                    // RGB Values (0.0 to 1.0)
//
//      new Iris(255,   0,   0, 'rgb');             // RGB Values (0 to 255)
//      new Iris(255,   0,   0, 'ryb');             // RYB Values (0 to 255)
//      new Iris(360, 1.0, 0.5, 'hsl');             // HSL Values (H: 0 to 360, SL: 0.0 to 1.0)
//
//      new Iris({ r: 1.0, g: 0.0, b: 0.0 });       // Object with RGB Properties (0.0 to 1.0)
//      new Iris({ r: 1.0, y: 0.0, b: 0.0 });       // Object with RYB Properties (0.0 to 1.0)
//      new Iris({ h: 1.0, s: 1.0, l: 0.5 });       // Object with HSL Properties (0.0 to 1.0)
//
//      new Iris([ 1.0, 0.0, 0.0 ], offset);        // RGB Array (0.0 to 1.0), optional array offset
//
//      new Iris('#ff0000');                        // Hex String (also 3 digits: #f00)
//      new Iris('rgb(255, 0, 0)');                 // CSS Color String
//      new Iris('red');                            // X11 Color Name
//
//      new Iris(fromIris);                         // Copy from Iris Object
//      new Iris(fromThreeColor);                   // Copy from Three.js Color Object

//  Properties
//      color.r                                     // 0.0 to 1.0
//      color.g                                     // 0.0 to 1.0
//      color.b                                     // 0.0 to 1.0

//  Static
//      Iris.hexString(inputColorData)              // Color (i.e. 0xff0000 / 16711680) to hex string, ex: '#ff0000'
//      Iris.randomHex();                           // Returns random color as integer (i.e. 16711680)

//  Output
//      color.cssString();                          // Returns string, ex: 'rgb(255, 0, 0)'
//      color.hex();                                // Returns number, ex: 16711680 (equivalent to 0xff0000)
//      color.hexString();                          // Returns string, ex: '#ff0000'
//      color.rgbString();                          // Returns string, ex: '255, 0, 0'
//
//      color.getHSL(target);                       // Copies HSL values into target, values from 0.0 to 1.0
//      color.getRGB(target);                       // Copies RGB values into target, values from 0.0 to 1.0
//      color.getRYB(target);                       // Copies RYB values into target, values from 0.0 to 1.0
//      color.toArray(array);                       // Copies RGB values into array, values from 0.0 to 1.0
//
//      color.red();                                // Returns red value of color, 0 to 255
//      color.green();                              // Returns green value of color, 0 to 255
//      color.blue();                               // Returns blue value of color, 0 to 255
//
//      color.redF();                               // Returns red value of color, 0.0 to 1.0
//      color.greenF();                             // Returns green value of color, 0.0 to 1.0
//      color.blueF();                              // Returns blue value of color, 0.0 to 1.0
//
//      color.hue();                                // Returns hue value of color, 0 to 360
//      color.saturation();                         // Returns saturation value of color, 0 to 1.0
//      color.lightness();                          // Returns lightness value of color, 0 to 1.0
//
//      color.hueF();                               // Returns hue value of color, 0.0 to 1.0
//      color.hueRYB();                             // Returns RGB hue mapped to hue in the RYB, 0 to 360

/** Color library with support for RGB, RYB, HSL color models and RYB hue shifting */
class Iris {

    static get NAMES() { return HTML_COLORS; }
    static get EXTENDED_NAMES() { return EXTENDED_COLORS; }

    constructor(r = 0xffffff, g, b, format = '') {
        this.isColor = true;
        this.isIris = true;
        this.type = 'Color';

        this.r = 1;                             // 0.0 to 1.0
        this.g = 1;                             // 0.0 to 1.0
        this.b = 1;                             // 0.0 to 1.0
        this.set(r, g, b, format);
    }

    /******************** COPY / CLONE */

    copy(colorObject) {
        return this.set(colorObject);
    }

    clone() {
        return new this.constructor(this.r, this.g, this.b);
    }

    /******************** ASSIGNMENT */

    set(r = 0, g, b, format = '') {
        // No arguments passed
        if (arguments.length === 0) {
            return this.set(0);
        // No valid arguments passed
        } else if (r == undefined || Number.isNaN(r)) {
            if (g || b) console.warn(`Iris.set(): Invalid 'r' value ${r}`);
            // nothing to do
        // r is Object, Hexidecimal, or String
        } else if (g === undefined && b === undefined) {
            let value = r;
            if (typeof value === 'number' || value === 0) { return this.setHex(value);
            } else if (value && isRGB(value)) { return this.setRGBF(value.r, value.g, value.b);
            } else if (value && isHSL(value)) { return this.setHSL(value.h * 360, value.s, value.l);
            } else if (value && isRYB(value)) { return this.setRYB(value.r * 255, value.y * 255, value.b * 255);
            } else if (Array.isArray(value) && value.length > 2) {
                const offset = (g != null && !Number.isNaN(g) && g > 0) ? g : 0;
                return this.setRGBF(value[offset], value[offset + 1], value[offset + 2])
            } else if (typeof value === 'string') {
                return this.setStyle(value);
            }
        // Three arguments were passed
        } else {
            // Integers were passed
            if (format == null || format === '') {
                if (Number.isInteger(r) && Number.isInteger(g) && Number.isInteger(b)) {
                    if (r > 1 && g > 1 && b > 1) format = 'rgb';
                }
            }
            // Set from rgb
            switch (format) {
                case 'rgb': return this.setRGB(r, g, b);
                case 'hsl': return this.setHSL(r, g, b);
                case 'ryb': return this.setRYB(r, g, b);
                default:    return this.setRGBF(r, g, b);
            }
        }
        return this;
    }

    setColorName(style) {
        if (style == null || typeof style !== 'string' || style === '') return this;
        style = style.replace(/\s/g, ''); // remove spaces
        style = style.toLowerCase();
        const hex = HTML_COLORS[style] ?? EXTENDED_COLORS[style];
        if (hex) return this.setHex(hex);
        console.warn(`Iris.setColorName(): Unknown color ${style}`);
        return this;
    }

    setHex(hexColor) {
        hexColor = Math.floor(hexColor);
        if (hexColor > 0xffffff || hexColor < 0) {
            console.warn(`Iris.setHex(): Given decimal outside of range, value was ${hexColor}`);
            hexColor = clamp(hexColor, 0, 0xffffff);
        }
        const r = (hexColor & 0xff0000) >> 16;
        const g = (hexColor & 0x00ff00) >>  8;
        const b = (hexColor & 0x0000ff);
        return this.setRGB(r, g, b);
    }

    setHSL(h, s, l) {
        h = keepInRange(h, 0, 360);
        s = clamp(s, 0, 1);
        l = clamp(l, 0, 1);
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - (c / 2);
        let r = 0, g = 0, b = 0;
        if                  (h <  60) { r = c; g = x; b = 0; }
        else if ( 60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h)            { r = c; g = 0; b = x; }
        this.setRGBF(r + m, g + m, b + m);
        return this;
    }

    setRandom() {
        return this.setRGBF(Math.random(), Math.random(), Math.random());
    };

    /** 0 to 255 */
    setRGB(r, g, b) {
        return this.setRGBF(r / 255, g / 255, b / 255);
    }

    /** 0.0 to 1.0 */
    setRGBF(r, g, b) {
        this.r = clamp(r, 0, 1);
        this.g = clamp(g, 0, 1);
        this.b = clamp(b, 0, 1);
        return this;
    }

    /** 0 to 255 */
    setRYB(r, y, b) {
        const hexColor = cubicInterpolation(clamp(r, 0, 255), clamp(y, 0, 255), clamp(b, 0, 255), 255, CUBE.RYB_TO_RGB);
        return this.setHex(hexColor);
    }

    /** 0 to 255 */
    setScalar(scalar) {
        return this.setRGB(scalar, scalar, scalar);
    }

    /* 0.0 to 1.0 */
    setScalarF(scalar) {
        return this.setRGBF(scalar, scalar, scalar);
    }

    setStyle(style) {
        // CSS Color: rgb() / rgba() / hsl() / hsla()
        let m;
        if (m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(style)) {
            let color;
            const format = m[1];
            const components = m[2];
            switch (format) {
                case 'rgb':
                case 'rgba':
                    if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        // rgb(255,0,0) rgba(255,0,0,0.5)
                        const r = Math.min(255, parseInt(color[1], 10));
                        const g = Math.min(255, parseInt(color[2], 10));
                        const b = Math.min(255, parseInt(color[3], 10));
                        return this.setRGB(r, g, b);
                    }
                    if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
                        const r = (Math.min(100, parseInt(color[1], 10)) / 100);
                        const g = (Math.min(100, parseInt(color[2], 10)) / 100);
                        const b = (Math.min(100, parseInt(color[3], 10)) / 100);
                        return this.setRGBF(r, g, b);
                    }
                    break;
                case 'hsl':
                case 'hsla':
                    if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
                        const h = parseFloat(color[1]);
                        const s = parseInt(color[2], 10) / 100;
                        const l = parseInt(color[3], 10) / 100;
                        return this.setHSL(h, s, l);
                    }
                    break;
            }
        // Hex Color, i.e. #FF0000
        } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
            const hex = m[1];
            const size = hex.length;
            // #FF0
            if (size === 3) {
                const r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
                const g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
                const b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
                return this.setRGB(r, g, b);
            // #FF0000
            } else if (size === 6) {
                const r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
                const g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
                const b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
                return this.setRGB(r, g, b);
            }
        }
        // X11 Color Name
        if (style && style.length > 0) {
            return this.setColorName(style);
        }
        return this;
    }

    /******************** OUTPUT */

    /** Example output: 'rgb(255, 0, 0)' */
    cssString(alpha /* optional */) {
        return ('rgb(' + this.rgbString(alpha) + ')');
    }

    /** Returns decimal, i.e. 16711680 (equivalent to 0xff0000) */
    hex() {
        return ((this.red() << 16) + (this.green() << 8) + this.blue());
    }

    /** Example output: '#ff0000' */
    hexString(inputColorData /* optional */){
        if (inputColorData) this.set(inputColorData);
        return Iris.hexString(this.hex());
    }

    /** Example output: '#ff0000' */
    static hexString(inputColorData = 0x000000){
        _temp.set(inputColorData);
        return '#' + ('000000' + ((_temp.hex()) >>> 0).toString(16)).slice(-6);
    }

    /** Returns random color as integer (i.e. 16711680) */
    static randomHex() {
        return _random.setRandom().hex();
    }

    /** Example output: '255, 0, 0' */
    rgbString(alpha) {
        const rgb = this.red() + ', ' + this.green() + ', ' + this.blue();
        return ((alpha !== undefined && alpha !== null) ? String(rgb + ', ' + alpha) : rgb);
    }

    /** Export to JSON */
    toJSON() {
        return this.hex();
    }

    /******************** COLOR DATA */

    /** Copies HSL values into optional target, or returns new Object, values range from 0.0 to 1.0 */
    getHSL(target) {
        if (target && isHSL(target)) {
            target.h = hueF(this.hex());
            target.s = saturation(this.hex());
            target.l = lightness(this.hex());
        } else {
            return { h: hueF(this.hex()), s: saturation(this.hex()), l: lightness(this.hex()) };
        }
    }

    /** Copies RGB values into optional target, or returns new Object, values range from 0.0 to 1.0 */
    getRGB(target) {
        if (target && isHSL(target)) {
            target.r = this.r;
            target.g = this.g;
            target.b = this.b;
        } else {
            return { r: this.r, g: this.g, b: this.b };
        }
    }

    /** Copies RYB values into optional target, or returns new Object, values range from 0.0 to 1.0 */
    getRYB(target) {
        let rybAsHex = cubicInterpolation(this.r, this.g, this.b, 1.0, CUBE.RGB_TO_RYB);
        if (target && isRYB(target)) {
            target.r = redF(rybAsHex);
            target.y = greenF(rybAsHex);
            target.b = blueF(rybAsHex);
            return target;
        }
        return {
            r: redF(rybAsHex),
            y: greenF(rybAsHex),
            b: blueF(rybAsHex)
        };
    }

    /** Copies RGB values into optional array, or returns a new Array, values range from 0.0 to 1.0 */
    toArray(array = [], offset = 0) {
        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;
        return array;
    }

    /******************** COMPONENTS */

    red() { return clamp(Math.floor(this.r * 255), 0, 255); }
    green() { return clamp(Math.floor(this.g * 255), 0, 255); }
    blue() { return clamp(Math.floor(this.b * 255), 0, 255); }

    redF() { return this.r; }
    greenF() { return this.g; }
    blueF() { return this.b; }

    hue() { return hue(this.hex()); }
    saturation() { return saturation(this.hex()); }
    lightness() { return lightness(this.hex()); }

    hueF() { return hueF(this.hex()); }

    /** Map a color's RGB hue to the closest hue in the RYB spectrum */
    hueRYB() {
        for (let i = 1; i < RYB_OFFSET.length; i++) {
            if (RYB_OFFSET[i] > this.hue()) return i - 2;
        }
    }

    /******************** ADJUSTMENT */

    /** Adds RGB values from color to this color */
    add(color) {
        if (!color.isColor) console.warn(`Iris.add(): Missing 'color' object`);
        return this.setRGBF(this.r + color.r, this.g + color.g, this.b + color.b);
    }

    /** Adds scalar value to this colors RGB values, range -255 to 255 */
    addScalar(scalar) {
        return this.setRGB(this.red() + scalar, this.green() + scalar, this.blue() + scalar);
    }

    /** Adds scalar value to this colors RGB values, range -1.0 to 1.0 */
    addScalarF(scalar) {
        return this.setRGBF(this.r + scalar, this.g + scalar, this.b + scalar);
    }

    /**
     * Lightens color by amount
     * @param {Number} [amount] Percentage to lighten (default = 0.5) towards 1.0, possible values are 0.0 to 1.0
     */
    brighten(amount = 0.5 /* percentage from 0 to 1 */ ) {
        let h = hue(this.hex());
        let s = saturation(this.hex());
        let l = lightness(this.hex());
        l = l + ((1.0 - l) * amount)
        this.setHSL(h, s, l);
        return this;
    }

    /**
     * Darkens color by amount
     * @param {Number} [amount] Percentage to darken (default = 0.5), 0 = fully dark, 1 = no change, 2 = twice as bright
     */
    darken(amount = 0.5 /* percentage from 0 to 1 */ ) {
        let h = hue(this.hex());
        let s = saturation(this.hex());
        let l = lightness(this.hex()) * amount;
        return this.setHSL(h, s, l);
    }

    /** Converts color to grayscale */
    greyscale(percent = 1.0, format = 'luminosity') { return this.grayscale(percent, format) }
    grayscale(percent = 1.0, format = 'luminosity') {
        let gray = 0;
        switch (format) {
            case 'luminosity':
                gray = (this.r * 0.21) + (this.g * 0.72) + (this.b * 0.07);
            case 'average':
            default:
                gray = (this.r + this.g + this.b) / 3;
        }
        percent = clamp(percent, 0, 1);
        const r = (this.r * (1.0 - percent)) + (percent * gray);
        const g = (this.g * (1.0 - percent)) + (percent * gray);
        const b = (this.b * (1.0 - percent)) + (percent * gray);
        return this.setRGBF(r, g, b);
    }

    hslOffset(h, s, l) {
        return this.setHSL(this.hue() + h, this.saturation() + s, this.lightness() + l);
    }

    /** Mixes in 'color' by percent to this color */
    mix(color, percent = 0.5) {
        if (!color.isColor) console.warn(`Iris.mix(): Missing 'color' object`);
        percent = clamp(percent, 0, 1);
        const r = (this.r * (1.0 - percent)) + (percent * color.r);
        const g = (this.g * (1.0 - percent)) + (percent * color.g);
        const b = (this.b * (1.0 - percent)) + (percent * color.b);
        return this.setRGBF(r, g, b);
    }

    multiply(color) {
        if (!color.isColor) console.warn(`Iris.multiply(): Missing 'color' object`);
        return this.setRGBF(this.r * color.r, this.g * color.g, this.b * color.b);
    }

    /** Multiplies RGB values from this color with scalar value, -Infinity to Infinity */
    multiplyScalar(scalar) {
        return this.setRGBF(this.r * scalar, this.g * scalar, this.b * scalar);
    }

    rgbComplementary() {
        return this.rgbRotateHue(180);
    }

    /** Rotates the hue of a color in the RGB spectrum by degrees */
    rgbRotateHue(degrees = 90) {
        const newHue = keepInRange(this.hue() + degrees);
        return this.setHSL(newHue, this.saturation(), this.lightness());
    }

    /** Adjusts the RGB values to fit in the RYB spectrum as best as possible */
    rybAdjust() {
        return this.setHSL(hue(matchSpectrum(this.hue(), SPECTRUM.RYB)), this.saturation(), this.lightness());
    }

    rybComplementary() {
        return this.rybRotateHue(180);
    }

    /** Rotates the hue of a color in the RYB spectrum by degrees */
    rybRotateHue(degrees = 90) {
        const newHue = keepInRange(this.hueRYB() + degrees);
        return this.setHSL(hue(matchSpectrum(newHue, SPECTRUM.RYB)), this.saturation(), this.lightness());
    }

    /** Subtract RGB values from color to this color */
    subtract(color) {
        if (!color.isColor) console.warn(`Iris.subtract(): Missing 'color' object`);
        return this.setRGBF(this.r - color.r, this.g - color.g, this.b - color.b);
    }

    /******************** COMPARISON */

    /** Returns true if the RGB values of 'color' are the same as those of this object. */
    equals(color) {
        if (!color.isColor) console.warn(`Iris.equals(): Missing 'color' object`);
        return (fuzzy(this.r, color.r) && fuzzy(this.g, color.g) && fuzzy(this.b, color.b));
    }

    /** Returns true if the RGB values of 'color' are the same as those of this object. */
    isEqual(color) {
        return this.equals(color);
    }

    /** Return true if lightness is < 60% for blue / purple / red, or else < 32% for all other colors */
    isDark() {
        const h = this.hue();
        const l = this.lightness();
        return ((l < 0.60 && (h >= 210 || h <= 27)) || (l <= 0.32));
    }

    /** Returns true if color is generally light-ish, false if dark-ish */
    isLight() {
        return (!this.isDark());
    }

}

export { Iris };

/******************** INTERNAL ********************/

function isRGB(object) { return (object.r !== undefined && object.g !== undefined && object.b !== undefined); }
function isHSL(object) { return (object.h !== undefined && object.s !== undefined && object.l !== undefined); }
function isRYB(object) { return (object.r !== undefined && object.y !== undefined && object.b !== undefined); }

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

function red(hexColor) { return clamp((hexColor & 0xff0000) >> 16, 0, 255); }
function green(hexColor) { return clamp((hexColor & 0x00ff00) >> 8, 0, 255); }
function blue(hexColor) { return clamp((hexColor & 0x0000ff), 0, 255); }
function redF(hexColor) { return red(hexColor) / 255.0; }
function greenF(hexColor) { return green(hexColor) / 255.0; }
function blueF(hexColor) { return blue(hexColor) / 255.0; }

function hue(hexColor) { return hsl(hexColor, 'h'); }
function hueF(hexColor) { return hue(hexColor) / 360; }
function saturation(hexColor) { return hsl(hexColor, 's'); }
function lightness(hexColor) { return hsl(hexColor, 'l'); }

function fuzzy(a, b, tolerance = 0.0015) { return ((a < (b + tolerance)) && (a > (b - tolerance))); }

function keepInRange(value, min = 0, max = 360) {
    while (value >= max) value -= (max - min);
    while (value <  min) value += (max - min);
    return value;
}

let _hslHex, _hslH, _hslS, _hslL;

/** Return hue (0 to 360), saturation (0 to 1), and lightness (0 to 1) */
function hsl(hexColor, channel = 'h') {
    if (hexColor !== _hslHex) {
        if (hexColor === undefined || hexColor === null) return 0;

        const r = redF(hexColor), g = greenF(hexColor), b = blueF(hexColor);
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const delta = max - min;
        _hslL = (max + min) / 2;

        if (delta === 0) {
            _hslH = _hslS = 0;
        } else {
            _hslS = (_hslL <= 0.5) ? (delta / (max + min)) : (delta / (2 - max - min));
            switch (max) {
                case r: _hslH = (g - b) / delta + (g < b ? 6 : 0); break;
                case g: _hslH = (b - r) / delta + 2; break;
                case b: _hslH = (r - g) / delta + 4; break;
            }
            _hslH = Math.round(_hslH * 60);
            if (_hslH < 0) _hslH += 360;
        }

        _hslHex = hexColor;
    }

    switch (channel) {
        case 'h': return _hslH;
        case 's': return _hslS;
        case 'l': return _hslL;
        default: console.warn(`Iris.hsl(): Unknown channel (${channel})`);
    }

    return 0;
}

const _interpolate = new Iris();
const _mix1 = new Iris();
const _mix2 = new Iris();
const _random = new Iris();
const _temp = new Iris();

/** Match to 'matchHue' into 'spectrum' */
function matchSpectrum(matchHue, spectrum = SPECTRUM.RYB) {
    let colorDegrees = 360 / spectrum.length;
    let degreeCount = colorDegrees;
    let stopCount = 0;

    for (let i = 0; i < spectrum.length; i++) {
        if (matchHue < degreeCount) {
            let percent = (degreeCount - matchHue) / colorDegrees;
            _mix1.set(spectrum[stopCount + 1]);
            return _mix1.mix(_mix2.set(spectrum[stopCount]), percent).hex();
        } else {
            degreeCount = degreeCount + colorDegrees;
            stopCount = stopCount + 1
        }
    }
}

/**
 * cubicInterpolation
 * @param {*} v1 Input number 1 (probably r of rgb, or r of ryb)
 * @param {*} v2 Input number 2 (probably g of rgb, or y of ryb)
 * @param {*} v3 Input number 3 (probably b of rgb, or b of ryb)
 * @param {*} scale The range of input values, should be either 1 (0 to 1) or 255 (0 to 255)
 * @param {*} table Table to use for cubic interpolation
 * @returns Hexidecimal that has 3 new values embedded
 */
function cubicInterpolation(v1, v2, v3, scale = 255, table = CUBE.RYB_TO_RGB) {
    v1 = clamp(v1 / scale, 0, 1);
    v2 = clamp(v2 / scale, 0, 1);
    v3 = clamp(v3 / scale, 0, 1);

    // Cube Points
    // f0=000, f1=001, f2=010, f3=011, f4=100, f5=101, f6=110, f7=111
    const f0 = table[0], f1 = table[1], f2 = table[2], f3 = table[3];
    const f4 = table[4], f5 = table[5], f6 = table[6], f7 = table[7];

    const i1 = 1.0 - v1;
    const i2 = 1.0 - v2;
    const i3 = 1.0 - v3;

    const c0 = i1 * i2 * i3;
    const c1 = i1 * i2 * v3;
    const c2 = i1 * v2 * i3;
    const c3 = v1 * i2 * i3;
    const c4 = i1 * v2 * v3;
    const c5 = v1 * i2 * v3;
    const c6 = v1 * v2 * i3;
    const v7 = v1 * v2 * v3;

    const o1 = c0*f0[0] + c1*f1[0] + c2*f2[0] + c3*f3[0] + c4*f4[0] + c5*f5[0] + c6*f6[0] + v7*f7[0];
    const o2 = c0*f0[1] + c1*f1[1] + c2*f2[1] + c3*f3[1] + c4*f4[1] + c5*f5[1] + c6*f6[1] + v7*f7[1];
    const o3 = c0*f0[2] + c1*f1[2] + c2*f2[2] + c3*f3[2] + c4*f4[2] + c5*f5[2] + c6*f6[2] + v7*f7[2];

    return _interpolate.set(o1, o2, o3, 'gl').hex();
}

const CUBE = {
    RYB_TO_RGB: [
        [ 1.000, 1.000, 1.000 ],    // white
        [ 0.163, 0.373, 0.600 ],    // blue
        [ 1.000, 1.000, 0.000 ],    // yellow
        [ 1.000, 0.000, 0.000 ],    // red
        [ 0.000, 0.660, 0.200 ],    // green
        [ 0.500, 0.000, 0.500 ],    // purple
        [ 1.000, 0.500, 0.000 ],    // orange
        [ 0.000, 0.000, 0.000 ]     // black
    ],

    RGB_TO_RYB: [
        [ 1.000, 1.000, 1.000 ],    // black
        [ 0.000, 0.000, 1.000 ],    // blue
        [ 0.000, 1.000, 0.483 ],    // green
        [ 1.000, 0.000, 0.000 ],    // red
        [ 0.000, 0.053, 0.210 ],    // cyan
        [ 0.309, 0.000, 0.469 ],    // magenta
        [ 0.000, 1.000, 0.000 ],    // yellow
        [ 0.000, 0.000, 0.000 ]     // white
    ]
};

// Stop values for RYB color wheel
const SPECTRUM = {
    RYB: [
        0xFF0000, 0xFF4900, 0xFF7400, 0xFF9200, 0xFFAA00, 0xFFBF00, 0xFFD300, 0xFFE800,
        0xFFFF00, 0xCCF600, 0x9FEE00, 0x67E300, 0x00CC00, 0x00AF64, 0x009999, 0x0B61A4,
        0x1240AB, 0x1B1BB3, 0x3914AF, 0x530FAD, 0x7109AA, 0xA600A6, 0xCD0074, 0xE40045,
        0xFF0000 /* <-- addded first value to end */
    ]
};

// Map of the RYB wheel to RGB wheel offset
const RYB_OFFSET = [
    0,   1,   2,   3,   5,   6,   7,   8,   9,  10,  11,  13,  14,  15,  16,  17,  18,  19,  19,  20,
    21,  21,  22,  23,  23,  24,  25,  25,  26,  27,  27,  28,  28,  29,  29,  30,  30,  31,  31,  32,
    32,  32,  33,  33,  34,  34,  35,  35,  35,  36,  36,  37,  37,  37,  38,  38,  38,  39,  39,  40,
    40,  40,  41,  41,  41,  42,  42,  42,  43,  43,  43,  44,  44,  44,  45,  45,  45,  46,  46,  46,
    47,  47,  47,  47,  48,  48,  48,  49,  49,  49,  50,  50,  50,  51,  51,  51,  52,  52,  52,  53,
    53,  53,  54,  54,  54,  55,  55,  55,  56,  56,  56,  57,  57,  57,  58,  58,  59,  59,  59,  60,
    60,  61,  61,  62,  63,  63,  64,  65,  65,  66,  67,  68,  68,  69,  70,  70,  71,  72,  72,  73,
    73,  74,  75,  75,  76,  77,  77,  78,  79,  79,  80,  81,  82,  82,  83,  84,  85,  86,  87,  88,
    88,  89,  90,  91,  92,  93,  95,  96,  98, 100, 102, 104, 105, 107, 109, 111, 113, 115, 116, 118,
    120, 122, 125, 127, 129, 131, 134, 136, 138, 141, 143, 145, 147, 150, 152, 154, 156, 158, 159, 161,
    163, 165, 166, 168, 170, 171, 173, 175, 177, 178, 180, 182, 184, 185, 187, 189, 191, 192, 194, 196,
    198, 199, 201, 203, 205, 206, 207, 208, 209, 210, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221,
    222, 223, 224, 226, 227, 228, 229, 230, 232, 233, 234, 235, 236, 238, 239, 240, 241, 242, 243, 244,
    245, 246, 247, 248, 249, 250, 251, 251, 252, 253, 254, 255, 256, 257, 257, 258, 259, 260, 260, 261,
    262, 263, 264, 264, 265, 266, 267, 268, 268, 269, 270, 271, 272, 273, 274, 274, 275, 276, 277, 278,
    279, 280, 282, 283, 284, 286, 287, 289, 290, 292, 293, 294, 296, 297, 299, 300, 302, 303, 305, 307,
    309, 310, 312, 314, 316, 317, 319, 321, 323, 324, 326, 327, 328, 329, 330, 331, 332, 333, 334, 336,
    337, 338, 339, 340, 341, 342, 343, 344, 345, 347, 348, 349, 350, 352, 353, 354, 355, 356, 358, 359,
    999
];

// X11 Color Names (http://www.w3.org/TR/css3-color/#svg-color)
const HTML_COLORS = {
    'aliceblue': 0xf0f8ff, 'antiquewhite': 0xfaebd7, 'aqua': 0x00ffff, 'aquamarine': 0x7fffd4,
    'azure': 0xf0ffff, 'beige': 0xf5f5dc, 'bisque': 0xffe4c4, 'black': 0x000000, 'blanchedalmond': 0xffebcd,
    'blue': 0x0000ff, 'blueviolet': 0x8a2be2, 'brown': 0xa52a2a, 'burlywood': 0xdeb887, 'cadetblue': 0x5f9ea0,
    'chartreuse': 0x7fff00, 'chocolate': 0xd2691e, 'coral': 0xff7f50, 'cornflowerblue': 0x6495ed,
    'cornsilk': 0xfff8dc, 'crimson': 0xdc143c, 'cyan': 0x00ffff, 'darkblue': 0x00008b, 'darkcyan': 0x008b8b,
    'darkgoldenrod': 0xb8860b, 'darkgray': 0xa9a9a9, 'darkgreen': 0x006400, 'darkgrey': 0xa9a9a9,
    'darkkhaki': 0xbdb76b, 'darkmagenta': 0x8b008b, 'darkolivegreen': 0x556b2f, 'darkorange': 0xff8c00,
    'darkorchid': 0x9932cc, 'darkred': 0x8b0000, 'darksalmon': 0xe9967a, 'darkseagreen': 0x8fbc8f,
    'darkslateblue': 0x483d8b, 'darkslategray': 0x2f4f4f, 'darkslategrey': 0x2f4f4f, 'darkturquoise': 0x00ced1,
    'darkviolet': 0x9400d3, 'deeppink': 0xff1493, 'deepskyblue': 0x00bfff, 'dimgray': 0x696969,
    'dimgrey': 0x696969, 'dodgerblue': 0x1e90ff, 'firebrick': 0xb22222, 'floralwhite': 0xfffaf0,
    'forestgreen': 0x228b22, 'fuchsia': 0xff00ff, 'gainsboro': 0xdcdcdc, 'ghostwhite': 0xf8f8ff,
    'gold': 0xffd700, 'goldenrod': 0xdaa520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xadff2f,
    'grey': 0x808080, 'honeydew': 0xf0fff0, 'hotpink': 0xff69b4, 'indianred': 0xcd5c5c, 'indigo': 0x4b0082,
    'ivory': 0xfffff0, 'khaki': 0xf0e68c, 'lavender': 0xe6e6fa, 'lavenderblush': 0xfff0f5, 'lawngreen': 0x7cfc00,
    'lemonchiffon': 0xfffacd, 'lightblue': 0xadd8e6, 'lightcoral': 0xf08080, 'lightcyan': 0xe0ffff,
    'lightgoldenrodyellow': 0xfafad2, 'lightgray': 0xd3d3d3, 'lightgreen': 0x90ee90, 'lightgrey': 0xd3d3d3,
    'lightpink': 0xffb6c1, 'lightsalmon': 0xffa07a, 'lightseagreen': 0x20b2aa, 'lightskyblue': 0x87cefa,
    'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xb0c4de, 'lightyellow': 0xffffe0,
    'lime': 0x00ff00, 'limegreen': 0x32cd32, 'linen': 0xfaf0e6, 'magenta': 0xff00ff, 'maroon': 0x800000,
    'mediumaquamarine': 0x66cdaa, 'mediumblue': 0x0000cd, 'mediumorchid': 0xba55d3, 'mediumpurple': 0x9370db,
    'mediumseagreen': 0x3cb371, 'mediumslateblue': 0x7b68ee, 'mediumspringgreen': 0x00fa9a,
    'mediumturquoise': 0x48d1cc, 'mediumvioletred': 0xc71585, 'midnightblue': 0x191970, 'mintcream': 0xf5fffa,
    'mistyrose': 0xffe4e1, 'moccasin': 0xffe4b5, 'navajowhite': 0xffdead, 'navy': 0x000080, 'oldlace': 0xfdf5e6,
    'olive': 0x808000, 'olivedrab': 0x6b8e23, 'orange': 0xffa500, 'orangered': 0xff4500, 'orchid': 0xda70d6,
    'palegoldenrod': 0xeee8aa, 'palegreen': 0x98fb98, 'paleturquoise': 0xafeeee, 'palevioletred': 0xdb7093,
    'papayawhip': 0xffefd5, 'peachpuff': 0xffdab9, 'peru': 0xcd853f, 'pink': 0xffc0cb, 'plum': 0xdda0dd,
    'powderblue': 0xb0e0e6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xff0000,
    'rosybrown': 0xbc8f8f, 'royalblue': 0x4169e1, 'saddlebrown': 0x8b4513, 'salmon': 0xfa8072,
    'sandybrown': 0xf4a460, 'seagreen': 0x2e8b57, 'seashell': 0xfff5ee, 'sienna': 0xa0522d, 'silver': 0xc0c0c0,
    'skyblue': 0x87ceeb, 'slateblue': 0x6a5acd, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xfffafa,
    'springgreen': 0x00ff7f, 'steelblue': 0x4682b4, 'tan': 0xd2b48c, 'teal': 0x008080, 'thistle': 0xd8bfd8,
    'tomato': 0xff6347, 'turquoise': 0x40e0d0, 'transparent': 0x000000, 'violet': 0xee82ee, 'wheat': 0xf5deb3,
    'white': 0xffffff, 'whitesmoke': 0xf5f5f5, 'yellow': 0xffff00, 'yellowgreen': 0x9acd32
};

// Extended HTML colors (https://htmlcolorcodes.com/colors)
const EXTENDED_COLORS = {
    // black
    'black': 0x000000, 'charcoal': 0x36454f, 'darkgreen': 0x023020, 'darkpurple': 0x301934, 'jetblack': 0x343434,
    'licorice': 0x1b1212, 'matteblack': 0x28282b, 'midnightblue': 0x191970, 'onyx': 0x353935,
    // blue
    'aqua': 0x00ffff, 'azure': 0xf0ffff, 'babyblue': 0x89cff0, 'blue': 0x0000ff, 'bluegray': 0x7393b3,
    'bluegreen': 0x088f8f, 'brightblue': 0x0096ff, 'cadetblue': 0x5f9ea0, 'cobaltblue': 0x0047ab,
    'cornflowerblue': 0x6495ed, 'cyan': 0x00ffff, 'darkblue': 0x00008b, 'denim': 0x6f8faf, 'egyptianblue': 0x1434a4,
    'electricblue': 0x7df9ff, 'glaucous': 0x6082b6, 'jade': 0x00a36c, 'indigo': 0x3f00ff, 'iris': 0x5d3fd3,
    'lightblue': 0xadd8e6, 'midnightblue': 0x191970, 'navyblue': 0x000080, 'neonblue': 0x1f51ff,
    'pastelblue': 0xa7c7e7, 'periwinkle': 0xccccff, 'powderblue': 0xb6d0e2, 'robineggblue': 0x96ded1,
    'royalblue': 0x4169e1, 'sapphireblue': 0x0f52ba, 'seafoamgreen': 0x9fe2bf, 'skyblue': 0x87ceeb,
    'steelblue': 0x4682b4, 'teal': 0x008080, 'turquoise': 0x40e0d0, 'ultramarine': 0x0437f2, 'verdigris': 0x40b5ad,
    'zaffre': 0x0818a8,
    // brown
    'almond': 0xeaddca, 'brass': 0xe1c16e, 'bronze': 0xcd7f32, 'brown': 0xa52a2a, 'buff': 0xdaa06d,
    'burgundy': 0x800020, 'burntsienna': 0xe97451, 'burntumber': 0x6e260e, 'camel': 0xc19a6b, 'chestnut': 0x954535,
    'chocolate': 0x7b3f00, 'cinnamon': 0xd27d2d, 'coffee': 0x6f4e37, 'cognac': 0x834333, 'copper': 0xb87333,
    'cordovan': 0x814141, 'darkbrown': 0x5c4033, 'darkred': 0x8b0000, 'darktan': 0x988558, 'ecru': 0xc2b280,
    'fallow': 0xc19a6b, 'fawn': 0xe5aa70, 'garnet': 0x9a2a2a, 'goldenbrown': 0x966919, 'khaki': 0xf0e68c,
    'lightbrown': 0xc4a484, 'mahogany': 0xc04000, 'maroon': 0x800000, 'mocha': 0x967969, 'nude': 0xf2d2bd,
    'ochre': 0xcc7722, 'olivegreen': 0x808000, 'oxblood': 0x4a0404, 'puce': 0xa95c68, 'redbrown': 0xa52a2a,
    'redochre': 0x913831, 'russet': 0x80461b, 'saddlebrown': 0x8b4513, 'sand': 0xc2b280, 'sienna': 0xa0522d,
    'tan': 0xd2b48c, 'taupe': 0x483c32, 'tuscanred': 0x7c3030, 'wheat': 0xf5deb3, 'wine': 0x722f37,
    // gray
    'ashgray': 0xb2beb5, 'bluegray': 0x7393b3, 'charcoal': 0x36454f, 'darkgray': 0xa9a9a9, 'glaucous': 0x6082b6,
    'gray': 0x808080, 'gunmetalgray': 0x818589, 'lightgray': 0xd3d3d3, 'pewter': 0x899499, 'platinum': 0xe5e4e2,
    'sagegreen': 0x8a9a5b, 'silver': 0xc0c0c0, 'slategray': 0x708090, 'smoke': 0x848884, 'steelgray': 0x71797e,
    // green
    'aqua': 0x00ffff, 'aquamarine': 0x7fffd4, 'armygreen': 0x454b1b, 'bluegreen': 0x088f8f, 'brightgreen': 0xaaff00,
    'cadetblue': 0x5f9ea0, 'cadmiumgreen': 0x097969, 'celadon': 0xafe1af, 'chartreuse': 0xdfff00, 'citrine': 0xe4d00a,
    'cyan': 0x00ffff, 'darkgreen': 0x023020, 'electricblue': 0x7df9ff, 'emeraldgreen': 0x50c878, 'eucalyptus': 0x5f8575,
    'ferngreen': 0x4f7942, 'forestgreen': 0x228b22, 'grassgreen': 0x7cfc00, 'green': 0x008000, 'huntergreen': 0x355e3b,
    'jade': 0x00a36c, 'junglegreen': 0x2aaa8a, 'kellygreen': 0x4cbb17, 'lightgreen': 0x90ee90, 'limegreen': 0x32cd32,
    'lincolngreen': 0x478778, 'malachite': 0x0bda51, 'mintgreen': 0x98fb98, 'mossgreen': 0x8a9a5b,
    'neongreen': 0x0fff50, 'nyanza': 0xecffdc, 'olivegreen': 0x808000, 'pastelgreen': 0xc1e1c1, 'pear': 0xc9cc3f,
    'peridot': 0xb4c424, 'pistachio': 0x93c572, 'robineggblue': 0x96ded1, 'sagegreen': 0x8a9a5b,
    'seagreen': 0x2e8b57, 'seafoamgreen': 0x9fe2bf, 'shamrockgreen': 0x009e60, 'springgreen': 0x00ff7f,
    'teal': 0x008080, 'turquoise': 0x40e0d0, 'vegasgold': 0xc4b454, 'verdigris': 0x40b5ad, 'viridian': 0x40826d,
    // orange
    'amber': 0xffbf00, 'apricot': 0xfbceb1, 'bisque': 0xf2d2bd, 'brightorange': 0xffac1c, 'bronze': 0xcd7f32,
    'buff': 0xdaa06d, 'burntorange': 0xcc5500, 'burntsienna': 0xe97451, 'butterscotch': 0xe3963e,
    'cadmiumorange': 0xf28c28, 'cinnamon': 0xd27d2d, 'copper': 0xb87333, 'coral': 0xff7f50, 'coralpink': 0xf88379,
    'darkorange': 0x8b4000, 'desert': 0xfad5a5, 'gamboge': 0xe49b0f, 'goldenyellow': 0xffc000, 'goldenrod': 0xdaa520,
    'lightorange': 0xffd580, 'mahogany': 0xc04000, 'mango': 0xf4bb44, 'navajowhite': 0xffdead, 'neonorange': 0xff5f1f,
    'ochre': 0xcc7722, 'orange': 0xffa500, 'pastelorange': 0xfac898, 'peach': 0xffe5b4, 'persimmon': 0xec5800,
    'pinkorange': 0xf89880, 'poppy': 0xe35335, 'pumpkinorange': 0xff7518, 'redorange': 0xff4433, 'safetyorange': 0xff5f15,
    'salmon': 0xfa8072, 'seashell': 0xfff5ee, 'sienna': 0xa0522d, 'sunsetorange': 0xfa5f55, 'tangerine': 0xf08000,
    'terracotta': 0xe3735e, 'yelloworange': 0xffaa33,
    // pink
    'amaranth': 0x9f2b68, 'bisque': 0xf2d2bd, 'cerise': 0xde3163, 'claret': 0x811331, 'coral': 0xff7f50,
    'coralpink': 0xf88379, 'crimson': 0xdc143c, 'darkpink': 0xaa336a, 'dustyrose': 0xc9a9a6,
    'fuchsia': 0xff00ff, 'hotpink': 0xff69b4, 'lightpink': 0xffb6c1, 'magenta': 0xff00ff, 'millennialpink': 0xf3cfc6,
    'mulberry': 0x770737, 'neonpink': 0xff10f0, 'orchid': 0xda70d6, 'pastelpink': 0xf8c8dc, 'pastelred': 0xfaa0a0,
    'pink': 0xffc0cb, 'pinkorange': 0xf89880, 'plum': 0x673147, 'puce': 0xa95c68, 'purple': 0x800080,
    'raspberry': 0xe30b5c, 'redpurple': 0x953553, 'rose': 0xf33a6a, 'rosegold': 0xe0bfb8, 'rosered': 0xc21e56,
    'rubyred': 0xe0115f, 'salmon': 0xfa8072, 'seashell': 0xfff5ee, 'thistle': 0xd8bfd8, 'watermelonpink': 0xe37383,
    // purple
    'amaranth': 0x9f2b68, 'brightpurple': 0xbf40bf, 'burgundy': 0x800020, 'byzantium': 0x702963, 'darkpink': 0xaa336a,
    'darkpurple': 0x301934, 'eggplant': 0x483248, 'iris': 0x5d3fd3, 'lavender': 0xe6e6fa, 'lightpurple': 0xcbc3e3,
    'lightviolet': 0xcf9fff, 'lilac': 0xaa98a9, 'mauve': 0xe0b0ff, 'mauvetaupe': 0x915f6d, 'mulberry': 0x770737,
    'orchid': 0xda70d6, 'pastelpurple': 0xc3b1e1, 'periwinkle': 0xccccff, 'plum': 0x673147, 'puce': 0xa95c68,
    'purple': 0x800080, 'quartz': 0x51414f, 'redpurple': 0x953553, 'thistle': 0xd8bfd8, 'tyrianpurple': 0x630330,
    'violet': 0x7f00ff, 'wine': 0x722f37, 'wisteria': 0xbdb5d5,
    // red
    'bloodred': 0x880808, 'brickred': 0xaa4a44, 'brightred': 0xee4b2b, 'brown': 0xa52a2a, 'burgundy': 0x800020,
    'burntumber': 0x6e260e, 'burntorange': 0xcc5500, 'burntsienna': 0xe97451, 'byzantium': 0x702963,
    'cadmiumred': 0xd22b2b, 'cardinalred': 0xc41e3a, 'carmine': 0xd70040, 'cerise': 0xde3163, 'cherry': 0xd2042d,
    'chestnut': 0x954535, 'claret': 0x811331, 'coralpink': 0xf88379, 'cordovan': 0x814141, 'crimson': 0xdc143c,
    'darkred': 0x8b0000, 'falured': 0x7b1818, 'garnet': 0x9a2a2a, 'mahogany': 0xc04000, 'maroon': 0x800000,
    'marsala': 0x986868, 'mulberry': 0x770737, 'neonred': 0xff3131, 'oxblood': 0x4a0404, 'pastelred': 0xfaa0a0,
    'persimmon': 0xec5800, 'poppy': 0xe35335, 'puce': 0xa95c68, 'raspberry': 0xe30b5c, 'red': 0xff0000,
    'redbrown': 0xa52a2a, 'redochre': 0x913831, 'redorange': 0xff4433, 'redpurple': 0x953553, 'rosered': 0xc21e56,
    'rubyred': 0xe0115f, 'russet': 0x80461b, 'salmon': 0xfa8072, 'scarlet': 0xff2400, 'sunsetorange': 0xfa5f55,
    'terracotta': 0xe3735e, 'tuscanred': 0x7c3030, 'tyrianpurple': 0x630330, 'venetianred': 0xa42a04,
    'vermillion': 0xe34234, 'wine': 0x722f37,
    // white
    'alabaster': 0xedeade, 'beige': 0xf5f5dc, 'bonewhite': 0xf9f6ee, 'cornsilk': 0xfff8dc, 'cream': 0xfffdd0,
    'eggshell': 0xf0ead6, 'ivory': 0xfffff0, 'linen': 0xe9dcc9, 'navajowhite': 0xffdead, 'offwhite': 0xfaf9f6,
    'parchment': 0xfcf5e5, 'peach': 0xffe5b4, 'pearl': 0xe2dfd2, 'seashell': 0xfff5ee, 'vanilla': 0xf3e5ab,
    'white': 0xffffff,
    // yellow
    'almond': 0xeaddca, 'amber': 0xffbf00, 'apricot': 0xfbceb1, 'beige': 0xf5f5dc, 'brass': 0xe1c16e,
    'brightyellow': 0xffea00, 'cadmiumyellow': 0xfdda0d, 'canaryyellow': 0xffff8f, 'chartreuse': 0xdfff00,
    'citrine': 0xe4d00a, 'cornsilk': 0xfff8dc, 'cream': 0xfffdd0, 'darkyellow': 0x8b8000, 'desert': 0xfad5a5,
    'ecru': 0xc2b280, 'flax': 0xeedc82, 'gamboge': 0xe49b0f, 'gold': 0xffd700, 'goldenyellow': 0xffc000,
    'goldenrod': 0xdaa520, 'icterine': 0xfcf55f, 'ivory': 0xfffff0, 'jasmine': 0xf8de7e, 'khaki': 0xf0e68c,
    'lemonyellow': 0xfafa33, 'maize': 0xfbec5d, 'mango': 0xf4bb44, 'mustardyellow': 0xffdb58, 'naplesyellow': 0xfada5e,
    'navajowhite': 0xffdead, 'nyanza': 0xecffdc, 'pastelyellow': 0xfffaa0, 'peach': 0xffe5b4, 'pear': 0xc9cc3f,
    'peridot': 0xb4c424, 'pistachio': 0x93c572, 'saffron': 0xf4c430, 'vanilla': 0xf3e5ab, 'vegasgold': 0xc4b454,
    'wheat': 0xf5deb3, 'yellow': 0xffff00, 'yelloworange': 0xffaa33,
};

/////////////////////////////////////////////////////////////////////////////////////
/////   Acknowledgements
/////////////////////////////////////////////////////////////////////////////////////
//
// Some portions of this code adapted from:
//      Description:    Color Schemer
//      Author:         Scott Kellum <@scottkellum> and Mason Wendell <@canarymason>
//      License:        Distributed under the MIT License
//      Source(s):      https://github.com/at-import/color-schemer/blob/master/stylesheets/color-schemer/_ryb.scss
//
//      Description:    three.js
//      Author:         mrdoob and three.js authors
//      License:        Distributed under the MIT License
//      Source(s):      https://github.com/mrdoob/three.js/blob/master/src/math/Color.js
//
//      Description:    RYB
//      Author:         Ilya Kolbin
//      License:        Distributed under the MIT License
//      Source(s):      https://github.com/iskolbin/lryb/blob/master/ryb.lua
//
// Thanks to:
//      Description:    RYB and RGB Color Space Conversion
//      Author:         Jean-Olivier Irisson
//      Source(s):      https://math.stackexchange.com/questions/305395/ryb-and-rgb-color-space-conversion
//
//      Description:    Paint Inspired Color Mixing and Compositing for Visualization
//      Author:         Nathan Gossett & Baoquan Chen
//      Source(s):      http://vis.computer.org/vis2004/DVD/infovis/papers/gossett.pdf

/////////////////////////////////////////////////////////////////////////////////////
/////   License
/////////////////////////////////////////////////////////////////////////////////////
//
// MIT License
//
// Iris
//      Copyright (c) 2021 Stephens Nunnally <@stevinz>
//
// Some Portions
//      Copyright (c) 2011 Scott Kellum <@scottkellum> and Mason Wendell <@canarymason>
//      Copyright (c) 2010 mrdoob and three.js authors
//      Copyright (c) 2018 Ilya Kolbin
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
