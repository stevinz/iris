# ColorEye
Small, fast, zero-dependency javascript color library with support for the RGB / RYB / HSL color models. Internal functions have no object creation for maximum performance. 

<br>

It also features hue shifting on the RYB spectrum creating more natural complementary colors, such as seen at [Paletton](https://paletton.com/).

<br><br>

# Usage

### Copy file 'coloreye.js' into project, import class into code

```javascript
import { Coloreye } from './coloreye.js';
```

<br>

### Create Coloreye object

```javascript
let myColor = new Coloreye();
```

<br>

### Coloreye can be initialized in the following ways

```javascript
Coloreye(hexColor);                     // Hexadecimal (0xffffff, i.e. 16777215)
Coloreye(r, g, b);                      // RGB Values (0 to 255)
Coloreye(r, g, b, 'rgb');               // RGB Values (0 to 255)
Coloreye(r, g, b, 'three');             // RGB Values (0.0 to 1.0)
Coloreye(r, g, b, 'gl');                // RGB Values (0.0 to 1.0)
Coloreye(h, s, l, 'hsl');               // HSL Values (H: 0 to 360, SL: 0.0 to 1.0)
Coloreye(r, y, b, 'ryb');               // RYB Values (0 to 255)
Coloreye({ r: 255, g: 0, b: 0 });       // Object with RGB Properties
Coloreye({ h: 360, s: 1.0, l: 0.5 });   // Object with HSL Properties
Coloreye({ r: 255, y: 0, b: 0 });       // Object with RYB Properties
Coloreye([1.0, 0.0, 0.0], offset);      // RGB Array (0.0 to 1.0), optional array offset
Coloreye('#ff0000');                    // Hex String (also 3 digits: #f00)
Coloreye('rgb(255, 0, 0)');             // CSS Color String
Coloreye('darkred')                     // X11 Color Name
Coloreye(fromColoreye);                 // Copy from Coloreye Object
Coloreye(fromTHREEColor);               // Copy from THREE.Color Object
```

<br>

### Color functions can be chained together
```javascript
let myColor = new Coloreye(0xff0000);

console.log(myColor.rybRotateHue(270).darken(0.5).hexString().toUpperCase());
```
* _output_

    > #2E007F

<br>

### Example usage with [Three.js](https://threejs.org/)

```javascript
const eyeColor = new Coloreye('blue');
const threeColor = new THREE.Color(eyeColor.hex()).multiplyScalar(0.75);

eyeColor.set(threeColor).rybRotateHue(180).brighten(0.5);
threeColor.setHex(eyeColor.hex());
```

<br><br>

# Properties

### **.[r]()** : Integer
Red channel value between 0 and 255, default is 0.

### **.[g]()** : Integer
Green channel value between 0 and 255, default is 0.

### **.[b]()** : Integer
Blue channel value between 0 and 255, default is 0.

<br><br>

# Assignment

### **.[copy]()** ( colorObject : Coloreye or THREE.Color ) ( ) : this
Copies the r, g, b properties from 

<br>

### **.[set]()** ( r: Number or Object or String, g : Number, b : Number, type : String ) : this
All arguments are optional. Sets this color based on a wide range of possible inputs, works identically as the constructor.

<br>

### **.[setHex]()** ( hexColor : Integer ) : this
Sets this color based on a hexidecimal / decimal value (i.e. 0xff0000 or 16777215).

<br>

### **.[setHsl]()** ( h : Integer, s: Float, l: Float ) : this
Sets this color based on hue (0 to 360), saturation (0.0 to 1.0), and lightness (0.0 to 1.0) values.

<br>

### **.[setRgb]()** ( r : Number, g: Number, b: Number, multiplier = 1.0 : Float ) : this
Sets this color based on a red, green, and blue values. Typically these values are integers in the range 0 to 255. Optionally, a multiplier can be included to align values to within this range. For example if using red, green, and blue values ranging from 0.0 to 1.0, pass in a multiplier of 255.

<br>

### **.[setRyb]()** ( r : Integer, g: Integer, b: : Integer ) : this
Sets this color based on a red, yellow, and blue values ranging from 0 to 255.

<br>

### **.[setStyle]()** ( style : String ) : this
Sets this color based on CSS ('rgb(255,0,0)' / 'hsl(360,50%,50%)'), Hex ('#FF0000'), or X11 ('darkred') strings.

<br>

### **.[setRandom]()** ( ) : this
Sets this color to a random color.

<br><br>

# Comparison

### **.[equals]()** ( color : Coloreye ) : Boolean
Returns true if the RGB values of 'color' are the same as those of this object.