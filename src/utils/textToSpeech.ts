export const speakPhrase = (text: string, voicePreference: 'male' | 'female') => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slightly slower for more dramatic effect
    utterance.pitch = voicePreference === 'male' ? 0.75 : 1.3; // Fixed: was reversed
    utterance.volume = 1;
    
    // Try to select appropriate voice with better filtering
    const voices = window.speechSynthesis.getVoices();
    
    let targetVoice;
    if (voicePreference === 'male') {
      // Look for male voices
      targetVoice = voices.find(voice => {
        const name = voice.name.toLowerCase();
        return (name.includes('male') && !name.includes('female')) || 
               name.includes('david') || 
               name.includes('daniel') || 
               name.includes('mark') ||
               name.includes('google us english') ||
               (voice.lang.includes('en') && !name.includes('female') && !name.includes('samantha'));
      });
    } else {
      // Look for female voices
      targetVoice = voices.find(voice => {
        const name = voice.name.toLowerCase();
        return name.includes('female') || 
               name.includes('samantha') || 
               name.includes('victoria') || 
               name.includes('karen') ||
               name.includes('zira') ||
               name.includes('susan');
      });
    }
    
    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }
};

// Load voices (needed for some browsers)
export const initializeVoices = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
};

