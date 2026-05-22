import { useContext, useEffect } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { FaPlay, FaHeadphones } from "react-icons/fa"

function SongsItemWithStats({ image, name, desc, id }) {
    const { playWithId, songStats, getSongStats } = useContext(PlayerContext);
    
    useEffect(() => {
        getSongStats(id);
    }, [id]);
    
    const stats = songStats[id];
    const playCount = stats?.totalPlays || 0;
    
    return (
        <div onClick={() => playWithId(id)} className="h-full flex flex-col p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] group relative">
            <div className="relative w-full aspect-square mb-3 overflow-hidden">
                <img className="rounded w-full h-full object-cover" src={image} alt={name} loading="lazy" />
                {/* Play count badge */}
                {playCount > 0 && (
                    <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1 text-xs">
                        <FaHeadphones className="text-red-500" />
                        <span className="text-white">{playCount > 999 ? (playCount/1000).toFixed(1) + 'K' : playCount}</span>
                    </div>
                )}
                {/* Play button overlay on hover */}
                <div className="absolute inset-0 bg-black/50 rounded hidden group-hover:flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <FaPlay className="text-white ml-1" />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <p className="font-bold mb-1 line-clamp-1">{name}</p>
                <p className="text-slate-200 text-sm line-clamp-1">{desc}</p>
            </div>
        </div>
    )
}

export default SongsItemWithStats
