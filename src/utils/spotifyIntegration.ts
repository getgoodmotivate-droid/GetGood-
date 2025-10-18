// Spotify Web Playback SDK Integration
// Documentation: https://developer.spotify.com/documentation/web-playback-sdk

export const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
export const REDIRECT_URI = import.meta.env.VITE_APP_URL || 'http://localhost:5173';

export const getSpotifyAuthUrl = (): string => {
  const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
  ].join(' ');

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: scopes,
    show_dialog: 'true',
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const extractTokenFromUrl = (): string | null => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
};

export const getUserPlaylists = async (accessToken: string) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch playlists');
    
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

export const playSpotifyPlaylist = async (accessToken: string, playlistId: string) => {
  try {
    // Note: Requires Spotify Premium for playback control
    const response = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        context_uri: `spotify:playlist:${playlistId}`,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error playing playlist:', error);
    return false;
  }
};

// Initialize Spotify Web Playback SDK
export const initializeSpotifyPlayer = (accessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const player = new (window as any).Spotify.Player({
        name: 'gEtgOOd Fitness App',
        getOAuthToken: (cb: any) => cb(accessToken),
        volume: 0.8,
      });

      player.addListener('ready', ({ device_id }: any) => {
        resolve({ player, device_id });
      });

      player.addListener('not_ready', () => {
        reject(new Error('Device not ready'));
      });

      player.connect();
    };
  });
};

