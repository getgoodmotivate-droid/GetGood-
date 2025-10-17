# gEtgOOd - Fitness Tracking App

A modern, motivational fitness tracking application to help you achieve your fitness goals!

## Features

### 🎯 Setup Flow
- 📸 **Before Photo**: Capture your starting point with camera or upload
- 🎯 **Monthly Target**: Set your fitness goals and intentions
- 💪 **Weekly Exercises**: Define your workout routine with custom rep targets
- 💬 **Motivational Phrases**: Choose from 15+ inspiring mantras (with voice playback!)
- 🎵 **Pump-Up Songs**: Select your workout anthem from curated list
- 🗣️ **Voice Preference**: Choose male or female voice for motivation (fixed and improved!)

### 💪 Workout Tracking
- ✅ **Exercise Counters**: Track reps with intuitive +/- buttons
- 📊 **Progress Visualization**: Real-time progress bars for each exercise
- 🎉 **Achievement Celebrations**: Animated celebrations when hitting targets
- 🔊 **Voice Feedback**: Audio encouragement on goal completion
- 🎵 **Music Player**: Play/pause your selected workout song
- 🔄 **Reset Options**: Reset individual exercises or all at once
- 📅 **Day Tracking**: Monitor how many days you've been training
- 📈 **Completion Percentage**: Overall workout progress indicator

### 📊 Weekly Achievement Log (NEW!)
- 📝 **Progress Logging**: Save your weekly workout achievements
- 🗒️ **Personal Notes**: Add reflections about each week's performance
- 📅 **History Timeline**: View all past weekly logs in chronological order
- 🎯 **Exercise Breakdown**: See individual exercise completion for each week
- 🏆 **Achievement Badges**: Visual rewards for high-performance weeks (80%+)
- 📈 **Stats Dashboard**: Track days active, current week, and total logs

### 🏆 Hall of Fame (NEW!)
- 🖼️ **Transformation Gallery**: Save unlimited before/after transformations
- 📸 **Comparison Images**: Professionally generated side-by-side comparisons
- 📤 **Social Sharing**: Share transformations directly to social media
- 💾 **Download Options**: Save high-quality transformation images
- 📝 **Transformation Notes**: Add personal reflections for each journey
- 📊 **Journey Stats**: View cumulative progress across all transformations
- 🗑️ **Gallery Management**: Delete transformations if needed

### 📸 Monthly Review
- 📷 **After Photo**: Capture your 30-day progress
- 🖼️ **Auto-Generated Comparison**: Side-by-side before/after images with branding
- 📝 **Transformation Notes**: Add reflections about your journey
- 📊 **Statistics Summary**: View total reps, exercises tracked, and more
- 🎯 **Goal Review**: See your original monthly target
- 💾 **Auto-Save to Hall of Fame**: Automatically archived for future reference
- 📤 **Enhanced Sharing**: Better social media integration
- 🔁 **Continue Training**: Seamlessly start a new monthly cycle

### 🧭 Navigation System (NEW!)
- 🏠 **Multi-View Navigation**: Switch between Workout, Progress, and Hall of Fame
- 📱 **Mobile Menu**: Responsive hamburger menu for mobile devices
- ✨ **Active Indicators**: Clear visual cues for current section
- 🎨 **Smooth Transitions**: Animated view changes

## Tech Stack

- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for beautiful, modern UI
- **Howler.js** for professional audio playback
- **Lucide React** for crisp, modern icons
- **Web APIs**:
  - Canvas API for image manipulation
  - Speech Synthesis API for voice motivation (enhanced!)
  - Web Share API for social sharing
  - LocalStorage for data persistence
  - Service Workers for PWA capabilities

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### First Time Setup
1. **Initial Setup**: Follow the 6-step setup flow to configure your profile
2. **Capture Before Photo**: Take your starting point photo
3. **Set Goals**: Define your monthly target
4. **Add Exercises**: Create your workout routine
5. **Choose Motivation**: Select phrase, song, and voice preference

### Daily Use
1. **Track Workouts**: Use the Workout tab to log your reps
2. **Play Music**: Hit the play button for your workout song
3. **Get Motivated**: Click the mantra button for voice encouragement
4. **Save Progress**: Go to Progress tab to log weekly achievements

### Monthly Cycle
1. **30-Day Check-in**: Button activates after 30 days
2. **Take After Photo**: Capture your transformation
3. **Generate Comparison**: Create shareable side-by-side image
4. **Add Notes**: Reflect on your journey
5. **Save to Hall of Fame**: Automatically archived
6. **Continue**: Start fresh with new month

## Features in Detail

### 🎤 Enhanced Voice System
- **Fixed Voice Bug**: Male and female voices now correctly assigned
- **Better Voice Selection**: Improved algorithm to find natural-sounding voices
- **Realistic TTS**: Adjusted rate (0.85) and pitch for dramatic delivery
- **15+ Motivational Phrases**: Organized by category (Intensity, Mental, Progress, etc.)
- **Test Before Select**: Hear phrases during setup

### 🎵 Audio System
- **Howler.js Integration**: Professional-grade audio library
- **Music Controls**: Play/pause functionality for workout songs
- **Error Handling**: Graceful fallbacks if audio fails
- **Volume Control**: Adjustable audio levels (0.8 default)

### 📸 Advanced Image Processing
- **Smart Compression**: Automatic image optimization (max 800x800, 80% quality)
- **Comparison Generator**: Professional side-by-side layout with branding
- **Multiple Formats**: Support for JPEG and PNG
- **Before/After Templates**: Styled comparison images with labels

### 💾 Data Management
- **LocalStorage**: All data stored locally in browser
- **No Account Needed**: Complete privacy, no server uploads
- **Data Structures**: Organized storage for exercises, achievements, transformations
- **Auto-Save**: Continuous background saving
- **Export Ready**: Easy to extend for cloud sync

### 🏆 Achievement System
- **Weekly Logs**: Track progress week by week
- **Personal Notes**: Add context to each week
- **Performance Metrics**: Calculate completion percentages
- **Badge System**: Visual rewards for high achievement
- **Historical View**: See your entire journey

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers supported

## License

MIT License - feel free to use and modify!

## Credits

Built with ❤️ for fitness enthusiasts everywhere.

---

**Get Good. Stay Good. gEtgOOd!** 💪

