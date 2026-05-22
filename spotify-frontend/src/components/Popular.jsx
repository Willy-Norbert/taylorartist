import { useContext } from "react"
import SongsItemWithStats from "./SongsItemWithStats"
import Navbar from "./Navbar"
import { PlayerContext } from "../context/PlayerContext"

function Popular() {
    const { songsData } = useContext(PlayerContext)
    
    // Show first 12 songs as "popular" (you can modify this logic)
    const popularSongs = songsData.slice(0, 12)

    return (
        <>
            <Navbar />
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Popular</h1>
                <p className="text-gray-400 mb-6">Most streamed tracks</p>
            </div>

            {popularSongs.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
                    {popularSongs.map((item, index) => (
                        <div key={index} className="relative h-full">
                            <span className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg">
                                {index + 1}
                            </span>
                            <div className="h-full">
                                <SongsItemWithStats image={item.image} name={item.name} desc={item.desc} id={item._id} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-xl">No songs available yet</p>
                </div>
            )}
        </>
    )
}

export default Popular
