import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaTimes, FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedo } from 'react-icons/fa';

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

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            {/* Compact Modal Container */}
            <div className="bg-[#1a1a1a] rounded-xl max-w-md w-full relative shadow-2xl shadow-red-900/20">
                {/* Close Button */}
                <button 
                    onClick={toggleFullscreen}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                <div className="p-6">
                    {/* Album Art */}
                    <div className="relative mx-auto w-48 h-48 mb-5">
                        <img 
                            src={track.image} 
                            alt={track.name}
                            className="w-full h-full rounded-lg shadow-lg object-cover"
                        />
                        {/* Now Playing Badge */}
                        <div className="absolute -top-2 -left-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                            NOW PLAYING
                        </div>
                    </div>

                    {/* Song Info */}
                    <div className="text-center mb-5">
                        <h1 className="text-xl font-bold text-white mb-1 truncate">{track.name}</h1>
                        <p className="text-sm text-gray-400 truncate">{track.desc || track.album}</p>
                        <p className="text-xs text-red-500 mt-1">Taylor</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full mb-5">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{time.currentTime.minute}:{time.currentTime.second}</span>
                            <span>{time.totalTime.minute}:{time.totalTime.second}</span>
                        </div>
                        <div 
                            ref={seekBg} 
                            onClick={seekSong}
                            className="w-full h-1.5 bg-gray-700 rounded-full cursor-pointer"
                        >
                            <hr 
                                ref={seekBar} 
                                className="h-full border-none bg-red-600 rounded-full transition-all"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4">
                        <button 
                            onClick={toggleShuffle}
                            className={isShuffle ? "text-red-500" : "text-gray-400 hover:text-white"}
                        >
                            <FaRandom className="w-4 h-4" />
                        </button>

                        <button 
                            onClick={previusSong}
                            className="text-white hover:text-red-500 transition-colors"
                        >
                            <FaStepBackward className="w-5 h-5" />
                        </button>

                        <button 
                            onClick={playStatus ? pause : play}
                            className="w-12 h-12 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-all transform hover:scale-105"
                        >
                            {playStatus ? (
                                <FaPause className="w-5 h-5 text-white" />
                            ) : (
                                <FaPlay className="w-5 h-5 text-white ml-0.5" />
                            )}
                        </button>

                        <button 
                            onClick={nextSong}
                            className="text-white hover:text-red-500 transition-colors"
                        >
                            <FaStepForward className="w-5 h-5" />
                        </button>

                        <button 
                            onClick={toggleLoop}
                            className={isLooping ? "text-red-500" : "text-gray-400 hover:text-white"}
                        >
                            <FaRedo className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongPreview;
