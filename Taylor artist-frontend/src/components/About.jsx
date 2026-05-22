import { useContext, useEffect } from "react"
import Navbar from "./Navbar"
import { PlayerContext } from "../context/PlayerContext"
import { assets } from "../assets/frontend-assets/assets"
import bgImage from "../assets/frontend-assets/bg.png"
import { FaInstagram, FaYoutube, FaGlobe, FaEnvelope } from "react-icons/fa"
import { SiAudiomack, SiTiktok } from "react-icons/si"

function About() {
    const { songsData, albumsData, artistStats, getArtistStats } = useContext(PlayerContext)

    useEffect(() => {
        getArtistStats();
    }, [])

    return (
        <>
            <Navbar />
            {/* Video Background Banner */}
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-8">
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
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8 z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">About Taylor</h1>
                    <p className="text-red-500 font-semibold">Verified Artist</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">

                <div className="grid grid-cols-3 gap-4 mb-12 text-center">
                    <div className="bg-[#1a1a1a] rounded-lg p-6">
                        <p className="text-3xl font-bold text-white">{songsData.length}</p>
                        <p className="text-gray-400">Songs</p>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-6">
                        <p className="text-3xl font-bold text-white">{albumsData.length}</p>
                        <p className="text-gray-400">Albums</p>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-6">
                        <p className="text-3xl font-bold text-white">
                            {artistStats.monthlyListeners > 0 
                                ? artistStats.monthlyListeners.toLocaleString() 
                                : "Loading..."}
                        </p>
                        <p className="text-gray-400">Monthly Listeners</p>
                    </div>
                </div>

                <div 
                    className="rounded-lg p-8 mb-8 relative overflow-hidden"
                    style={{ 
                        backgroundImage: `url(/assets/bg.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/60"></div>
                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-4">Biography</h2>
                        <p className="text-gray-200 leading-relaxed mb-4">
                            Welcome to Taylor's official music portfolio. Here you will find all the latest releases,
                            albums, and tracks. Experience the unique sound and explore the complete discography.
                        </p>
                        <p className="text-gray-200 leading-relaxed">
                            From the first release to the latest hits, this collection showcases the artistic journey.
                            Stay tuned for new releases and updates from Taylor.
                        </p>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Connect</h2>
                    <div className="flex flex-wrap gap-4">
                        <a href="https://instagram.com/taylorartist1" target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:opacity-90 text-white px-4 py-2 rounded-full transition-all">
                            <FaInstagram className="w-5 h-5" />
                            <span className="font-bold">Instagram</span>
                        </a>
                        <a href="https://www.youtube.com/@TaylorArtist01" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-colors">
                            <FaYoutube className="w-5 h-5" />
                            <span className="font-bold">YouTube</span>
                        </a>
                        <a href="https://audiomack.com/taylorartist" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full transition-colors">
                            <SiAudiomack className="w-5 h-5" />
                            <span className="font-bold">Audiomack</span>
                        </a>
                        <a href="https://tiktok.com/@taylorartist0" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 bg-black border-2 border-white hover:bg-white/10 text-white px-4 py-2 rounded-full transition-colors">
                            <SiTiktok className="w-5 h-5" />
                            <span className="font-bold">TikTok</span>
                        </a>
                        <a href="https://taylorartist.me" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-colors">
                            <FaGlobe className="w-5 h-5" />
                            <span className="font-bold">Website</span>
                        </a>
                    </div>
                </div>

                {/* Email Section */}
                <div 
                    className="rounded-lg p-8 mt-6 relative overflow-hidden"
                    style={{ 
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/60"></div>
                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
                        <p className="text-gray-200 mb-4">For bookings, collaborations, and inquiries:</p>
                        <a href="mailto:contact@taylorartist.me" 
                           className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
                            <FaEnvelope className="w-5 h-5" />
                            <span className="font-semibold">View email address</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
