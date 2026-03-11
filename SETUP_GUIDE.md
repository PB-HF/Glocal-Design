# 🎬 Premium Scroll Animation Setup Guide

## ✅ What's Been Created

Your project now has:

1. **ScrollAnimationCanvas** - Canvas-based animation renderer
2. **Frame Preloader** - Efficient image loading system
3. **useScrollAnimation Hook** - Scroll sync with GSAP + ScrollTrigger
4. **HeroSection & SettleSection** - Beautiful Tailwind layout
5. **Home Page** - All components integrated

## 📁 Project Structure

```
src/
├── pages/
│   └── Home.jsx              # Main page
├── components/
│   ├── ScrollAnimationCanvas.jsx
│   ├── HeroSection.jsx
│   └── SettleSection.jsx
├── hooks/
│   └── useScrollAnimation.js # Scroll sync logic
├── utils/
│   ├── framePreloader.js     # Frame loading system
│   └── generateTestFrames.js # Test frame generator
└── App.jsx                   # Entry point (updated)

public/
└── frames/
    ├── frame_0001.png        # Add your frames here
    ├── frame_0002.png
    ├── frame_0003.png
    └── ...frame_0120.png
```

## 🚀 Getting Started (3 Steps)

### Step 1: Add Your Frame Images

Place your extracted video frames in `/public/frames/` with this naming pattern:
- `frame_0001.png`
- `frame_0002.png`
- `frame_0003.png`
- ... up to `frame_0120.png` (or whatever your total is)

**Naming is CRITICAL:** The frame preloader expects zero-padded numbers matching the total frame count.

### Step 2: Update Total Frame Count (If Needed)

If you don't have 120 frames, update this in `src/pages/Home.jsx`:

```jsx
<ScrollAnimationCanvas totalFrames={YOUR_FRAME_COUNT} />
```

### Step 3: Run Development Server

```bash
npm run dev
```

Your site will be available at `http://localhost:5173/`

## 🎨 Using Test Frames (For Development)

Don't have actual frames yet? Generate test frames:

### Option A: Browser Console
1. Run `npm run dev`
2. Open browser DevTools (F12)
3. Go to Console tab
4. Paste this:

```javascript
import { generateTestFrames } from './utils/generateTestFrames.js'
generateTestFrames(120)
```

This creates 120 colorful test frames with progress indicators.

### Option B: Manual Test Setup
Create 120 simple PNG files:
- Use any image editor
- Size: 1920x1080px
- Save as `frame_0001.png`, `frame_0002.png`, etc.
- Place in `/public/frames/`

## 🎯 How It Works

1. **Scroll Animation Canvas** is FIXED in background
2. **HeroSection** and **SettleSection** scroll ON TOP
3. As user scrolls:
   - GSAP ScrollTrigger tracks scroll position
   - Scroll progress (0-1) is calculated
   - Frame index is computed: `frameIndex = scrollProgress × totalFrames`
   - Canvas draws the corresponding frame
   - Updates via requestAnimationFrame for smoothness

## ⚙️ Configuration Options

### Canvas Component Props
In `src/pages/Home.jsx`:

```jsx
<ScrollAnimationCanvas 
  totalFrames={120}  // Total number of frames to render
/>
```

### Custom Scroll Trigger Settings
In `src/hooks/useScrollAnimation.js`, modify the ScrollTrigger config:

```javascript
scrollTrigger: {
  trigger: 'body',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,      // Set to false for snappy, true for smooth
  markers: false,   // Set to true for debugging timeline
}
```

## 🎨 Customization Tips

### Adjust Canvas Rendering
Edit `src/components/ScrollAnimationCanvas.jsx`:
- Change canvas background color: `backgroundColor: '#000000'`
- Adjust frame aspect ratio fitting logic in `drawFrame()`

### Modify Section Heights
Edit `src/components/HeroSection.jsx` and `src/components/SettleSection.jsx`:
- Change `h-screen` to `h-[120vh]` for more scroll time

### Disable Debug Info
In `ScrollAnimationCanvas`, remove or comment out the frame counter:
```jsx
{/* Frame Debug Info (optional - remove in production) */}
```

## 📊 Performance Optimization

Already optimized:
✅ Image preloading in background
✅ Canvas rendering with requestAnimationFrame
✅ GPU acceleration (CSS filters, transforms)
✅ Efficient memory management
✅ ScrollTrigger caching

## 🐛 Troubleshooting

### "Failed to load frame" error?
- Check frame file names (must be padded: `frame_0001.png`)
- Verify frames are in `/public/frames/`
- Ensure frame count matches `totalFrames` prop

### Animation is laggy?
- Reduce `totalFrames` if you have too many images
- Check frame file sizes (optimize images < 100KB each)
- Disable debug info in production

### Canvas is blank?
- Wait for loading overlay to complete
- Check browser console for errors
- Verify frames exist in `/public/frames/`

## 🚀 Building for Production

```bash
npm run build
```

This creates an optimized build in `/dist/`.

## 📦 Dependencies

- React 19.2.0
- Tailwind CSS 4.2.1
- GSAP 3.x (with ScrollTrigger plugin)
- Vite 7.3.1

All are already installed! Just run `npm install` if needed.

## 🎓 Next Steps

1. Add your actual frame images
2. Adjust `totalFrames` to match
3. Customize colors, text, and layout to match your brand
4. Test on different devices
5. Deploy with `npm run build`

---

**Built with ❤️ for premium web experiences**
