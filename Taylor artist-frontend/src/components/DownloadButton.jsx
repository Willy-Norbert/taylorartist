import { useState } from 'react';
import { FaDownload, FaEllipsisV, FaMobile, FaDesktop } from 'react-icons/fa';

function DownloadButton({ track, variant = 'desktop' }) {
    const [showMenu, setShowMenu] = useState(false);
    const [downloading, setDownloading] = useState(false);
    
    const handleDownload = async (type) => {
        setShowMenu(false);
        setDownloading(true);
        
        try {
            // For demo purposes - in production, this would fetch from your API
            const response = await fetch(track.file);
            const blob = await response.blob();
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${track.name} - Taylor.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            // Show success message
            if (type === 'mobile') {
                alert('Song downloaded! Check your downloads folder.');
            }
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        } finally {
            setDownloading(false);
        }
    };
    
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    if (variant === 'mobile') {
        return (
            <button
                onClick={() => handleDownload('mobile')}
                disabled={downloading}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-all"
            >
                {downloading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <FaDownload className="w-4 h-4" />
                )}
                Download
            </button>
        );
    }
    
    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-all"
            >
                <FaDownload className="w-4 h-4" />
                Download
                <FaEllipsisV className="w-3 h-3 ml-1" />
            </button>
            
            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#282828] rounded-lg shadow-xl z-50 overflow-hidden">
                    <button
                        onClick={() => handleDownload('mobile')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3e3e3e] text-white text-sm transition-colors"
                    >
                        <FaMobile className="w-4 h-4 text-gray-400" />
                        Download for Mobile
                    </button>
                    <button
                        onClick={() => handleDownload('desktop')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3e3e3e] text-white text-sm transition-colors"
                    >
                        <FaDesktop className="w-4 h-4 text-gray-400" />
                        Download for PC
                    </button>
                </div>
            )}
        </div>
    );
}

export default DownloadButton;
