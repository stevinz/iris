//
// Description:     ColorEye
// Author:          Copyright (c) 2022 Stephens Nunnally and Scidian Software
// License:         Distributed under the MIT License
// Source(s):       https://github.com/stevinz/coloreye
//
// See end of file for license details and acknowledgements
//
/////////////////////////////////////////////////////////////////////////////////////
////
////                                    Coloreye
////
////    constructor() or set() arguments
////        Coloreye(hexColor);                     // Hexadecimal (0xffffff, i.e. 16777215)
////        Coloreye(r, g, b);                      // RGB Values (0 to 255)
////        Coloreye(r, g, b, 'rgb');               // RGB Values (0 to 255)
////        Coloreye(r, g, b, 'three');             // RGB Values (0.0 to 1.0)
////        Coloreye(r, g, b, 'gl');                // RGB Values (0.0 to 1.0)
////        Coloreye(h, s, l, 'hsl');               // HSL Values (h: 0 to 360, s / l: 0.0 to 1.0)
////        Coloreye(r, y, b, 'ryb');               // RYB Values (0 to 255)
////        Coloreye({ r: 255, g: 0, b: 0 });       // Object with RGB Properties
////        Coloreye({ h: 360, s: 1.0, l: 0.5 });   // Object with HSL Properties
////        Coloreye({ r: 255, y: 0, b: 0 });       // Object with RYB Properties
////        Coloreye([1.0, 0.0, 0.0], offset);      // RGB Array (0.0 to 1.0), Optional Array Offset
////        Coloreye('#ff0000');                    // Hex String (also 3 digits: #f00)
////        Coloreye('rgb(255, 0, 0)');             // CSS Color String
////        Coloreye('darkred')                     // X11 Color Name
////        Coloreye(fromColoreye);                 // Copy from Coloreye Object
////        Coloreye(fromTHREEColor);               // Copy from THREE.Color Object
////
////    properties:
////        Coloreye.r      0 to 255  
////        Coloreye.g      0 to 255
////        Coloreye.b      0 to 255
////
/////////////////////////////////////////////////////////////////////////////////////

class Coloreye {

    constructor(r = 0, g, b, type = 'rgb') {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.set(r, g, b, type);
    }


    /////////////////////////////////////////////////////////////////////////////////////
    ////    Assignment
    ////////////////////
    clone() { return new this.constructor(this.r, this.g, this.b); }
   
    copy(colorObject) { return this.set(colorObject); }
   
    set(r = 0, g, b, type = 'rgb') {
        // No arguments passed
        if (arguments.length === 0) {
            return this.set(0);
        // No valid arguments passed
        } else if (r === undefined || r === null || Number.isNaN(r)) {
            if (g || b) console.warn(`Coloreye: Passed some valid arguments, however 'r' was ${r}`);
            // nothing to do
        // One argument, hexColor, rgbColor, hslColor, or string
        } else if (g === undefined && b === undefined) {
            let value = r;
            if (typeof value === 'number' || value === 0) {
                return this.setHex(value);
            } else if (value && isRgb(value)) {
                let multiplier = (value.isColor) ? 255 : 1.0;           // #NOTE: check if THREE.Color()
                return this.setRgb(value.r, value.g, value.b, multiplier);
            } else if (value && isHsl(value)) {
                return this.setHsl(value.h, value.s, value.l);
            } else if (value && isRyb(value)) {
                return this.setRyb(value.r, value.y, value.b);
            } else if (Array.isArray(value) && value.length > 2) {
                let offset = (typeof g === number && g > 0) ? g : 0;
                return this.setRgb(value[offset], value[offset + 1], value[offset + 2])
            } else if (typeof value === 'string') {
                return this.setStyle(value);
            }
        // Three arguments were passed
        } else {
            switch (type) {
                case 'hsl':     return this.setHsl(r, g, b);
                case 'rgb':     return this.setRgb(r, g, b, 1.0);
                case 'ryb':     return this.setRyb(r, g, b);
                case 'three':   return this.setRgb(r, g, b, 255);
                case 'gl':      return this.setRgb(r, g, b, 255);
                default:        return this.setRgb(r, g, b, 1.0);
            }
        }
        return this;
	}

