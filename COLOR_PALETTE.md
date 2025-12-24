# Website Color Palette

## Primary Colors (CSS Variables)

### Main Theme Colors
- **Primary Color**: `#00ff97` (Bright Green/Mint)
  - Used for: Buttons, links, highlights, accents
  - RGB: `rgb(0, 255, 151)`
  
- **Secondary Color**: `#00020f` (Very Dark Blue/Black)
  - Used for: Background, text, dark elements
  - RGB: `rgb(0, 2, 15)`

- **Heading Color**: `#ffffff` (White)
  - Used for: Headings, titles
  - RGB: `rgb(255, 255, 255)`

### Additional Colors
- **White**: `#ffffff` / `#fff`
  - Used for: Text, backgrounds, borders
  
- **Black**: `#000000` / `#000`
  - Used for: Text, dark elements

- **Body Background**: `#00020f` (Same as secondary)
  - Used for: Main page background

- **Default Text**: `#414047` (Dark Gray)
  - Used for: Body text, secondary text

- **Border Color**: `#cbcad3` (Light Gray)
  - Used for: Borders, dividers

- **Gray**: `#b2b3b7` (Medium Gray)
  - Used for: Secondary text, muted elements

---

## Gradient Colors

### Primary Gradient (Used in buttons, CTAs, highlights)
```
linear-gradient(52deg, #2c32fe 0%, #00a4af 49%, #00ff97 100%)
```
- **Start**: `#2c32fe` (Bright Blue)
- **Middle**: `#00a4af` (Cyan/Teal)
- **End**: `#00ff97` (Bright Green)

### Primary Gradient (Semi-transparent)
```
linear-gradient(52deg, rgba(44, 50, 254, 0.5) 0%, rgba(0, 164, 175, 0.5) 49%, rgba(0, 255, 151, 0.5) 100%)
```
- Same colors as above with 50% opacity

### Glass Effect Gradient (Used in cards, modals)
```
linear-gradient(209deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)
```
- White with 5% opacity for glassmorphism effect

---

## Additional Color Codes Found in Components

### Background Colors
- **Dark Background**: `#00020f` / `#00020F`
- **Card Background**: `#11121d` / `#11121D`
- **Input Background**: `#2b3d66` (Dark Blue-Gray)
- **Footer Background**: `#121521` (Dark Blue)

### Border Colors
- **Border**: `#3b4d77` (Medium Blue-Gray)
- **Border**: `#4c4e57` (Gray-Blue)
- **Border**: `#45454f` (Dark Gray)
- **Border**: `#262833` (Very Dark Gray)

### Text Colors
- **Yellow Accent**: `#d9ff43` (Lime Yellow)
- **Dark Blue Text**: `#131053` (Deep Blue)
- **Light Gray Text**: `rgba(255, 255, 255, 0.5)` (50% white)
- **Muted Text**: `rgba(255, 255, 255, 0.7)` (70% white)

### Special Colors
- **Chatbot Button**: `#060E50` (Very Dark Blue)
- **Input Placeholder**: `#888686` (Medium Gray)

---

## Color Usage Summary

### Primary Brand Colors
1. **Bright Green** (`#00ff97`) - Primary accent, CTAs, buttons
2. **Dark Blue** (`#00020f`) - Background, main text color
3. **White** (`#ffffff`) - Headings, light text

### Gradient Palette
- **Blue** (`#2c32fe`) → **Cyan** (`#00a4af`) → **Green** (`#00ff97`)

### Neutral Colors
- **Dark Grays**: `#11121d`, `#121521`, `#131053`
- **Medium Grays**: `#414047`, `#b2b3b7`, `#cbcad3`
- **Light Grays**: `#888686`, `#45454f`

---

## Quick Reference

```css
/* Main Colors */
--color-primary: #00ff97;      /* Bright Green */
--color-secondary: #00020f;     /* Dark Blue */
--color-white: #fff;            /* White */
--color-black: #000;            /* Black */
--color-body: #00020f;          /* Background */

/* Gradients */
Primary Gradient: linear-gradient(52deg, #2c32fe 0%, #00a4af 49%, #00ff97 100%);
Glass Effect: linear-gradient(209deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%);
```

---

## Color Harmony

The website uses a **dark theme** with:
- **Dark backgrounds** (`#00020f`, `#11121d`)
- **Bright accent** (`#00ff97` green)
- **Gradient accents** (Blue → Cyan → Green)
- **White text** for contrast
- **Glassmorphism effects** (semi-transparent white overlays)

This creates a modern, tech-focused aesthetic perfect for an AI/technology agency website.

