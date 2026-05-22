import { useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/frontend-assets/assets";

function HeroBanner() {
  const { playWithId, songsData, artistStats, getArtistStats } = useContext(PlayerContext);

  useEffect(() => {
    getArtistStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(getArtistStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayLatest = () => {
    if (songsData.length > 0) {
      playWithId(songsData[0]._id);
    }
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute inset-0 w-full h-full scale-[1.5]"
          src="https://www.youtube.com/embed/bflarqQSh7U?autoplay=1&mute=1&loop=1&playlist=bflarqQSh7U&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="Artist Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/80 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 z-10">
        <p className="text-red-500 font-semibold mb-2">Verified Artist</p>
        <div className="flex items-center gap-4 mb-4">
          <img src={assets.logo} alt="Taylor" className="w-32 md:w-40 object-contain" />
        </div>
        <p className="text-gray-300 text-lg mb-6 max-w-lg">
          Experience the unique sound. Listen to the latest tracks and explore the discography.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handlePlayLatest}
            className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            Play Latest
          </button>
          <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all backdrop-blur-sm">
            Follow
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-8 right-8 z-10 text-right hidden md:block">
        <p className="text-gray-400 text-sm">Monthly Listeners</p>
        <p className="text-2xl font-bold text-white">
          {artistStats.monthlyListeners > 0 
            ? artistStats.monthlyListeners.toLocaleString() 
            : "Loading..."}
        </p>
        <p className="text-xs text-gray-500">{artistStats.totalPlays > 0 && `${artistStats.totalPlays.toLocaleString()} total plays`}</p>
      </div>
    </div>
  );
}

export default HeroBanner;