    setHex(hexColor) {
        hexColor = Math.floor(hexColor);
        if (hexColor > 0xffffff || hexColor < 0) {
            console.warn(`Coloreye: Given decimal outside of range, value was ${hexColor}`);
            hexColor = clamp(hexColor(0, 0xffffff));
        } 
        this.r = clamp((hexColor & 0xff0000) >> 16, 0, 255);
        this.g = clamp((hexColor & 0x00ff00) >>  8, 0, 255);
        this.b = clamp((hexColor & 0x0000ff),       0, 255);
        return this;
    }

    setHsl(h, s, l) {
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
        r = Math.floor((r + m) * 255);
        g = Math.floor((g + m) * 255);
        b = Math.floor((b + m) * 255);
        this.setRgb(r, g, b);
        return this;
    }

    setRgb(r, g, b, multiplier = 1.0) {
        this.r = clamp(Math.floor(r * multiplier), 0, 255);
        this.g = clamp(Math.floor(g * multiplier), 0, 255);
        this.b = clamp(Math.floor(b * multiplier), 0, 255);
        return this;
    }

    setRyb(r, y, b) {
        let hexColor = cubicInterpolation(r, y, b, 255, CUBE.RYB_TO_RGB);
        return this.setHex(hexColor);
    }

    setStyle(style) {
        // CSS Color: rgb() / rgba() / hsl() / hsla()
        let m;
		if (m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(style)) {
			let color;
			const name = m[1];
			const components = m[2];
			switch (name) {
				case 'rgb':
				case 'rgba':
					if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
						// rgb(255,0,0) rgba(255,0,0,0.5)
						this.r = Math.min(255, parseInt(color[1], 10));
						this.g = Math.min(255, parseInt(color[2], 10));
						this.b = Math.min(255, parseInt(color[3], 10));
						return this;
					}
					if ( color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
						// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
						this.r = (Math.min(100, parseInt(color[1], 10)) / 100) * 255;
						this.g = (Math.min(100, parseInt(color[2], 10)) / 100) * 255;
						this.b = (Math.min(100, parseInt(color[3], 10)) / 100) * 255;
						return this;
					}
					break;
				case 'hsl':
				case 'hsla':
					if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
						// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
						const h = parseFloat(color[1]);
						const s = parseInt(color[2], 10) / 100;
						const l = parseInt(color[3], 10) / 100;
						return this.setHsl(h, s, l);
					}
					break;
			}
        // Hex Color, i.e. #FF0000
        } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
			const hex = m[1];
			const size = hex.length;
            // #FF0
			if (size === 3) {
				let r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
				let g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
				let b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
				return this.setRgb(r, g, b);
            // #FF0000
			} else if (size === 6) {
				let r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
				let g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
				let b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
				return this.setRgb(r, g, b);
			}
		}
        // X11 Color Name
		if (style && style.length > 0) {
			return this.setColorName(style);
		}
		return this;
	}

	setColorName(style) {
	    const hex = COLOR_KEYWORDS[ style.toLowerCase() ];
		if (hex !== undefined) {
			this.setHex(hex);
		} else {
			console.warn(`Coloreye: Unknown color ${style}`);
		}
		return this;
	}

    setRandom() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return this.setRgb(r, g, b);
    };


    /////////////////////////////////////////////////////////////////////////////////////
    ////    Output
    ////////////////////
    // Returns decimal, i.e. 16777215 (equivalent to 0xff0000)
    hex() {
        return ((this.r << 16) + (this.g << 8) + this.b);
    }

    // Example output: 'rgb(255, 0, 0)'
    cssString(alpha) {
        return ('rgb(' + this.rgbString(alpha) + ')');
    }

    // Example output: '#ff0000'
    hexString(hexColor){
        if (hexColor === undefined || typeof value !== 'number') hexColor = this.hex();
        return '#' + ('000000' + ((hexColor) >>> 0).toString(16)).slice(-6);
    }

    // Example output: '255, 0, 0'
    rgbString(alpha) {
        let rgb = this.r + ', ' + this.g + ', ' + this.b;
        let rgba = (alpha) ? rgb + ', ' + alpha : rgb;
        return rgba;
    }

    // Spectrum components
    red() { return this.r; }
    green() { return this.g; }
    blue() { return this.b; }
    redF() { return this.r / 255.0; }
    greenF() { return this.g / 255.0; }
    blueF() { return this.b / 255.0; }
    hue() { return hue(this.hex()); }
    saturation() { return saturation(this.hex()); }
    lightness() { return lightness(this.hex()); }

    // Map a color's RGB hue to the closest hue in the RYB spectrum
    rybHue() {
        const colorHue = this.hue();
        for (let i = 1; i < RYB_OFFSET.length; i++) {
            if (RYB_OFFSET[i] > colorHue) return i - 2;
        }
    }

    // Copies hsl values into target
    getHsl(target) {
        target.h = hue(this.hex());
        target.s = saturation(this.hex());
        target.l = lightness(this.hex());
    }

    // Copies rgb values into target, when copying to THREE.Color() use multiplier = (1 / 255)
    getRgb(target, multiplier = 1.0) {
        target.r = this.r * multiplier;
        target.g = this.g * multiplier;
        target.b = this.b * multiplier;
    }

    getRyb(target) {
	    let rybAsHex = cubicInterpolation(this.r, this.g, this.b, 255, CUBE.RGB_TO_RYB);
        target.r = clamp((rybAsHex & 0xff0000) >> 16, 0, 255);
        target.y = clamp((rybAsHex & 0x00ff00) >>  8, 0, 255);
        target.b = clamp((rybAsHex & 0x0000ff),       0, 255);
    }

    // Export to JSON
    toJSON() {
		return this.hex();
	}
 

    /////////////////////////////////////////////////////////////////////////////////////
    ////    Color Functions
    ////////////////////
    // Lightens color by amount
    brighten(amount = 0.5 /* percentage from 0 to 1 */ ) {
        let h = hue(this.hex());
        let s = saturation(this.hex());
        let l = lightness(this.hex());
        l = l + ((1.0 - l) * amount)
        this.setHsl(h, s, l);
        return this;
    }

    // Darkens color by amount
    darken(amount = 0.5 /* percentage from 0 to 1 */ ) {
        let h = hue(this.hex());
        let s = saturation(this.hex());
        let l = lightness(this.hex()) * amount;
        this.setHsl(h, s, l);
        return this;
    }

    // Mixes in mixColor by percent
    mix(mixColor, percent = 0.5) {
        percent = Math.abs(percent);
        if (percent > 1.0) percent = 1.0;
    
        let r3 = Math.floor(this.r + (percent * (mixColor.r - this.r)));
        let g3 = Math.floor(this.g + (percent * (mixColor.g - this.g)));
        let b3 = Math.floor(this.b + (percent * (mixColor.b - this.b)));
        return this.setRgb(r3, g3, b3);
    }

     // Adjusts the RGB values to fit in the RYB spectrum as best as possible
    adjustToRyb() {
        return this.setHsl(hue(matchSpectrum(this.hue(), SPECTRUM.RYB)), this.saturation(), this.lightness());
    }

    // Rotates the hue of a color in the RYB spectrum by degrees
    rybRotateHue(degrees = 90) {
        let newHue = keepInRange(this.rybHue() + degrees);
        return this.setHsl(hue(matchSpectrum(newHue, SPECTRUM.RYB)), this.saturation(), this.lightness());
    }

    // Rotates the hue of a color in the RGB spectrum by degrees
    rgbRotateHue(degrees = 90) {
        let newHue = keepInRange(this.hue() + degrees);
        return this.setHsl(newHue, this.saturation(), this.lightness());
    }


    /////////////////////////////////////////////////////////////////////////////////////
    ////    Comparison
    ////////////////////
    // Returns true if the RGB values of 'color' are the same as those of this object.
    equals(color) {
        return (this.r === color.r && this.g === color.g && this.b === color.b);
    }

    // Return true if lightness is < 60% for blue / purple / red, or else < 32% for all other colors
    isDark() {
        const h = this.hue();
        const l = this.lightness();
        return ((l < 0.60 && (h >= 210 || h <= 27)) || (l <= 0.32));
    }


}


/////////////////////////////////////////////////////////////////////////////////////
////    Utility Functions
/////////////////////////////////////////////////////////////////////////////////////
function isRgb(object) { return (object.r !== undefined && object.g !== undefined && object.b !== undefined); }
function isHsl(object) { return (object.h !== undefined && object.s !== undefined && object.l !== undefined); }
function isRyb(object) { return (object.r !== undefined && object.y !== undefined && object.b !== undefined); }

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

function red(hexColor) { return clamp((hexColor & 0xff0000) >> 16, 0, 255); }
function green(hexColor) { return clamp((hexColor & 0x00ff00) >> 8, 0, 255); }
function blue(hexColor) { return clamp((hexColor & 0x0000ff), 0, 255); }

function hue(hexColor) { return hsl(hexColor, 'h'); }
function saturation(hexColor) { return hsl(hexColor, 's'); }
function lightness(hexColor) { return hsl(hexColor, 'l'); }

function keepInRange(value, min = 0, max = 360) {
    while (value >= max) value -= (max - min);
    while (value <  min) value += (max - min);
    return value;
}

// Returns: hsl(0 to 360, 0 to 1, 0 to 1)
function hsl(hexColor, channel = 'h') {
    const r = red(hexColor) / 255, g = green(hexColor) / 255, b = blue(hexColor) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const delta = max - min;
    let h, s, l = (max + min) / 2;

    if (delta === 0) {
        h = s = 0;
    } else {
        s = (l <= 0.5) ? (delta / (max + min)) : (delta / (2 - max - min));
        switch (max) {
            case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
            case g: h = (b - r) / delta + 2; break;
            case b: h = (r - g) / delta + 4; break;
        }
        h = Math.round(h * 60);
        if (h < 0) h += 360;
    }
    
    switch (channel) {
        case 'h': return h;
        case 's': return s;
        case 'l': return l;
        default: console.warn(`Coloreye: Unknown channel (${channel}) requested in hsl()`); return 0;
    }
}


