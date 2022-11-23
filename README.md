# Iris
Small, fast, dependency free JavaScript color library with support for the RGB, RYB, and HSL color models and easy interaction with HTML, CSS, and third party frameworks.

Internal calls create zero new Objects for maximum performance. Easy color conversion between color models. Additionally provides support for color mixing and color alteration with functions like mix, add, subtract, brighten, darken, grayscale, and more.

Also features hue shifting around the more traditional artistic RYB (red, yellow, blue) color wheel. This creates much more natural complementary colors and intuitive palettes, see [online example](https://stevinz.github.io/iris/).

Iris was designed to make it easy to work alongside other popular frameworks, such as [Three.js](https://threejs.org/). See [example](#Three-Example) below of converting back and forth between a Iris Object and a THREE.Color Object.

<br>

## Install

- Option 1: Copy file `Iris.js`, import from file...

```javascript
import { Iris } from 'Iris.js';
```

- Option 2: Install from [npm](https://www.npmjs.com/package/@scidian/iris), import from '@scidian/iris'...
```
npm install @scidian/iris
```
```javascript
import { Iris } from '@scidian/iris';
```

- Option 3: Import directly from CDN...
```javascript
import { Iris } from 'https://unpkg.com/@scidian/iris/build/iris.module.js';
```

<br>

#### Iris can be initialized in the following ways

```javascript

const myColor = new Iris();

/* Initialization Methods */

Iris();                             // Defaults to white, 0xffffff
Iris(0xff0000);                     // Hexadecimal (0xff0000, i.e. 16711680)

Iris(1.0, 0.0, 0.0);                // RGB Values (0.0 to 1.0)

Iris(255,   0,   0, 'rgb');         // RGB Values (0 to 255)
Iris(255,   0,   0, 'ryb');         // RYB Values (0 to 255)
Iris(360, 1.0, 0.5, 'hsl');         // HSL Values (H: 0 to 360, SL: 0.0 to 1.0)

Iris({ r: 1.0, g: 0.0, b: 0.0 });   // Object with RGB Properties (0.0 to 1.0)
Iris({ r: 1.0, y: 0.0, b: 0.0 });   // Object with RYB Properties (0.0 to 1.0)
Iris({ h: 1.0, s: 1.0, l: 0.5 });   // Object with HSL Properties (0.0 to 1.0)

Iris([ 1.0, 0.0, 0.0 ], offset);    // RGB Array (0.0 to 1.0), optional array offset

Iris('#ff0000');                    // Hex String (also 3 digits: #f00)
Iris('rgb(255, 0, 0)');             // CSS Color String
Iris('red');                        // X11 Color Name

Iris(fromIris);                     // Copy from Iris Object
Iris(fromThreeColor);               // Copy from Three.js Color Object
```

<br>

#### Color functions can be chained together

```javascript
const color = new Iris(0xff0000);

console.log(color.rybRotateHue(270).darken(0.5).hexString().toUpperCase());
```
* _output_

    > #2E007F

<br>

#### Hue Shifting
```javascript
const color = new Iris(0xff0000);

// To find the RYB color wheel complement (opposite) color
const complement = new Iris.set(color).rybComplementary();

// To adjust hue a specific number of degrees (0 to 360) around the RYB color wheel
const tetrad1 = new Iris.set(color).rybRotateHue(90);
const tetrad2 = new Iris.set(color).rybRotateHue(270);
```

<br>

#### Example usage with [Three.js](https://threejs.org/) <a name="Three-Example"></a>

```javascript
// Some possible ways to initialize Iris using THREE.Color, hex value, or array
const eyeColor = new Iris(threeColor);
const eyeColor = new Iris(threeColor.getHex());
const eyeColor = new Iris(threeColor.toArray());

// Some possible ways to initialize THREE.Color using Iris, hex value, or string
const threeColor = new THREE.Color(eyeColor);
const threeColor = new THREE.Color(eyeColor.hex());
const threeColor = new THREE.Color(eyeColor.hexString());

// Some possible ways to copy the values of the THREE.Color back to Iris
eyeColor.copy(threeColor);
eyeColor.set(threeColor.getHex());
eyeColor.setRGBF(threeColor.r, threeColor.g, threeColor.b);

// Some possible ways to copy the values of the Iris back to THREE.Color
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

### **.[copy]()** ( colorObject : Iris or THREE.Color ) ( ) : this
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
Returns value as hex string for use in CSS, HTML, etc. Example: "#ff0000". If optional **hexColor** is supplied, the returned string will be for the supplied color, not the underlying value of the current Iris Object.

### **.[rgbString]()** ( alpha : Integer ) : String
Returns value as inner section of cssString(). For example "255, 0, 0". This allows you to write to CSS variables for use with custom alpha channels in your CSS. Optional **alpha** value.

### **.[toJSON]()** ( ) : Integer
Returns value as hexidecimal, JSON friendly data.

<br>

# Retrieving Data

### **.[clone]()** ( ) : Iris
Returns a new Iris Object with the same color value as this Iris Object.

### **.[getHSL]()** ( target ) : Object
Provide an optional **target** to copy hue, saturation, lightness values into, they will be in the range 0.0 to 1.0. If no target is provided a new Object with h, s, l properties is returned.

### **.[getRGB]()** ( target ) : Object
Provide an optional **target** to copy red, green, blue values into, they will be in the range 0.0 to 1.0. If no target is provided a new Object with r, g, b properties is returned.

### **.[getRYB]()** ( target ) : Object
Provide an optional **target** to copy red, yellow, blue values into, they will be in the range 0.0 to 1.0. If no target is provided a new Object with r, y, b properties is returned.

### **.[toArray]()** ( array : Array, offset : Integer ) : Array
Provide an optional **array** to copy red, green, blue values into, they will be in the range 0.0 to 1.0. Optionally provide an offset to specify where in the **array** to write the data. If no array is provided a new Array will be returned.

<br>

# Spectrum Components

### **.[red]()** ( ) : Integer
Returns red value of current Iris object in range 0 to 255.

### **.[green]()** ( ) : Integer
Returns green value of current Iris object in range 0 to 255.

### **.[blue]()** ( ) : Integer
Returns blue value of current Iris object in range 0 to 255.

### **.[redF]()** ( ) : Float
Returns red value of current Iris object in range 0.0 to 1.0.

### **.[greenF]()** ( ) : Float
Returns green value of current Iris object in range 0.0 to 1.0.

### **.[blueF]()** ( ) : Float
Returns blue value of current Iris object in range 0.0 to 1.0.

### **.[hue]()** ( ) : Integer
Returns hue value of current Iris object in range 0 to 360.

### **.[saturation]()** ( ) : Float
Returns saturation value of current Iris object in range 0.0 to 1.0.

### **.[lightness]()** ( ) : Float
Returns lightness value of current Iris object in range 0.0 to 1.0.

### **.[hueF]()** ( ) : Float
Returns hue value of current Iris object in range 0.0 to 1.0.

### **.[hueRYB]()** ( ) : Integer
Returns the RYB adjusted hue value of current Iris object in range 0 to 360.

<br>

# Color Functions

### **.[add]()** ( color : Iris ) : this
Adds the red, green, blue values from **color** to this Iris Object's values.

### **.[addScalar]()** ( scalar : Integer ) : this
Adds the value **scalar** to the red, green, blue of this Iris Object, scalar should be in range -255 to 255.

### **.[addScalarF]()** ( scalar : Float ) : this
Adds the value **scalar** to the red, green, blue of this Iris Object, scalar should be in range -1.0 to 1.0.

### **.[brighten]()** ( amount : Float ) : this
Increases the lightness of this Iris Object by **amount** as a percentage of the remainder of 100% lightness less the current lightness. For example, if the current hsl lightness value is 0.6 (between 0.0 and 1.0), an **amount** of 0.5 will increase the lightness value to 0.6 + ((1.0 - 0.6) * 0.5) = 0.8, an **amount** value of 1.0 will always bring lightness value up to 1.0 (100%).

### **.[darken]()** ( amount : Float ) : this
Decreases the lightness of this Iris Object by **amount**. A value of 0.5 (default) will decrease lightness by 50%, a value of 2.0 will double lightness.

### **.[grayscale]()** ( percent : Float, type : String ) : this
Changes color into grayscale by **percent** ranging from 0.0 to 1.0. This can be done by type 'average' which takes an average of the red, green, blue values. Or by default type of 'luminosity' which scales red, green, blue values according to how human eyes see color (see [details at GIMP](https://docs.gimp.org/2.6/en/gimp-tool-desaturate.html)).

### **.[hslOffset]()** ( h : Integer, s : Float, l : Float ) : this
Change the HSL values of this Iris object by **h** (-360 to 360), **s** (-1.0 to 1.0), and **l** (-1.0 to 1.0).

### **.[mix]()** ( mixColor : Iris, percent : Float ) : this
Mixes in another Iris Object's color value to this Iris Object by **percent** (default of 0.5, i.e. 50%).

### **.[multiply]()** ( color : Iris ) : this
Multiplies another Iris Object's RGB values to this Iris Object's RGB values.

### **.[multiplyScalar]()** ( scalar : Float ) : this
Multiplies this Iris Object's RGB values by **scalar**. There is no range for **scalar**, however, color values will be clamped between 0.0 and 1.0 after multiplication.

### **.[rgbComplementary]()** ( ) : this
Adjusts this color to be 180 degress (opposite) of the current color on the RGB color wheel.

### **.[rgbRotateHue]()** ( degrees : Integer ) : this
Adjusts this color to be **degress** of the current color on the RGB color wheel, range from -360 to 360.

### **.[rybAdjust]()** ( ) : this
Adjusts the RGB values to fit in the RYB spectrum as best as possible.

### **.[rybComplementary]()** ( ) : this
Adjusts this color to be 180 degress (opposite) of the current color on the RYB color wheel.

### **.[rybRotateHue]()** ( degrees : Integer ) : this
Adjusts this color to be **degress** of the current color on the RYB color wheel, range from -360 to 360.

### **.[subtract]()** ( color : Iris ) : this
Subtracts the red, green, blue values from **color** to this Iris Object's values.

<br>

# Comparison

### **.[equals]()** ( color : Iris ) : Boolean
Returns true if the RGB values of **color** are the same as those of this Object.

### **.[isDark]()** ( color : Iris ) : Boolean
Returns true if this Iris Object's color value would be considered "dark", helpful for determining whether of not to use black or white text with this color as a background.

### **.[isLight]()** ( color : Iris ) : Boolean
Returns true if this Iris Object's color value would be considered "light", helpful for determining whether of not to use black or white text with this color as a background.

<br>

# License
Iris is released under the terms of the MIT license, so it is free to use in your free or commercial projects.

Copyright (c) 2022 Stephens Nunnally and Scidian Software

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
