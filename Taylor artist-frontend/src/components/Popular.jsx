import { useContext, useEffect, useRef } from "react"
import SongsItemWithStats from "./SongsItemWithStats"
import Navbar from "./Navbar"
import { PlayerContext } from "../context/PlayerContext"

function Popular() {
    const { songsData } = useContext(PlayerContext)
    const scrollRef = useRef(null)
    
    // Show first 12 songs as "popular" (you can modify this logic)
    const popularSongs = songsData.slice(0, 12)

    // Auto-scroll carousel
    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer || popularSongs.length <= 4) return

        let scrollAmount = 0
        const scrollStep = 1
        const scrollInterval = 50

        const autoScroll = setInterval(() => {
            if (scrollContainer) {
                scrollAmount += scrollStep
                scrollContainer.scrollLeft = scrollAmount

                // Reset when reached end
                if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollAmount = 0
                    scrollContainer.scrollLeft = 0
                }
            }
        }, scrollInterval)

        // Pause on hover
        const handleMouseEnter = () => clearInterval(autoScroll)
        const handleMouseLeave = () => {
            clearInterval(autoScroll)
            setInterval(() => {
                if (scrollContainer) {
                    scrollAmount += scrollStep
                    scrollContainer.scrollLeft = scrollAmount
                    if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                        scrollAmount = 0
                        scrollContainer.scrollLeft = 0
                    }
                }
            }, scrollInterval)
        }

        scrollContainer.addEventListener('mouseenter', handleMouseEnter)
        scrollContainer.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            clearInterval(autoScroll)
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [popularSongs.length])

    return (
        <>
            <Navbar />
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Popular</h1>
                <p className="text-gray-400 mb-6">Most streamed tracks</p>
            </div>

            {popularSongs.length > 0 ? (
                <div 
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                    style={{ 
                        scrollbarWidth: 'none', 
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {popularSongs.map((item, index) => (
                        <div 
                            key={index} 
                            className="relative flex-shrink-0 w-[160px] md:w-[180px] lg:w-[200px]"
                        >
                            <span className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg">
                                {index + 1}
                            </span>
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

export default Popular
