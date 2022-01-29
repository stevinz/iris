# ColorEye
> DEVELOPER NOTE: These docs are still being actively prepared. Also working on an example page. Check back soon...

<br>

Small, fast, zero-dependency javascript color library with support for RGB, RYB, and HSL color models. Internal functions create no new Objects for maximum performance. 

Also features hue shifting around the RYB color wheel. This creates much more natural complementary colors and palettes, similar to those seen at tools like [Paletton](https://paletton.com/).

The internal implementation of color libraries very. ColorEye was designed with functionality to make it easy to work alongside other popular frameworks such as [Three.js](https://threejs.org/). See [example](#Three-Example) below of converting back and forth between a ColorEye Object and a THREE.Color Object.

<br>

## Usage

#### Copy file 'coloreye.js' into project, import class

```javascript
import { ColorEye } from './coloreye.js';
```

#### Create new ColorEye Object

```javascript
let color = new ColorEye();
```

#### ColorEye can be initialized in the following ways

```javascript
ColorEye()                              // Defaults to white, 0xffffff
ColorEye(hexColor)                      // Hexadecimal (0xff0000, i.e. 16711680)

ColorEye(1.0, 0.0, 0.0)                 // RGB Values (0.0 to 1.0)

ColorEye(255,   0,   0, 'rgb')          // RGB Values (0 to 255)
ColorEye(255,   0,   0, 'ryb')          // RYB Values (0 to 255)
ColorEye(360, 1.0, 0.5, 'hsl')          // HSL Values (H: 0 to 360, SL: 0.0 to 1.0)

ColorEye({ r: 1.0, g: 0.0, b: 0.0 })    // Object with RGB Properties (0.0 to 1.0)
ColorEye({ r: 1.0, y: 0.0, b: 0.0 })    // Object with RYB Properties (0.0 to 1.0)
ColorEye({ h: 1.0, s: 1.0, l: 0.5 })    // Object with HSL Properties (0.0 to 1.0)

ColorEye([ 1.0, 0.0, 0.0 ], offset)     // RGB Array (0.0 to 1.0), optional array offset

ColorEye('#ff0000')                     // Hex String (also 3 digits: #f00)
ColorEye('rgb(255, 0, 0)')              // CSS Color String
ColorEye('red')                         // X11 Color Name

ColorEye(fromColorEye)                  // Copy from ColorEye Object
ColorEye(fromThreeColor)                // Copy from Three.js Color Object
```

#### Color functions can be chained together

```javascript
let color = new ColorEye(0xff0000);

console.log(color.rybRotateHue(270).darken(0.5).hexString().toUpperCase());
```
* _output_

    > #2E007F

#### Hue Shifting
```javascript
let color = new ColorEye(0xff0000);

// To find the RYB color wheel complement (opposite) color
let compliment = new ColorEye.set(color).rybComplementary();

// To adjust hue a specific number of degrees (0 to 360) around the RYB color wheel
let tetrad1 = new ColorEye.set(color).rybRotateHue(90);
let tetrad2 = new ColorEye.set(color).rybRotateHue(270);
```

#### Example usage with [Three.js](https://threejs.org/) <a name="Three-Example"></a>

```javascript
// Create new ColorEye color
const eyeColor = new ColorEye('blue');

// Initialize THREE.Color using ColorEye hex value
const threeColor = new THREE.Color(eyeColor.hex());

// Copy THREE.Color back to ColorEye and use ColorEye to perform some alterations
eyeColor.copy(threeColor).rybRotateHue(180).brighten(0.5);

// Set THREE.Color value from new ColorEye value
threeColor.setHex(eyeColor.hex());
```

<br>

# Properties

### **.[r]()** : Integer
Red channel value between 0.0 and 1.0, default is 1.

### **.[g]()** : Integer
Green channel value between 0.0 and 1.0, default is 1.

### **.[b]()** : Integer
Blue channel value between 0.0 and 1.0, default is 1.

<br>

# Assignment

### **.[copy]()** ( colorObject : ColorEye or THREE.Color ) ( ) : this
Copies the r, g, b properties from colorObject. Object should have RGB values ranging from 0.0 to 1.0.

### **.[set]()** ( r: Number or Object or String, g : Number, b : Number, type : String ) : this
All arguments are optional. Sets this color based on a wide range of possible inputs, all options are the same as with the constructor.

### **.[setColorName]()** ( style : String ) : this
Sets this color based on a [X11](http://www.w3.org/TR/css3-color/#svg-color) color name.

### **.[setHex]()** ( hexColor : Integer ) : this
Sets this color based on a hexidecimal / decimal value (i.e. 0xff0000 or 16711680).

### **.[setHsl]()** ( h : Integer, s: Float, l: Float ) : this
Sets this color based on hue (0 to 360), saturation (0.0 to 1.0), and lightness (0.0 to 1.0) values.

### **.[setRandom]()** ( ) : this
Sets this color to a random color.

### **.[setRgb]()** ( r : Number, g: Number, b: Number ) : this
Sets this color based on a red, green, and blue values ranging from 0 to 255.

### **.[setRgbF]()** ( r : Float, g: Float, b: Float ) : this
Sets this color based on a red, green, and blue values ranging from 0.0 to 1.0.

### **.[setRyb]()** ( r : Integer, g: Integer, b: : Integer ) : this
Sets this color based on a red, yellow, and blue values ranging from 0 to 255.

### **.[setScalar]()** ( scalar: Integer ) : this
Sets this colors red, green, and blue values all equal to a singular value ranging from 0 to 255.

### **.[setScalarF]()** ( scalar : Float ) : this
Sets this colors red, green, and blue values all equal to a singular value ranging from 0.0 to 1.0.

### **.[setStyle]()** ( style : String ) : this
Sets this color based on CSS ('rgb(255,0,0)' / 'hsl(360,50%,50%)'), Hex ('#FF0000'), or [X11](http://www.w3.org/TR/css3-color/#svg-color) ('darkred') strings.

<br>

# Output

<br>

# Retrieving Data

<br>

# Spectrum Components

<br>

# Comparison

### **.[equals]()** ( color : ColorEye ) : Boolean
Returns true if the RGB values of 'color' are the same as those of this Object.

<br>

# Contributing

<br>

# License
ColorEye is released under the terms of the MIT license, so it is free to use in your free or commercial projects.

Copyright (c) 2022 Stephens Nunnally and Scidian Software

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
