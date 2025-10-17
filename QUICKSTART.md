# Quick Start Guide - gEtgOOd

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## First Time Setup

When you first launch the app, you'll go through a 6-step setup process:

### Step 1: Before Photo 📸
- Take or upload a photo of yourself as you are now
- This will be your "before" photo for comparison

### Step 2: Monthly Target 🎯
- Enter your fitness goal for the month
- Examples: "Lose 5 pounds", "Build muscle", "Get stronger"

### Step 3: Weekly Exercises 💪
- Add the exercises you want to track
- For each exercise, specify:
  - Exercise name (e.g., "Push-ups", "Sit-ups")
  - Target reps per session
- Add as many exercises as you want

### Step 4: Motivational Phrase 💬
- Choose a phrase that will motivate you
- Click the speaker icon to hear it spoken
- This will play during your workouts

### Step 5: Workout Song 🎵
- Select your pump-up song
- This will be your workout anthem

### Step 6: Voice Preference 🗣️
- Choose male or female voice for motivation
- Test it out with your selected phrase

## Daily Use

After setup, you'll see your workout dashboard:

- **Track Reps:** Use the + and - buttons to count your reps
- **Play Mantra:** Click to hear your motivational phrase
- **View Progress:** See your completion percentage
- **Reset:** Reset individual exercises or all at once

### Progress Features
- Real-time progress bars
- Celebration animation when you hit your target
- Voice feedback on achievements
- Daily counter to track your journey

## Monthly Check-in

After 30 days:

1. **Take After Photo:** Capture your progress
2. **Generate Comparison:** Create a side-by-side before/after image
3. **Share:** Download or share to social media
4. **Continue:** Start a new month with reset progress

## Tips for Best Experience

### Mobile Usage
- Add to home screen for app-like experience
- Works offline after first load (PWA)
- Camera works best in good lighting

### Voice Features
- Allow microphone permissions for best TTS quality
- Adjust volume before using voice features
- Different browsers have different voice options

### Photo Tips
- Take photos in same lighting conditions
- Use same angle/pose for best comparison
- Photos are stored locally in your browser

## Troubleshooting

**Voice not working?**
- Check browser permissions
- Some browsers don't support TTS
- Try a different browser (Chrome recommended)

**Photos not saving?**
- Check browser storage isn't full
- Clear cache and try again
- Ensure localStorage is enabled

**App not loading?**
- Clear browser cache
- Try incognito/private mode
- Check console for errors

## Data Privacy

All your data is stored locally in your browser:
- Photos stored as base64 in localStorage
- No data sent to any server
- No account required
- Delete browser data to reset app

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory. Deploy to any static hosting service!

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

---

**Ready to gEtgOOd? Let's start your fitness journey!** 💪🔥

