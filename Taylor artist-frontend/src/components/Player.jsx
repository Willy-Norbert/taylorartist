import { useContext } from 'react';
import { assets } from '../assets/frontend-assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { FaStepBackward, FaPlay, FaPause, FaStepForward, FaExpand, FaVolumeUp, FaVolumeMute, FaRandom, FaRedo, FaCompactDisc } from 'react-icons/fa';

function Player() {

    const { track, seekBar, seekBg, play, pause, playStatus, time, nextSong, previusSong,
        seekSong, toggleLoop, isLooping, isShuffle, toggleShuffle, volume, handleVolumeChange,
        isMuted, toggleMute, toggleFullscreen } = useContext(PlayerContext)

    return track ? (
        <div className="h-[15%] lg:h-[10%] bg-[#121212] flex flex-col lg:flex-row justify-between items-center text-white px-4 border-t border-[#282828]">
            {/* Mobile Track Info - Visible only on mobile */}
            <div className="flex lg:hidden items-center gap-3 w-full py-2">
                <img className="w-12 h-12 rounded object-cover" src={track.image} alt={track.name} />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{track.name}</p>
                    <p className="text-xs text-gray-400 truncate">{track.desc}</p>
                </div>
                <button 
                    onClick={toggleFullscreen} 
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#282828] hover:bg-[#3e3e3e] rounded-full text-xs font-medium text-white transition-colors"
                >
                    <FaCompactDisc className="w-4 h-4" />
                    Preview
                </button>
            </div>
            
            {/* Desktop Track Info - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-4 w-[25%]">
                <img className="w-14 h-14 rounded object-cover" src={track.image} alt={track.name} />
                <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{track.name}</p>
                    <p className="text-xs text-gray-400 truncate">{track.desc}</p>
                </div>
                <button 
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-4 py-2 bg-[#282828] hover:bg-[#3e3e3e] rounded-full text-sm font-medium text-white transition-colors"
                >
                    <FaCompactDisc className="w-4 h-4" />
                    Preview
                </button>
            </div>
            
            {/* Controls - Center */}
            <div className="flex flex-col items-center gap-1 w-full lg:w-[50%]">
                <div className="flex items-center gap-4 lg:gap-6">
                    <button onClick={toggleShuffle} className={!isShuffle ? "text-gray-400 hover:text-white" : "text-red-500"}>
                        <FaRandom className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                    <button onClick={previusSong} className="text-gray-300 hover:text-white">
                        <FaStepBackward className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                    <button 
                        onClick={playStatus ? pause : play}
                        className="w-10 h-10 lg:w-12 lg:h-12 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    >
                        {playStatus ? (
                            <FaPause className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
                        ) : (
                            <FaPlay className="w-5 h-5 lg:w-6 lg:h-6 text-black ml-1" />
                        )}
                    </button>
                    <button onClick={nextSong} className="text-gray-300 hover:text-white">
                        <FaStepForward className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                    <button onClick={toggleLoop} className={isLooping ? "text-red-500" : "text-gray-400 hover:text-white"}>
                        <FaRedo className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                </div>
                
                {/* Progress Bar */}
                <div className="flex items-center gap-2 w-full lg:max-w-[500px]">
                    <span className="text-xs text-gray-400 w-10 text-right">{time.currentTime.minute}:{time.currentTime.second}</span>
                    <div ref={seekBg} onClick={seekSong} className='flex-1 h-1 bg-gray-600 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-full border-none bg-white rounded-full transition-all' />
                    </div>
                    <span className="text-xs text-gray-400 w-10">{time.totalTime.minute}:{time.totalTime.second}</span>
                </div>
            </div>
            
            {/* Desktop Right Controls */}
            <div className="hidden lg:flex items-center justify-end gap-3 w-[25%]">
                <button onClick={toggleMute} className="text-gray-400 hover:text-white">
                    {!isMuted && volume !== 0 ? (
                        <FaVolumeUp className="w-5 h-5" />
                    ) : (
                        <FaVolumeMute className="w-5 h-5" />
                    )}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />
                <button 
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#282828] hover:bg-[#3e3e3e] rounded-full text-sm font-medium text-white transition-colors"
                >
                    <FaCompactDisc className="w-4 h-4" />
                    Preview
                </button>
            </div>
        </div>
    ) : null
}

export default Player