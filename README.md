# ColorEye
Small, fast, zero-dependency javascript color library with support for the RGB / RYB/ HSL color models. Internal functions have no object creation for maximum performance. 

<br>

## Usage

Copy file 'coloreye.js' into project, import class into code

```javascript
import { Coloreye } from './coloreye.js';
```

Create Coloreye() object

```javascript
let clr = new Coloreye();
```

Coloreye can be initialized in the following ways:

```javascript
let clr = new Coloreye(hexColor);                 // Hexadecimal (0xffffff, i.e. 16777215)
let clr = new Coloreye(r, g, b);                  // RGB Values (0 to 255)
let clr = new Coloreye(r, g, b, 'rgb');           // RGB Values (0 to 255)
let clr = new Coloreye(r, g, b, 'three');         // RGB Values (0.0 to 1.0)
let clr = new Coloreye(r, g, b, 'gl');            // RGB Values (0.0 to 1.0)
let clr = new Coloreye(h, s, l, 'hsl');           // HSL Values (h: 0 to 360, s / l: 0.0 to 1.0)
let clr = new Coloreye(r, y, b, 'ryb');           // RYB Values (0 to 255)
let clr = new Coloreye([1.0, 0.0, 0.0], offset);  // RGB Array (0.0 to 1.0), Optional Array Offset
let clr = new Coloreye('#ff0000') or ('#ff0');    // Hex String (3 or 6 digits)
let clr = new Coloreye('red') or ('lightgray');   // X11 Color Name
let clr = new Coloreye('rgb(255, 0, 0)');         // CSS Color String
let clr = new Coloreye(fromColoreye);             // Copy from Coloreye() Object
```
