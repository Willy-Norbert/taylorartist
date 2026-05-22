import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/frontend-assets/assets'

function Navbar() {
    const navigate = useNavigate();

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Taylor Music Portfolio',
                    text: 'Check out Taylor\'s music!',
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold mb-4">
                <div className="flex items-center gap-2">
                    <img onClick={() => navigate(-1)} className='w-8 bg-black/50 p-2 rounded-2xl cursor-pointer hover:bg-black/70' src={assets.arrow_left} alt="arrow_left" />
                    <img onClick={() => navigate(1)} className='w-8 bg-black/50 p-2 rounded-2xl cursor-pointer hover:bg-black/70' src={assets.arrow_right} alt="arrow_right" />
                </div>
                <div className="flex items-center gap-4">
                    <p onClick={() => navigate('/about')} className='bg-red-600 hover:bg-red-500 text-white text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer transition-colors'>Contact Artist</p>
                    <p onClick={handleShare} className='bg-black/50 hover:bg-black/70 py-1 px-3 rounded-2xl text-[15px] cursor-pointer transition-colors'>Share Portfolio</p>
                    <p className='bg-red-600 text-white text-xs px-2 py-1 rounded font-bold animate-pulse'>NOW STREAMING</p>
                </div>
            </div>
        </>
    )
}

export default Navbar