import React, { useState, useEffect } from 'react';
import { Music, Disc, CheckCircle } from 'lucide-react';
import { getSpotifyAuthUrl, extractTokenFromUrl, getUserPlaylists } from '../utils/spotifyIntegration';

interface SpotifyConnectProps {
  connected: boolean;
  playlistId?: string;
  onConnect: (token: string, playlistId: string) => void;
}

export const SpotifyConnect: React.FC<SpotifyConnectProps> = ({ connected, playlistId, onConnect }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>(playlistId || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for token in URL (after redirect)
    const token = extractTokenFromUrl();
    if (token) {
      setAccessToken(token);
      loadPlaylists(token);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const loadPlaylists = async (token: string) => {
    setLoading(true);
    const userPlaylists = await getUserPlaylists(token);
    setPlaylists(userPlaylists);
    setLoading(false);
  };

  const handleConnect = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  const handleSelectPlaylist = (id: string) => {
    setSelectedPlaylist(id);
    if (accessToken) {
      onConnect(accessToken, id);
    }
  };

  if (!accessToken && !connected) {
    return (
      <div className="glass-effect rounded-2xl p-6">
        <div className="text-center">
          <Disc className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin-slow" />
          <h3 className="text-xl font-bold mb-2">Connect Spotify</h3>
          <p className="text-slate-300 mb-4">
            Listen to your favorite playlists while working out!
          </p>
          <button onClick={handleConnect} className="btn-primary">
            <Music className="inline w-5 h-5 mr-2" />
            Connect Spotify Account
          </button>
          <p className="text-xs text-slate-400 mt-3">
            Note: Requires Spotify Premium for playback control
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="glass-effect rounded-2xl p-6 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-2" />
        <p className="text-slate-300">Loading playlists...</p>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Music className="w-6 h-6 text-green-500" />
          Your Playlists
        </h3>
        {connected && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Connected</span>
          </div>
        )}
      </div>

      {playlists.length === 0 ? (
        <p className="text-slate-400 text-center py-4">No playlists found</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => handleSelectPlaylist(playlist.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all
                ${selectedPlaylist === playlist.id 
                  ? 'bg-green-500/20 border-2 border-green-500' 
                  : 'glass-effect hover:bg-white/10'
                }
              `}
            >
              {playlist.images?.[0] && (
                <img 
                  src={playlist.images[0].url} 
                  alt={playlist.name}
                  className="w-12 h-12 rounded-lg"
                />
              )}
              <div className="flex-1 text-left">
                <div className="font-semibold">{playlist.name}</div>
                <div className="text-xs text-slate-400">{playlist.tracks.total} tracks</div>
              </div>
              {selectedPlaylist === playlist.id && (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 glass-effect rounded-xl">
        <p className="text-xs text-slate-400">
          💡 <strong>Tip:</strong> Music will play during your workouts. You can control playback from your Spotify app or the workout screen.
        </p>
      </div>
    </div>
  );
};

