import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

function SongsItem({ image, name, desc, id }) {
    const { playWithId } = useContext(PlayerContext);
    return (
        <div key={id} onClick={() => playWithId(id)} className="h-full flex flex-col p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            <div className="relative w-full aspect-square mb-3 overflow-hidden">
                <img className="rounded w-full h-full object-cover" src={image} alt={name} loading="lazy" />
            </div>
            <div className="flex-1">
                <p className="font-bold mb-1 line-clamp-1">{name}</p>
                <p className="text-slate-200 text-sm line-clamp-1">{desc}</p>
            </div>
        </div>
    )
}

export default SongsItem