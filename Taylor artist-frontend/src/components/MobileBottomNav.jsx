import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaCompactDisc, FaMusic, FaFire, FaUser, FaDownload } from 'react-icons/fa';

function MobileBottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;
    
    const navItems = [
        { path: '/', icon: FaHome, label: 'Home' },
        { path: '/discography', icon: FaCompactDisc, label: 'Albums' },
        { path: '/songs', icon: FaMusic, label: 'Songs' },
        { path: '/popular', icon: FaFire, label: 'Popular' },
        { path: '/about', icon: FaUser, label: 'About' },
    ];
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#282828] lg:hidden z-40 pb-safe">
            <div className="flex justify-around items-center py-2">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`flex flex-col items-center gap-1 p-2 min-w-[60px] transition-colors ${
                            isActive(item.path) ? 'text-red-500' : 'text-gray-400'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MobileBottomNav;
