import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaCompress, FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedo } from 'react-icons/fa';

function FullscreenPlayer() {
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
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            {/* Close Button */}
            <button 
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
            >
                <FaCompress className="w-8 h-8" />
            </button>

            {/* Main Content */}
            <div className="flex flex-col items-center gap-8 max-w-2xl w-full px-8">
                {/* Album Art */}
                <div className="relative">
                    <img 
                        src={track.image} 
                        alt={track.name}
                        className="w-80 h-80 md:w-96 md:h-96 rounded-lg shadow-2xl shadow-red-600/20 object-cover"
                    />
                    {/* Now Playing Badge */}
                    <div className="absolute -top-4 -left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        NOW PLAYING
                    </div>
                </div>

                {/* Song Info */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{track.name}</h1>
                    <p className="text-xl md:text-2xl text-gray-400">{track.desc || track.album}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
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

                {/* Controls */}
                <div className="flex items-center gap-8">
                    <button 
                        onClick={toggleShuffle}
                        className={isShuffle ? "text-red-500" : "text-gray-400 hover:text-white"}
                    >
                        <FaRandom className="w-6 h-6" />
                    </button>

                    <button 
                        onClick={previusSong}
                        className="text-white hover:text-red-500 transition-colors"
                    >
                        <FaStepBackward className="w-8 h-8" />
                    </button>

                    <button 
                        onClick={playStatus ? pause : play}
                        className="w-20 h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-all transform hover:scale-105"
                    >
                        {playStatus ? (
                            <FaPause className="w-10 h-10 text-white" />
                        ) : (
                            <FaPlay className="w-10 h-10 text-white ml-1" />
                        )}
                    </button>

                    <button 
                        onClick={nextSong}
                        className="text-white hover:text-red-500 transition-colors"
                    >
                        <FaStepForward className="w-8 h-8" />
                    </button>

                    <button 
                        onClick={toggleLoop}
                        className={isLooping ? "text-red-500" : "text-gray-400 hover:text-white"}
                    >
                        <FaRedo className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FullscreenPlayer;
