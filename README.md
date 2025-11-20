# AutoDecx - AI Vehicle Diagnosis Platform

An AI-powered vehicle diagnosis platform that analyzes vehicle sounds using advanced audio processing, spectrograms, and contextual data to provide probable diagnoses.

## 🎨 Phase 1: Home Screen UI (COMPLETED ✅)

The AutoDecx Home Screen UI has been successfully implemented in React/TypeScript with:
- ✅ Modern frosted glass design with Apple-style aesthetics
- ✅ Fixed transparent navigation bar with backdrop blur effects
- ✅ Floating bottom recording bar with gradient AI icon
- ✅ Smooth tap animations using Framer Motion
- ✅ Pixel-perfect translation from Flutter design specifications
- ✅ Comprehensive documentation and testing guides

### 📚 Documentation

- **[Implementation Guide](HOME_SCREEN_UI_IMPLEMENTATION.md)** - Detailed technical implementation
- **[Quick Start Guide](QUICK_START.md)** - Get started quickly with examples
- **[Design Comparison](DESIGN_COMPARISON.md)** - Flutter to React translation mapping
- **[Visual Testing Guide](VISUAL_TESTING_GUIDE.md)** - Quality assurance checklist
- **[Implementation Complete](IMPLEMENTATION_COMPLETE.md)** - Summary and next steps

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to view the application.

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
autodecx-test/
├── src/
│   ├── components/
│   │   ├── AutoDecxHomeScreen.tsx    ← Home Screen UI (NEW)
│   │   ├── ui/                        ← Shadcn UI components
│   │   └── ...
│   ├── App.tsx                        ← Main app component
│   ├── main.tsx                       ← Entry point
│   └── index.css                      ← Global styles
├── public/                            ← Static assets
├── HOME_SCREEN_UI_IMPLEMENTATION.md   ← Implementation guide
├── QUICK_START.md                     ← Quick reference
├── DESIGN_COMPARISON.md               ← Design translation
├── VISUAL_TESTING_GUIDE.md            ← Testing checklist
├── IMPLEMENTATION_COMPLETE.md         ← Summary
└── package.json
```

## 🎯 Features

### Implemented (Phase 1)
- ✅ Home Screen UI with frosted glass effects
- ✅ Top navigation bar (transparent with blur)
- ✅ AutoDecx branded button with icon
- ✅ User profile, notifications, and headphones icons
- ✅ Floating bottom recording bar
- ✅ AI avatar icon with gradient
- ✅ Smooth animations and interactions
- ✅ Responsive design (mobile-first)

### In Progress (Phase 2)
- 🔄 Recording functionality
- 🔄 Chat interface
- 🔄 Diagnosis display
- 🔄 Backend integration

## 🛠️ Tech Stack

- **React** 18.2.0 - UI library
- **TypeScript** 5.8.2 - Type safety
- **Vite** 6.2.3 - Build tool
- **Tailwind CSS** 3.4.1 - Styling
- **Framer Motion** 11.18.2 - Animations
- **Radix UI** - Component primitives

## 🎨 Design Philosophy

The UI follows Apple's design principles:
- **Frosted Glass Effects** - Backdrop blur with semi-transparent backgrounds
- **Soft Shadows** - Subtle depth without harsh contrasts
- **Rounded Corners** - Consistent border radius throughout
- **Pastel Colors** - Soft, clean color palette
- **Minimalist** - Clean, uncluttered interface

## 🔗 Component Usage

```tsx
import AutoDecxHomeScreen from './components/AutoDecxHomeScreen'

function App() {
  return <AutoDecxHomeScreen />
}
```

The component is currently standalone but can be enhanced with props for backend integration.

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari/iOS Safari (latest)
- ⚠️ Older browsers (fallback to non-blur styles)

## 🧪 Testing

Run the visual testing checklist from `VISUAL_TESTING_GUIDE.md` to ensure design fidelity.

## 📝 License

See LICENSE.txt for details.

## 🤝 Contributing

This is Phase 1 of the AutoDecx frontend. Future phases will add:
- Recording and audio analysis
- Chat interface with AI
- Diagnosis results display
- User profile management
- Settings and customization

---

**Built with React + TypeScript + Vite**

For technical details, see the comprehensive documentation files listed above.
