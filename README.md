# ColorEye
Small, fast, zero-dependency javascript color library with support for the RGB / RYB/ HSL color models. Internal functions have no object creation for maximum performance. 

Also features hue shifting on the RYB spectrum for more natural complementary and triadic colors.

<br>

## Usage

Copy file 'coloreye.js' into project, import class into code

```javascript
import { Coloreye } from './coloreye.js';
```

Create Coloreye() object

```javascript
let myColor = new Coloreye();
```

Coloreye can be initialized in the following ways

```javascript
Coloreye(hexColor);                     // Hexadecimal (0xffffff, i.e. 16777215)
Coloreye(r, g, b);                      // RGB Values (0 to 255)
Coloreye(r, g, b, 'rgb');               // RGB Values (0 to 255)
Coloreye(r, g, b, 'three');             // RGB Values (0.0 to 1.0)
Coloreye(r, g, b, 'gl');                // RGB Values (0.0 to 1.0)
Coloreye(h, s, l, 'hsl');               // HSL Values (h: 0 to 360, s & l: 0.0 to 1.0)
Coloreye(r, y, b, 'ryb');               // RYB Values (0 to 255)
Coloreye({ r: 255, g: 0, b: 0 });       // Object with RGB Properties
Coloreye({ h: 360, s: 1.0, l: 0.5 });   // Object with HSL Properties
Coloreye({ r: 255, y: 0, b: 0 });       // Object with RYB Properties
Coloreye([1.0, 0.0, 0.0], offset);      // RGB Array (0.0 to 1.0), optional array offset
Coloreye('#ff0000');                    // Hex String (also 3 digits: #f00)
Coloreye('rgb(255, 0, 0)');             // CSS Color String
Coloreye('darkred')                     // X11 Color Name
Coloreye(fromColoreye);                 // Copy from Coloreye()
Coloreye(fromTHREEColor);               // Copy from Three.js Color()
```

Example usage with [Three.js](https://threejs.org/)
```javascript
const eyeColor = new Coloreye('blue');
const threeColor = new THREE.Color(eyeColor.hex()).multiplyScalar(0.75);

eyeColor.set(threeColor).rybRotateHue(180).brighten(0.5);
threeColor.setHex(eyeColor.hex());
```
<br>

## Properties

### .[r]() : Integer
Red channel value between 0 and 255, default is 0.

### .[g]() : Integer
Green channel value between 0 and 255, default is 0.

### .[b]() : Integer
Blue channel value between 0 and 255, default is 0.

<br>

## Setters

### .set()

<br>

## Comparison

### .[equals]() ( color : Coloreye ) : Boolean
Returns true if the RGB values of 'color' are the same as those of this object.