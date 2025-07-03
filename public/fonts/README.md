# Fonts Directory - Three-Font Typography System

This directory contains the font files and configuration for the project's comprehensive typography system.

## ✅ Current Font Setup

### **Primary: Degular Display** (Headers & Sub-Headers)
The main display font for headlines and titles with multiple weights and styles.

### **Secondary: Basier Circle** (Body Text & CTAs)  
The body text and call-to-action font for readability and engagement.

### **Fallback: System Fonts**
Arial, Helvetica, sans-serif as fallbacks for reliability.

## 🎨 Typography Hierarchy

### **Headers (Degular Display)**
```css
font-family: "Degular Display";
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 95%;
letter-spacing: 1.28px;
```
**Used for:** Main headlines, section titles, major headings

### **Sub-Headers (Degular Display)**
```css
font-family: "Degular Display";
font-size: 32px;
font-style: normal;
font-weight: 400;
line-height: 110%;
```
**Used for:** Step titles, form titles, component headers, FAQ questions

### **Body Text & CTAs (Basier Circle)**
```css
font-family: "Basier Circle";
font-size: 21px;
font-style: normal;
font-weight: 400;
line-height: 110%;
letter-spacing: -0.42px;
```
**Used for:** Descriptions, disclaimers, button text, body copy

## 📁 Available Font Files

### Degular Display (14 variants)
- **Weights**: Thin (100), Light (300), Regular (400), Medium (500), Semibold (600), Bold (700), Black (900)
- **Styles**: Normal and Italic for each weight
- **Formats**: WOFF2 (primary), WOFF (fallback)

### Basier Circle
- **Weight**: Regular (400)
- **Format**: OTF

## 🚀 Usage Examples

### React/Next.js Components

**Headers:**
```jsx
<h1 style={{ 
  fontFamily: '"Degular Display"',
  fontSize: 'clamp(32px, 6vw, 64px)',
  fontWeight: 500,
  lineHeight: '95%',
  letterSpacing: '1.28px'
}}>
  Main Headline
</h1>
```

**Sub-Headers:**
```jsx
<h2 style={{ 
  fontFamily: '"Degular Display"',
  fontSize: 'clamp(16px, 3vw, 32px)',
  fontWeight: 400,
  lineHeight: '110%'
}}>
  Section Title
</h2>
```

**Body Text & CTAs:**
```jsx
<p style={{ 
  fontFamily: '"Basier Circle"',
  fontSize: 'clamp(16px, 3vw, 21px)',
  fontWeight: 400,
  lineHeight: '110%',
  letterSpacing: '-0.42px'
}}>
  Description text
</p>

<button style={{ 
  fontFamily: '"Basier Circle"',
  fontSize: '21px',
  fontWeight: 400,
  lineHeight: '110%',
  letterSpacing: '-0.42px'
}}>
  Call to Action
</button>
```

### CSS Classes

**Using CSS Variables:**
```css
.header {
  font-family: var(--font-primary); /* Degular Display */
}

.body-text {
  font-family: var(--font-tertiary); /* Basier Circle */
}
```

**Direct Font Usage:**
```css
.main-headline {
  font-family: "Degular Display";
  font-size: clamp(32px, 6vw, 64px);
  font-weight: 500;
  line-height: 95%;
  letter-spacing: 1.28px;
}

.step-description {
  font-family: "Basier Circle";
  font-size: clamp(16px, 3vw, 21px);
  font-weight: 400;
  line-height: 110%;
  letter-spacing: -0.42px;
}
```

## 📱 Responsive Design

All typography uses `clamp()` functions for optimal scaling:
- **Desktop**: Full specified sizes
- **Tablet**: Proportional scaling with viewport width
- **Mobile**: Minimum readable sizes maintained

## ⚡ Performance Features

- **WOFF2 format** prioritized for modern browsers
- **WOFF/OTF fallbacks** for broader compatibility  
- **font-display: swap** ensures text visibility during font load
- **Efficient loading** with proper fallback chains

## 📋 Current Implementation

### Elements Using Degular Display:
- Hero headlines
- Section titles  
- Step titles
- FAQ titles
- Form titles
- Leaderboard titles
- Component headers
- FAQ questions
- Step numbers

### Elements Using Basier Circle:
- Step descriptions
- Disclaimer text
- Call-to-action buttons
- Copy buttons
- Form submit buttons
- Reset buttons
- Contact buttons

## 📄 License

Please refer to `License for Web, 500k monthly page views.pdf` for Degular Display usage terms and conditions. 