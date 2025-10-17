import { Howl } from 'howler';

// Audio player utility using Howler.js for better audio control
export class AudioPlayer {
  private currentSound: Howl | null = null;

  play(url: string) {
    // Stop any currently playing sound
    if (this.currentSound) {
      this.currentSound.stop();
    }

    // Create and play new sound
    this.currentSound = new Howl({
      src: [url],
      html5: true,
      volume: 0.8,
      onend: () => {
        this.currentSound = null;
      },
      onloaderror: (id, error) => {
        console.error('Error loading audio:', error);
      },
      onplayerror: (id, error) => {
        console.error('Error playing audio:', error);
      }
    });

    this.currentSound.play();
  }

  stop() {
    if (this.currentSound) {
      this.currentSound.stop();
      this.currentSound = null;
    }
  }

  pause() {
    if (this.currentSound) {
      this.currentSound.pause();
    }
  }

  resume() {
    if (this.currentSound) {
      this.currentSound.play();
    }
  }

  setVolume(volume: number) {
    if (this.currentSound) {
      this.currentSound.volume(volume);
    }
  }
}

// Global audio player instance
export const audioPlayer = new AudioPlayer();

