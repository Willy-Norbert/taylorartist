import { useContext } from "react"
import AlbumItem from "./AlbumItem"
import Navbar from "./Navbar"
import SongsItemWithStats from "./SongsItemWithStats"
import HeroBanner from "./HeroBanner"
import bgBanner from "../assets/frontend-assets/bgbanner.png"
import { PlayerContext } from './../context/PlayerContext';

function DisplayHome() {
    const { songsData, albumsData } = useContext(PlayerContext)
    return (
        <>
            <Navbar />
            <HeroBanner />

            {/* Discography Section */}
            {albumsData.length > 0 && (
                <div className="mb-8">
                    <h1 className="my-5 font-bold text-2xl text-white">Discography</h1>
                    <div className="flex overflow-auto pb-2">
                        {albumsData.map((item, index) => (
                            <AlbumItem key={index} image={item.image} name={item.name} desc={item.desc} id={item._id} />
                        ))}
                    </div>
                </div>
            )}

            {/* All Tracks Section */}
            {songsData.length > 0 && (
                <div className="mb-8">
                    <h1 className="my-5 font-bold text-2xl text-white">All Tracks</h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
                        {songsData.map((item, index) => (
                            <div key={index} className="h-full">
                                <SongsItemWithStats image={item.image} name={item.name} desc={item.desc} id={item._id} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Popular Releases */}
            {songsData.length > 0 && (
                <div className="mb-8">
                    <h1 className="my-5 font-bold text-2xl text-white">Popular Releases</h1>
                    <div className="flex overflow-auto pb-2">
                        {songsData.slice(0, 6).map((item, index) => (
                            <div key={index} className="flex-shrink-0">
                                <SongsItemWithStats image={item.image} name={item.name} desc={item.desc} id={item._id} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* About Artist Section */}
            <div 
                className="mb-8 rounded-lg p-6 relative overflow-hidden"
                style={{ 
                    backgroundImage: `url(${bgBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60"></div>
                {/* Content */}
                <div className="relative z-10">
                    <h1 className="mb-4 font-bold text-2xl text-white">About the Artist</h1>
                    <p className="text-gray-200 leading-relaxed">
                        Welcome to Taylor's official portfolio. Here you will find all the latest releases,
                        albums, and tracks. Listen to the unique sound and experience the music journey.
                        Stay tuned for new releases and updates from Taylor.
                    </p>
                    <div className="flex gap-6 mt-4 text-sm text-gray-300">
                        <span>{songsData.length} Songs</span>
                        <span>{albumsData.length} Albums</span>
                        <span className="text-red-400 font-semibold">Verified Artist</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayHome