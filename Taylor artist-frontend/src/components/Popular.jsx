import { useContext, useEffect, useRef, useState, useCallback } from "react"
import SongsItemWithStats from "./SongsItemWithStats"
import Navbar from "./Navbar"
import { PlayerContext } from "../context/PlayerContext"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Popular() {
    const { songsData } = useContext(PlayerContext)
    const scrollRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    
    // Show first 12 songs as "popular"
    const popularSongs = songsData.slice(0, 12)
    
    // Duplicate songs for infinite loop effect
    const duplicatedSongs = [...popularSongs, ...popularSongs, ...popularSongs]
    
    const getCardWidth = useCallback(() => {
        const width = window.innerWidth
        if (width >= 1024) return 200 + 16 // lg:w-[200px] + gap
        if (width >= 768) return 180 + 16  // md:w-[180px] + gap
        return 160 + 16                    // w-[160px] + gap
    }, [])

    // Auto-slide one item at a time
    useEffect(() => {
        if (popularSongs.length <= 1 || isPaused) return

        const slideInterval = setInterval(() => {
            setCurrentIndex((prev) => {
                const nextIndex = prev + 1
                // Reset to middle set when reaching end for infinite loop
                if (nextIndex >= popularSongs.length * 2) {
                    return popularSongs.length
                }
                return nextIndex
            })
        }, 3000) // Slide every 3 seconds

        return () => clearInterval(slideInterval)
    }, [popularSongs.length, isPaused])

    // Smooth scroll to current index
    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        const cardWidth = getCardWidth()
        const scrollPosition = currentIndex * cardWidth
        
        scrollContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        })
    }, [currentIndex, getCardWidth])

    const goToPrev = () => {
        setCurrentIndex((prev) => {
            if (prev <= 0) {
                return popularSongs.length * 2 - 1
            }
            return prev - 1
        })
    }

    const goToNext = () => {
        setCurrentIndex((prev) => {
            const next = prev + 1
            if (next >= popularSongs.length * 2) {
                return popularSongs.length
            }
            return next
        })
    }

    // Initialize scroll position to middle set
    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (scrollContainer && popularSongs.length > 0) {
            const cardWidth = getCardWidth()
            scrollContainer.scrollLeft = popularSongs.length * cardWidth
        }
    }, [popularSongs.length, getCardWidth])

    return (
        <>
            <Navbar />
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Popular</h1>
                <p className="text-gray-400 mb-6">Most streamed tracks</p>
            </div>

            {popularSongs.length > 0 ? (
                <div className="relative group">
                    {/* Navigation Buttons */}
                    <button 
                        onClick={goToPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <FaChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <FaChevronRight className="w-5 h-5" />
                    </button>

                    {/* Carousel */}
                    <div 
                        ref={scrollRef}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className="flex gap-4 overflow-x-hidden scrollbar-hide pb-4 px-2"
                        style={{ 
                            scrollbarWidth: 'none', 
                            msOverflowStyle: 'none'
                        }}
                    >
                        {duplicatedSongs.map((item, index) => (
                            <div 
                                key={`${item._id}-${index}`}
                                className="relative flex-shrink-0 w-[160px] md:w-[180px] lg:w-[200px]"
                            >
                                <span className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg">
                                    {(index % popularSongs.length) + 1}
                                </span>
                                <SongsItemWithStats 
                                    image={item.image} 
                                    name={item.name} 
                                    desc={item.desc} 
                                    id={item._id} 
                                />
                            </div>
                        ))}
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {popularSongs.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(popularSongs.length + index)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    (currentIndex % popularSongs.length) === index 
                                        ? 'bg-red-600' 
                                        : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                            />
                        ))}
                    </div>
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
