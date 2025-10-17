// Background Audio Playback using Media Session API
// This allows music to play when the app is minimized or screen is off

export class BackgroundAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: { title: string; artist: string } | null = null;

  constructor() {
    // Check if Media Session API is supported
    if ('mediaSession' in navigator) {
      this.setupMediaSession();
    }
  }

  private setupMediaSession() {
    // Set up media session metadata and controls
    navigator.mediaSession.setActionHandler('play', () => {
      this.resume();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      this.pause();
    });

    navigator.mediaSession.setActionHandler('stop', () => {
      this.stop();
    });

    navigator.mediaSession.setActionHandler('seekbackward', () => {
      if (this.audio) {
        this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
      }
    });

    navigator.mediaSession.setActionHandler('seekforward', () => {
      if (this.audio) {
        this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
      }
    });
  }

  play(url: string, title: string, artist: string) {
    // Stop any currently playing audio
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    // Create new audio element
    this.audio = new Audio(url);
    this.audio.volume = 0.8;
    this.currentTrack = { title, artist };

    // Play audio
    this.audio.play().catch((error) => {
      console.error('Error playing audio:', error);
    });

    // Update media session metadata
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        album: 'gEtgOOd Workout',
        artwork: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      });
    }

    // Handle playback end
    this.audio.addEventListener('ended', () => {
      this.audio = null;
      this.currentTrack = null;
    });
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  resume() {
    if (this.audio) {
      this.audio.play().catch((error) => {
        console.error('Error resuming audio:', error);
      });
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      this.currentTrack = null;
    }
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  isPlaying(): boolean {
    return this.audio !== null && !this.audio.paused;
  }

  getCurrentTrack() {
    return this.currentTrack;
  }
}

// Global background audio player instance (for premium users)
export const backgroundAudioPlayer = new BackgroundAudioPlayer();

