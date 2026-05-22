import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaTimes, FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedo, FaDownload } from 'react-icons/fa';

function SongPreview() {
    const { 
        track, 
        playStatus, 
        play, 
        pause, 
        previusSong, 
        nextSong,
        time,
        seekSong,
        seekBar,
        seekBg,
        isLooping,
        toggleLoop,
        isShuffle,
        toggleShuffle,
        toggleFullscreen 
    } = useContext(PlayerContext);

    if (!track) return null;

    const handleDownload = async () => {
        try {
            const response = await fetch(track.file);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${track.name} - Taylor.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            {/* Mobile-First Modal Container */}
            <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-md relative shadow-2xl">
                {/* Close Button */}
                <button 
                    onClick={toggleFullscreen}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <FaTimes className="w-6 h-6" />
                </button>

                <div className="p-6 lg:p-8">
                    {/* Album Art - Larger on mobile */}
                    <div className="relative mx-auto w-56 h-56 lg:w-48 lg:h-48 mb-6">
                        <img 
                            src={track.image} 
                            alt={track.name}
                            className="w-full h-full rounded-xl shadow-2xl object-cover"
                        />
                        {/* Now Playing Badge */}
                        <div className="absolute -top-2 -left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            NOW PLAYING
                        </div>
                    </div>

                    {/* Song Info */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl lg:text-xl font-bold text-white mb-2 truncate">{track.name}</h1>
                        <p className="text-base lg:text-sm text-gray-400 truncate">{track.desc || track.album}</p>
                        <p className="text-sm text-red-500 mt-2">Taylor</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full mb-6">
                        <div className="flex justify-between text-sm lg:text-xs text-gray-400 mb-2">
                            <span>{time.currentTime.minute}:{time.currentTime.second}</span>
                            <span>{time.totalTime.minute}:{time.totalTime.second}</span>
                        </div>
                        <div 
                            ref={seekBg} 
                            onClick={seekSong}
                            className="w-full h-2 bg-gray-700 rounded-full cursor-pointer"
                        >
                            <hr 
                                ref={seekBar} 
                                className="h-full border-none bg-red-600 rounded-full transition-all"
                            />
                        </div>
                    </div>

                    {/* Controls - Larger for mobile touch */}
                    <div className="flex items-center justify-center gap-6 lg:gap-4 mb-6">
                        <button 
                            onClick={toggleShuffle}
                            className={isShuffle ? "text-red-500" : "text-gray-400 hover:text-white"}
                        >
                            <FaRandom className="w-6 h-6 lg:w-4 lg:h-4" />
                        </button>

                        <button 
                            onClick={previusSong}
                            className="text-white hover:text-red-500 transition-colors"
                        >
                            <FaStepBackward className="w-7 h-7 lg:w-5 lg:h-5" />
                        </button>

                        <button 
                            onClick={playStatus ? pause : play}
                            className="w-16 h-16 lg:w-12 lg:h-12 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-lg"
                        >
                            {playStatus ? (
                                <FaPause className="w-7 h-7 lg:w-5 lg:h-5 text-white" />
                            ) : (
                                <FaPlay className="w-7 h-7 lg:w-5 lg:h-5 text-white ml-1" />
                            )}
                        </button>

                        <button 
                            onClick={nextSong}
                            className="text-white hover:text-red-500 transition-colors"
                        >
                            <FaStepForward className="w-7 h-7 lg:w-5 lg:h-5" />
                        </button>

                        <button 
                            onClick={toggleLoop}
                            className={isLooping ? "text-red-500" : "text-gray-400 hover:text-white"}
                        >
                            <FaRedo className="w-6 h-6 lg:w-4 lg:h-4" />
                        </button>
                    </div>

                    {/* Download Button */}
                    <button 
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#282828] hover:bg-[#3e3e3e] rounded-xl text-white font-medium transition-colors"
                    >
                        <FaDownload className="w-5 h-5" />
                        Download Song
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SongPreview;