/////////////////////////////////////////////////////////////////////////////////////
////    Match to 'matchHue' into 'spectrum'
////////////////////
const _mix1 = new Coloreye();
const _mix2 = new Coloreye();

function matchSpectrum(matchHue, spectrum) {
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


/////////////////////////////////////////////////////////////////////////////////////
////    Cubic Interpolation
////////////////////
const _interpolate = new Coloreye();

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
	let f0 = table[0], f1 = table[1], f2 = table[2], f3 = table[3];
	let f4 = table[4], f5 = table[5], f6 = table[6], f7 = table[7];

	let i1 = 1.0 - v1;
    let i2 = 1.0 - v2; 
    let i3 = 1.0 - v3;

	let c0 = i1 * i2 * i3;
    let c1 = i1 * i2 * v3;
    let c2 = i1 * v2 * i3;
    let c3 = v1 * i2 * i3;
	let c4 = i1 * v2 * v3;
    let c5 = v1 * i2 * v3; 
    let c6 = v1 * v2 * i3;
    let v7 = v1 * v2 * v3;
    
    let o1 = c0*f0[0] + c1*f1[0] + c2*f2[0] + c3*f3[0] + c4*f4[0] + c5*f5[0] + c6*f6[0] + v7*f7[0];
    let o2 = c0*f0[1] + c1*f1[1] + c2*f2[1] + c3*f3[1] + c4*f4[1] + c5*f5[1] + c6*f6[1] + v7*f7[1];
    let o3 = c0*f0[2] + c1*f1[2] + c2*f2[2] + c3*f3[2] + c4*f4[2] + c5*f5[2] + c6*f6[2] + v7*f7[2];

    return _interpolate.set(o1, o2, o3, 'gl').hex();
}


