# QR Hub - QR Code Generator & Scanner

<div align="center">
  <img src="./assets/preview.webp" alt="QR Hub Preview" width="100%" max-width="800px" style="border-radius: 12px; margin-bottom: 20px;">
</div>

## Overview

**QR Hub** is a modern, feature-rich web application for generating and scanning QR codes with ease. Built with vanilla JavaScript and styled with Tailwind CSS, it provides an intuitive user interface with advanced customization options.

## ✨ Features

### Generate QR Codes
- 🎨 **Customizable Design**: Choose colors for dots and background
- 📐 **Adjustable Size**: Set custom width and height
- 🖼️ **Logo Support**: Add logos to your QR codes
- 🎭 **Multiple Styles**: Various dot styles (square, rounded, dots, classy, etc.)
- 📄 **Format Options**: Download as PNG, JPG, WEBP, or SVG
- 📊 **Error Correction**: Adjust error correction level
- ⚙️ **Advanced Options**: Margin, type number, and mode customization
- 💾 **Easy Download**: One-click download of generated QR codes

### Scan QR Codes
- 📱 **Camera Scanning**: Real-time QR code scanning using device camera
- 📸 **Image Upload**: Upload and scan QR codes from files
- 🎥 **Multi-Camera Support**: Switch between different cameras if available
- 📋 **Copy to Clipboard**: Quickly copy scanned text
- 💾 **Save Results**: Save scanned data
- 🔗 **Open Links**: Directly open scanned URLs
- ⏰ **Scan History**: View timestamp of scanned codes

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QR\ Generator\ and\ Scanner
```

2. Install dependencies:
```bash
npm install
```

3. Build styles with Tailwind CSS:
```bash
npm run build:css
```

4. Open `src/index.html` in your browser or serve it locally:
```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx http-server
```

### Prerequisites
- Modern web browser with camera access
- Node.js (for building CSS)

## 💻 Usage

### Generate QR Codes

1. Click the **"Generate"** tab
2. Enter the text or URL you want to encode
3. Customize your QR code:
   - Adjust dimensions
   - Change colors
   - Add a logo (optional)
   - Choose dot style and format
   - Set error correction level
4. Click **"Download"** to save your QR code

### Scan QR Codes

1. Click the **"Scan"** tab
2. Either:
   - **Camera**: Click "Start Camera" to use your device's camera
   - **File**: Click "Upload" to select a QR code image
3. Point your camera at a QR code or upload an image
4. Scanned result will appear instantly
5. Copy, save, or open the scanned link

## 🛠️ Technologies Used

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS v4.1.10
- **QR Code Generation**: QR Code Styling Library
- **QR Code Scanning**: HTML5 Camera API & Scanner Library
- **Build Tool**: Vite with Tailwind CSS plugin

## 📦 Dependencies

```json
{
  "@tailwindcss/cli": "^4.1.10",
  "@tailwindcss/vite": "^4.1.10",
  "tailwindcss": "^4.1.10"
}
```

## 🌐 Try It Online

Experience QR Hub in action:
- 🔗 **Live Demo**: [qr-hub-demo.vercel.app](https://qr-hub-demo.vercel.app) *(Update with your deployment URL)*

## 🎬 Screenshots

### Generate Tab
- Modern UI with gradient background
- Real-time preview of QR codes
- Intuitive control panels for customization
- Advanced options expandable menu

### Scan Tab
- Live camera feed with QR code detection
- Visual feedback when code is detected
- Quick action buttons for copy, save, and open
- File upload support

## 📝 Project Structure

```
QR Generator and Scanner/
├── src/
│   ├── index.html          # Main HTML file
│   ├── general.js          # General utilities
│   ├── generate.js         # QR generation logic
│   ├── scan.js             # QR scanning logic
│   ├── input.css           # CSS input file
│   ├── output.css          # Compiled CSS
│   └── Assets/
│       └── favicon.ico     # App favicon
├── assets/
│   └── preview.webp        # Preview image
├── package.json            # Project dependencies
└── README.md              # This file
```

## 🎨 UI Features

- 🌈 Beautiful gradient background
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- ♿ Accessible interface
- 🌙 Modern dark theme with glassmorphism effects

## 🔒 Privacy

All QR code generation and scanning is done locally in your browser. No data is sent to external servers.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- QR Code Styling Library for QR generation
- HTML5 QR Scanner for scanning functionality
- Tailwind CSS for beautiful styling
- All contributors and users

## 📧 Contact & Support

For questions, suggestions, or support:
- 🐙 **GitHub**: [@varoonk21](https://github.com/varoonk21)
- 📮 **Issues**: [Project Issues](https://github.com/varoonk21/QR-Generator-Scanner/issues)

---

<div align="center">
  <p>Made with ❤️ by Me</p>
  <p>Give a ⭐ if you find this project helpful!</p>
</div>
