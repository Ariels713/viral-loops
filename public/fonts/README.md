# Fonts Directory - Degular Display

This directory contains the **Degular Display** font family files and configuration for the project.

## ✅ Current Setup

The **Degular Display** font family is now fully configured with all weights and styles:

### Available Font Weights & Styles

| Weight | Normal | Italic |
|--------|--------|--------|
| **Thin** (100) | ✅ | ✅ |
| **Light** (300) | ✅ | ✅ |
| **Regular** (400) | ✅ | ✅ |
| **Medium** (500) | ✅ | ✅ |
| **Semibold** (600) | ✅ | ✅ |
| **Bold** (700) | ✅ | ✅ |
| **Black** (900) | ✅ | ✅ |

## Usage Examples

### Using CSS Variables (Recommended)

The primary font is available through CSS variables:

```css
.component {
  font-family: var(--font-primary); /* Uses Degular Display with fallbacks */
}
```

### Using Specific Weights

```css
/* Thin */
.thin-text {
  font-family: var(--font-primary);
  font-weight: 100;
}

/* Light */
.light-text {
  font-family: var(--font-primary);
  font-weight: 300;
}

/* Regular */
.regular-text {
  font-family: var(--font-primary);
  font-weight: 400;
}

/* Medium */
.medium-text {
  font-family: var(--font-primary);
  font-weight: 500;
}

/* Semibold */
.semibold-text {
  font-family: var(--font-primary);
  font-weight: 600;
}

/* Bold */
.bold-text {
  font-family: var(--font-primary);
  font-weight: 700;
}

/* Black */
.black-text {
  font-family: var(--font-primary);
  font-weight: 900;
}
```

### Using Italic Styles

```css
.italic-text {
  font-family: var(--font-primary);
  font-style: italic;
}

/* Combine with any weight */
.bold-italic {
  font-family: var(--font-primary);
  font-weight: 700;
  font-style: italic;
}
```

### Direct Font Family Usage

```css
.component {
  font-family: 'Degular Display', Arial, Helvetica, sans-serif;
}
```

## React/Next.js Component Examples

### Inline Styles

```jsx
<h1 style={{ fontFamily: 'var(--font-primary)', fontWeight: 700 }}>
  Bold Heading
</h1>

<p style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontStyle: 'italic' }}>
  Light italic text
</p>
```

### CSS Modules

```css
/* styles/Component.module.css */
.title {
  font-family: var(--font-primary);
  font-weight: 600;
}

.subtitle {
  font-family: var(--font-primary);
  font-weight: 400;
  font-style: italic;
}
```

### Tailwind CSS (if using)

You can extend Tailwind config to use Degular Display:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'degular': ['Degular Display', 'Arial', 'Helvetica', 'sans-serif'],
      }
    }
  }
}
```

## Performance Features

- **WOFF2 format** prioritized for modern browsers (smaller file sizes)
- **WOFF fallback** for older browser support
- **font-display: swap** ensures text remains visible during font load
- All weights and styles properly declared for optimal loading

## File Structure

```
public/fonts/
├── README.md (this file)
├── License for Web, 500k monthly page views.pdf
├── DegularDisplay-Thin.woff2 / .woff
├── DegularDisplay-ThinItalic.woff2 / .woff
├── DegularDisplay-Light.woff2 / .woff
├── DegularDisplay-LightItalic.woff2 / .woff
├── DegularDisplay-Regular.woff2 / .woff
├── DegularDisplay-Italic.woff2 / .woff
├── DegularDisplay-Medium.woff2 / .woff
├── DegularDisplay-MediumItalic.woff2 / .woff
├── DegularDisplay-Semibold.woff2 / .woff
├── DegularDisplay-SemiboldItalic.woff2 / .woff
├── DegularDisplay-Bold.woff2 / .woff
├── DegularDisplay-BoldItalic.woff2 / .woff
├── DegularDisplay-Black.woff2 / .woff
└── DegularDisplay-BlackItalic.woff2 / .woff
```

## License

Please refer to `License for Web, 500k monthly page views.pdf` for usage terms and conditions. 