/////////////////////////////////////////////////////////////////////////////////////
////    Color Data
/////////////////////////////////////////////////////////////////////////////////////
let CUBE = {
	RYB_TO_RGB: [
        [ 1.000, 1.000, 1.000 ],    // white
		[ 0.163, 0.373, 0.600 ],    // blue
        [ 1.000, 1.000, 0.000 ],    // yellow
		[ 1.000, 0.000, 0.000 ],    // red
        [ 0.000, 0.660, 0.200 ],    // green
        [ 0.500, 0.000, 0.500 ],    // purple
        [ 1.000, 0.500, 0.000 ],    // orange
		[ 0.000, 0.000, 0.000 ],    // black
    ],

	RGB_TO_RYB: [
		[ 1.000, 1.000, 1.000 ],    // black
		[ 0.000, 0.000, 1.000 ],    // blue
        [ 0.000, 1.000, 0.483 ],    // green
        [ 1.000, 0.000, 0.000 ],    // red
        [ 0.000, 0.053, 0.210 ],    // cyan
        [ 0.309, 0.000, 0.469 ],    // magenta
        [ 0.000, 1.000, 0.000 ],    // yellow
		[ 0.000, 0.000, 0.000 ],    // white
    ],
};

// Stop values for RYB color wheel
let SPECTRUM = {
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

// X11 Color Names - http://www.w3.org/TR/css3-color/#svg-color
const COLOR_KEYWORDS = { 
    'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4,
    'azure': 0xF0FFFF, 'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD,
    'blue': 0x0000FF, 'blueviolet': 0x8A2BE2, 'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0,
    'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50, 'cornflowerblue': 0x6495ED,
    'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9,
    'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B, 'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00,
    'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1,
    'darkviolet': 0x9400D3, 'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969,
    'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222, 'floralwhite': 0xFFFAF0,
    'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF,
    'gold': 0xFFD700, 'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F,
    'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4, 'indianred': 0xCD5C5C, 'indigo': 0x4B0082,
    'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF,
    'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3, 'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3,
    'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0,
    'lime': 0x00FF00, 'limegreen': 0x32CD32, 'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000,
    'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3, 'mediumpurple': 0x9370DB,
    'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A,
    'mediumturquoise': 0x48D1CC, 'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA,
    'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD, 'navy': 0x000080, 'oldlace': 0xFDF5E6,
    'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093,
    'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9, 'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD,
    'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000,
    'rosybrown': 0xBC8F8F, 'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072,
    'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE, 'sienna': 0xA0522D, 'silver': 0xC0C0C0,
    'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8,
    'tomato': 0xFF6347, 'turquoise': 0x40E0D0, 'transparent': 0x000000, 'violet': 0xEE82EE, 'wheat': 0xF5DEB3,
    'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32
};

  
/////////////////////////////////////////////////////////////////////////////////////
////    Exports
/////////////////////////////////////////////////////////////////////////////////////
export { Coloreye, COLOR_KEYWORDS };


/////////////////////////////////////////////////////////////////////////////////////
////    Acknowledgements
/////////////////////////////////////////////////////////////////////////////////////
//
// Some portions of this code adapted from:
//      Description:    Color Schemer
//      Author:         Scott Kellum (@scottkellum) and Mason Wendell (@canarymason)
//      License:        Distributed under the MIT License
//      Source:         https://github.com/at-import/color-schemer/blob/master/stylesheets/color-schemer/_ryb.scss
//
//      Description:    three.js
//      Author:         mrdoob and three.js authors
//      License:        Distributed under the MIT License
//      Source:         https://github.com/mrdoob/three.js/blob/master/src/math/Color.js
//
//      Description:    RYB
//      Author:         Ilya Kolbin
//      License:        Distributed under the MIT License
//      Source:         https://github.com/iskolbin/lryb/blob/master/ryb.lua
//
// Thanks to:
//      Description:    RYB and RGB Color Space Conversion
//      Author:         Jean-Olivier Irisson
//      Source:         https://math.stackexchange.com/questions/305395/ryb-and-rgb-color-space-conversion
//      
//      Description:    Paint Inspired Color Mixing and Compositing for Visualization
//      Author:         Nathan Gossett & Baoquan Chen
//      Source:         http://vis.computer.org/vis2004/DVD/infovis/papers/gossett.pdf
//
/////////////////////////////////////////////////////////////////////////////////////
////    License
/////////////////////////////////////////////////////////////////////////////////////
//
// MIT License
//
// ColorEye
//      Copyright (c) 2022 Stephens Nunnally (@stevinz)
//
// Some Portions
//      Copyright (c) 2011 Scott Kellum (@scottkellum) and Mason Wendell (@canarymason)
//      Copyright (c) 2010-2022 mrdoob and three.js authors
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