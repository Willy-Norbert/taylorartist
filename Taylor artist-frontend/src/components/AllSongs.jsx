import { useContext } from "react"
import SongsItemWithStats from "./SongsItemWithStats"
import Navbar from "./Navbar"
import { PlayerContext } from "../context/PlayerContext"

function AllSongs() {
    const { songsData } = useContext(PlayerContext)

    return (
        <>
            <Navbar />
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">All Songs</h1>
                <p className="text-gray-400 mb-6">Complete catalog - {songsData.length} tracks</p>
            </div>

            {songsData.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
                    {songsData.map((item, index) => (
                        <div key={index} className="h-full">
                            <SongsItemWithStats image={item.image} name={item.name} desc={item.desc} id={item._id} />
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

export default AllSongs
