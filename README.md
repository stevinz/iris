# ColorEye
> DEVELOPER NOTE: These docs are still being actively prepared. Also working on an example page. Check back soon...

<br>

Small, fast, dependency free javascript color library with support for the RGB, RYB, and HSL color models and easy interaction with HTML, CSS, and third party frameworks. 

Internal calls create zero new Objects for maximum performance. Easy color conversion between color models. Additionally provides support for color mixing and color alteration with functions like mix, add, subtract, brighten, darken, grayscale, and much more.

Also features hue shifting around the more traditional artistic RYB (red, yellow, blue) color wheel. This creates much more natural complementary colors and intuitive palettes, similar to those seen at tools like [Paletton](https://paletton.com/).

ColorEye was designed to make it easy to work alongside other popular frameworks, such as [Three.js](https://threejs.org/). See [example](#Three-Example) below of converting back and forth between a ColorEye Object and a THREE.Color Object.

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
ColorEye();                             // Defaults to white, 0xffffff
ColorEye(0xff0000);                     // Hexadecimal (0xff0000, i.e. 16711680)

ColorEye(1.0, 0.0, 0.0);                // RGB Values (0.0 to 1.0)

ColorEye(255,   0,   0, 'rgb');         // RGB Values (0 to 255)
ColorEye(255,   0,   0, 'ryb');         // RYB Values (0 to 255)
ColorEye(360, 1.0, 0.5, 'hsl');         // HSL Values (H: 0 to 360, SL: 0.0 to 1.0)

ColorEye({ r: 1.0, g: 0.0, b: 0.0 });   // Object with RGB Properties (0.0 to 1.0)
ColorEye({ r: 1.0, y: 0.0, b: 0.0 });   // Object with RYB Properties (0.0 to 1.0)
ColorEye({ h: 1.0, s: 1.0, l: 0.5 });   // Object with HSL Properties (0.0 to 1.0)

ColorEye([ 1.0, 0.0, 0.0 ], offset);    // RGB Array (0.0 to 1.0), optional array offset

ColorEye('#ff0000');                    // Hex String (also 3 digits: #f00)
ColorEye('rgb(255, 0, 0)');             // CSS Color String
ColorEye('red');                        // X11 Color Name

ColorEye(fromColorEye);                 // Copy from ColorEye Object
ColorEye(fromThreeColor);               // Copy from Three.js Color Object
```

<br>

#### Color functions can be chained together

```javascript
let color = new ColorEye(0xff0000);

console.log(color.rybRotateHue(270).darken(0.5).hexString().toUpperCase());
```
* _output_

    > #2E007F

<br>

#### Hue Shifting
```javascript
let color = new ColorEye(0xff0000);

// To find the RYB color wheel complement (opposite) color
let complement = new ColorEye.set(color).rybComplementary();

// To adjust hue a specific number of degrees (0 to 360) around the RYB color wheel
let tetrad1 = new ColorEye.set(color).rybRotateHue(90);
let tetrad2 = new ColorEye.set(color).rybRotateHue(270);
```

<br>

#### Example usage with [Three.js](https://threejs.org/) <a name="Three-Example"></a>

```javascript
// Some possible ways to initialize ColorEye using THREE.Color, hex value, or array
const eyeColor = new ColorEye(threeColor);
const eyeColor = new ColorEye(threeColor.getHex());
const eyeColor = new ColorEye(threeColor.toArray());

// Some possible ways to initialize THREE.Color using ColorEye, hex value, or string
const threeColor = new THREE.Color(eyeColor);
const threeColor = new THREE.Color(eyeColor.hex());
const threeColor = new THREE.Color(eyeColor.hexString());

// Some possible ways to copy the values of the THREE.Color back to ColorEye
eyeColor.copy(threeColor);
eyeColor.set(threeColor.getHex());
eyeColor.setRGBF(threeColor.r, threeColor.g, threeColor.b);

// Some possible ways to copy the values of the ColorEye back to THREE.Color
threeColor.copy(eyeColor);
threeColor.setHex(eyeColor.hex());
threeColor.setRGB(eyeColor.r, eyeColor.g, eyeColor.b);
```

<br>

# Properties

### **.[r]()** : Float
Red channel value between 0.0 and 1.0, default is 1.

### **.[g]()** : Float
Green channel value between 0.0 and 1.0, default is 1.

### **.[b]()** : Float
Blue channel value between 0.0 and 1.0, default is 1.

<br>

# Assignment

### **.[copy]()** ( colorObject : ColorEye or THREE.Color ) ( ) : this
Copies the r, g, b properties from **colorObject**. This Object can be any type as long as it has r, g, b properties containing numeric values ranging from 0.0 to 1.0.

### **.[set]()** ( r: Number or Object or String, g : Number, b : Number, type : String ) : this
All arguments are optional. Sets this color based on a wide range of possible inputs, all options are the same as with the constructor.

### **.[setColorName]()** ( style : String ) : this
Sets this color based on a [X11](http://www.w3.org/TR/css3-color/#svg-color) color name.

### **.[setHex]()** ( hexColor : Integer ) : this
Sets this color based on a hexidecimal / decimal value (i.e. 0xff0000 or 16711680).

### **.[setHSL]()** ( h : Integer, s: Float, l: Float ) : this
Sets this color based on hue (0 to 360), saturation (0.0 to 1.0), and lightness (0.0 to 1.0) values.

### **.[setRandom]()** ( ) : this
Sets this color to a random color.

### **.[setRGB]()** ( r : Number, g: Number, b: Number ) : this
Sets this color based on a red, green, and blue values ranging from 0 to 255.

### **.[setRGBF]()** ( r : Float, g: Float, b: Float ) : this
Sets this color based on a red, green, and blue values ranging from 0.0 to 1.0.

### **.[setRYB]()** ( r : Integer, g: Integer, b: : Integer ) : this
Sets this color based on a red, yellow, and blue values ranging from 0 to 255.

### **.[setScalar]()** ( scalar: Integer ) : this
Sets this colors red, green, and blue values all equal to a singular value ranging from 0 to 255.

### **.[setScalarF]()** ( scalar : Float ) : this
Sets this colors red, green, and blue values all equal to a singular value ranging from 0.0 to 1.0.

### **.[setStyle]()** ( style : String ) : this
Sets this color based on CSS ('rgb(255,0,0)' / 'hsl(360,50%,50%)'), Hex ('#FF0000'), or [X11](http://www.w3.org/TR/css3-color/#svg-color) ('darkred') strings.

<br>

# Output

### **.[cssString]()** ( alpha : Integer ) : String
Returns string for use with CSS, for example "rgb(255, 0, 0)". Optionally include an **alpha** value from 0 to 255 to be included with the string, for example "rgba(255, 0, 0, 255)".

### **.[hex]()** ( ) : Integer
Returns value as hexidecimal.

### **.[hexString]()** ( hexColor : Integer ) : String
Returns value as hex string for use in CSS, HTML, etc. Example: "#ff0000". If optional **hexColor** is supplied, the returned string will be for the supplied color, not the underlying value of the current ColorEye Object.

### **.[rgbString]()** ( alpha : Integer ) : String
Returns value as inner section of cssString(). For example "255, 0, 0". This allows you to write to CSS variables for use with custom alpha channels in your CSS. Optional **alpha** value.

### **.[toJSON]()** ( ) : Integer
Returns value as hexidecimal, JSON friendly data.

<br>

# Retrieving Data

### **.[clone]()** ( ) : ColorEye
Returns a new ColorEye Object with the same color value as this ColorEye Object.

### **.[getHSL]()** ( target ) : Object
Provide an optional [target]() to copy hue, saturation, lightness values into, they will be in the range 0.0 to 1.0. If no target is provided a new Object with h, s, l properties is returned.

### **.[getRGB]()** ( target ) : Object
Provide an optional [target]()) to copy red, green, blue values into, they will be in the range 0.0 to 1.0. If no target is provided a new Object with r, g, b properties is returned.

### **.[getRYB]()** ( target ) : Object
Provide an optional [target]() to copy red, yellow, blue values into, they will be in the range 0.0 to 1.0. If no target is provided a new Object with r, y, b properties is returned.

### **.[toArray]()** ( array : Array, offset : Integer ) : Array
Provide an optional **array** to copy red, green, blue values into, they will be in the range 0.0 to 1.0. Optionally provide an offset to specify where in the **array** to write the data. If no array is provided a new Array will be returned.

<br>

# Spectrum Components

### **.[red]()** ( ) : Integer
Returns red value of current ColorEye object in range 0 to 255.

### **.[green]()** ( ) : Integer
Returns green value of current ColorEye object in range 0 to 255.

### **.[blue]()** ( ) : Integer
Returns blue value of current ColorEye object in range 0 to 255.

### **.[redF]()** ( ) : Float
Returns red value of current ColorEye object in range 0.0 to 1.0.

### **.[greenF]()** ( ) : Float
Returns green value of current ColorEye object in range 0.0 to 1.0.

### **.[blueF]()** ( ) : Float
Returns blue value of current ColorEye object in range 0.0 to 1.0.

### **.[hue]()** ( ) : Integer
Returns hue value of current ColorEye object in range 0 to 360.

### **.[saturation]()** ( ) : Float
Returns saturation value of current ColorEye object in range 0.0 to 1.0.

### **.[lightness]()** ( ) : Float
Returns lightness value of current ColorEye object in range 0.01 to 1.0.

### **.[hueF]()** ( ) : Float
Returns hue value of current ColorEye object in range 0.01 to 1.0.

<br>

# Color Functions

### **.[add]()** ( color : ColorEye ) : this
Adds the red, green, blue values from **color** to this ColorEye Object's values.

<br>

# Comparison

### **.[equals]()** ( color : ColorEye ) : Boolean
Returns true if the RGB values of **color** are the same as those of this Object.

<br>

# Contributing

<br>

# License
ColorEye is released under the terms of the MIT license, so it is free to use in your free or commercial projects.

Copyright (c) 2022 Stephens Nunnally and Scidian Software

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
