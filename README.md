# ColorEye
Small, fast, zero-dependency javascript color library with support for the RGB / RYB / HSL color models. Internal functions create no new objects for maximum performance. 

Also features hue shifting around the RYB color wheel. This creates much more natural complementary colors and palettes, similar to those seen at tools like [Paletton](https://paletton.com/).

<br>

## Usage

#### Copy file 'coloreye.js' into project, import class

```javascript
import { ColorEye } from './coloreye.js';
```

#### Create new ColorEye Object

```javascript
let myColor = new ColorEye();
```

#### ColorEye can be initialized in the following ways

```javascript
ColorEye(hexColor);                     // Hexadecimal (0xffffff, i.e. 16777215)
ColorEye(r, g, b);                      // RGB Values (0 to 255)
ColorEye(r, g, b, 'rgb');               // RGB Values (0 to 255)
ColorEye(r, g, b, 'three');             // RGB Values (0.0 to 1.0)
ColorEye(r, g, b, 'gl');                // RGB Values (0.0 to 1.0)
ColorEye(h, s, l, 'hsl');               // HSL Values (H: 0 to 360, SL: 0.0 to 1.0)
ColorEye(r, y, b, 'ryb');               // RYB Values (0 to 255)
ColorEye({ r: 255, g: 0, b: 0 });       // Object with RGB Properties
ColorEye({ h: 360, s: 1.0, l: 0.5 });   // Object with HSL Properties
ColorEye({ r: 255, y: 0, b: 0 });       // Object with RYB Properties
ColorEye([1.0, 0.0, 0.0], offset);      // RGB Array (0.0 to 1.0), optional array offset
ColorEye('#ff0000');                    // Hex String (also 3 digits: #f00)
ColorEye('rgb(255, 0, 0)');             // CSS Color String
ColorEye('darkred')                     // X11 Color Name
ColorEye(fromColorEye);                 // Copy from ColorEye Object
ColorEye(fromTHREEColor);               // Copy from THREE.Color Object
```

#### Color functions can be chained together

```javascript
let myColor = new ColorEye(0xff0000);

console.log(myColor.rybRotateHue(270).darken(0.5).hexString().toUpperCase());
```
* _output_

    > #2E007F

#### Example usage with [Three.js](https://threejs.org/)

```javascript
const eyeColor = new ColorEye('blue');
const threeColor = new THREE.Color(eyeColor.hex()).multiplyScalar(0.75);

eyeColor.set(threeColor).rybRotateHue(180).brighten(0.5);
threeColor.setHex(eyeColor.hex());
```

<br>

# Properties

### **.[r]()** : Integer
Red channel value between 0 and 255, default is 0.

### **.[g]()** : Integer
Green channel value between 0 and 255, default is 0.

### **.[b]()** : Integer
Blue channel value between 0 and 255, default is 0.

<br>

# Assignment

### **.[copy]()** ( colorObject : ColorEye or THREE.Color ) ( ) : this
Copies the r, g, b properties from 

### **.[set]()** ( r: Number or Object or String, g : Number, b : Number, type : String ) : this
All arguments are optional. Sets this color based on a wide range of possible inputs, works identically as the constructor.

### **.[setHex]()** ( hexColor : Integer ) : this
Sets this color based on a hexidecimal / decimal value (i.e. 0xff0000 or 16777215).

### **.[setHsl]()** ( h : Integer, s: Float, l: Float ) : this
Sets this color based on hue (0 to 360), saturation (0.0 to 1.0), and lightness (0.0 to 1.0) values.

### **.[setRandom]()** ( ) : this
Sets this color to a random color.

### **.[setRgb]()** ( r : Number, g: Number, b: Number, multiplier = 1.0 : Float ) : this
Sets this color based on a red, green, and blue values. Typically these values are integers in the range 0 to 255. Optionally, a multiplier can be included to align values to within this range. For example if using red, green, and blue values ranging from 0.0 to 1.0, pass in a multiplier of 255.

### **.[setRyb]()** ( r : Integer, g: Integer, b: : Integer ) : this
Sets this color based on a red, yellow, and blue values ranging from 0 to 255.

### **.[setStyle]()** ( style : String ) : this
Sets this color based on CSS ('rgb(255,0,0)' / 'hsl(360,50%,50%)'), Hex ('#FF0000'), or X11 ('darkred') strings.

<br>

# Comparison

### **.[equals]()** ( color : ColorEye ) : Boolean
Returns true if the RGB values of 'color' are the same as those of this object.