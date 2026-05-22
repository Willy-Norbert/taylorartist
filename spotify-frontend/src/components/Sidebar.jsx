import { useNavigate } from 'react-router-dom';
import { assets } from './../assets/frontend-assets/assets';
import homeBackground from '../assets/frontend-assets/home-background.png';
import { FaInstagram, FaYoutube, FaGlobe } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
            {/* Logo with background */}
            <div 
                className="flex items-center justify-center px-4 py-6 cursor-pointer rounded-lg overflow-hidden relative"
                style={{
                    backgroundImage: `url(${homeBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                onClick={() => navigate("/")}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
                {/* Logo */}
                <img className='w-32 object-contain relative z-10' src={assets.logo} alt="Taylor" />
            </div>

            {/* Main Navigation */}
            <div className="bg-[#121212] rounded p-4">
                <div onClick={() => navigate("/")} className="flex items-center gap-3 py-3 cursor-pointer hover:text-red-500 transition-colors">
                    <img className='w-6' src={assets.home_icon} alt="home icon" />
                    <p className='font-bold'>Home</p>
                </div>
                <div className="flex items-center gap-3 py-3 cursor-pointer hover:text-red-500 transition-colors">
                    <img className='w-6' src={assets.search_icon} alt="search icon" />
                    <p className='font-bold'>Search</p>
                </div>
            </div>

            {/* Artist Content Navigation */}
            <div className="bg-[#121212] rounded flex-1 p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-4">Browse</p>

                <div onClick={() => navigate("/discography")} className="flex items-center gap-3 py-2 cursor-pointer hover:text-red-500 transition-colors">
                    <img className='w-5' src={assets.stack_icon} alt="discography" />
                    <p className="font-medium">Discography</p>
                </div>

                <div onClick={() => navigate("/songs")} className="flex items-center gap-3 py-2 cursor-pointer hover:text-red-500 transition-colors">
                    <img className='w-5' src={assets.play_icon} alt="songs" />
                    <p className="font-medium">All Songs</p>
                </div>

                <div onClick={() => navigate("/popular")} className="flex items-center gap-3 py-2 cursor-pointer hover:text-red-500 transition-colors">
                    <img className='w-5' src={assets.like_icon} alt="popular" />
                    <p className="font-medium">Popular</p>
                </div>

                <div onClick={() => navigate("/about")} className="flex items-center gap-3 py-2 cursor-pointer hover:text-red-500 transition-colors">
                    <img className='w-5' src={assets.arrow_icon} alt="about" />
                    <p className="font-medium">About</p>
                </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#121212] rounded p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Connect</p>
                <div className="flex gap-3">
                    <a href="https://instagram.com/taylorartist1" target="_blank" rel="noopener noreferrer" 
                       className="w-9 h-9 bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <FaInstagram className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://www.youtube.com/@TaylorArtist01" target="_blank" rel="noopener noreferrer"
                       className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <FaYoutube className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://tiktok.com/@taylorartist0" target="_blank" rel="noopener noreferrer"
                       className="w-9 h-9 bg-black border-2 border-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <SiTiktok className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://taylorartist.me" target="_blank" rel="noopener noreferrer"
                       className="w-9 h-9 bg-black border border-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <FaGlobe className="w-5 h-5 text-red-500" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar