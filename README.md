<div align="center">

# ✨ Animation Galaxy

### Ultimate CSS Animation Library

**🚀 120+ Stunning CSS Animations Ready to Copy & Paste**

[![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)](#)
[![GitHub stars](https://img.shields.io/github/stars/Inuel-id/animation-galaxy?style=for-the-badge)](https://github.com/Inuel-id/animation-galaxy)

</div>

---

## 🌟 Features

- **120+ Handcrafted Animations**: From basic fades to complex 3D transforms
- **🎨 Animation Playground**: Interactive tool to customize, test, and generate CSS for animations in real-time
- **🖌️ Design Systems**: Switch between Cosmic Glass, Neon Cyber, Soft Ethereal, and Retro Terminal themes
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile with a mobile-first sidebar
- **📂 12 Organized Categories**: Basic, 3D, Loaders, Physics, Creative, Text effects & more
- **⚡ Live Preview**: See animations in action before using
- **📋 One-Click Copy**: Instant clipboard copy with visual feedback
- **🔍 Smart Search**: Find animations by name or description
- **🌙 Dark Mode**: Futuristic UI with customizable accent colors
- **🚀 Lightweight**: Pure CSS, vanilla JavaScript, no external dependencies

---

## 🚀 Quick Start

### Option 1: Direct Download
1. Download `index.html` and the `assets` folder.
2. Open `index.html` in your browser.
3. Start exploring!

### Option 2: Clone Repository
```bash
git clone https://github.com/Inuel-id/animation-galaxy.git
cd animation-galaxy
# If you have Python installed, you can serve it locally:
python3 -m http.server
# Then open http://localhost:8000
```

### Option 3: Use in Your Project
Simply copy any animation's CSS code from the interface and paste it into your stylesheet.

---

## 📚 Categories

| Category | Count | Description |
|----------|-------|-------------|
| **Basic** | 12 | Core animations (bounce, rotate, pulse, etc.) |
| **Advanced** | 12 | Complex effects (glitch, neon, spiral, etc.) |
| **3D** | 10 | Three-dimensional transforms |
| **Loading** | 10 | Spinner and loader animations |
| **Creative** | 12 | Artistic effects (pixelate, liquid, cyberpunk) |
| **Physics** | 10 | Realistic motion (gravity, spring, pendulum) |
| **Text** | 5 | Typography effects (glitch, neon, typewriter) |
| **Button** | 5 | Interactive button animations |
| **Background** | 5 | Full-screen background effects |
| **Card** | 5 | UI card animations |
| **Transform** | 5 | Shape and skew effects |
| **Transition** | 5 | Page transition effects |
| **Effects** | 10+ | Special visual effects |

---

## 🛠️ Usage

### 1. Find Your Animation
Use the search bar or category filters (sidebar) to browse animations.

### 2. Preview & Customize
Watch the live preview in the card. Click the **Logo** to open the **Animation Playground** for advanced customization.

### 3. Copy Code
Click the "Copy Code" button. The CSS will be copied to your clipboard.

### 4. Implement
Paste the CSS into your project and apply the class to your element:

```html
<!-- Your HTML -->
<button class="button-press">Click Me</button>

<!-- Your CSS (pasted from Animation Galaxy) -->
<style>
@keyframes buttonPress {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(3px) scale(0.98); }
}
.button-press { 
    animation: buttonPress 0.6s ease-in-out infinite;
}
</style>
```

---

## 🎨 Customization

### Themes & Settings
Click the **Settings (⚙️)** button to:
- Toggle between **Light/Dark** mode.
- Choose a **Design System** (Material 3, Ant Design, Fluent, Retro).
- Pick a custom **Accent Color**.

### Global Variables
The library uses CSS custom properties for easy theming:

```css
:root {
    --primary: #00ffff;    /* Main Accent */
    --secondary: #ff00ff;  /* Secondary Accent */
    --bg: #0a0a0f;         /* Background */
    --text: #ffffff;       /* Text Color */
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/new-animation
   ```
3. Add your animation
   - Follow existing naming conventions
   - Include preview in the HTML
   - Add category tag
4. Submit a pull request

---

## ❤️ Support This Project

If you find this library useful, please consider:

-  Star this repository
-  Share on Twitter/X
-  Follow **@Inuel-id**

---