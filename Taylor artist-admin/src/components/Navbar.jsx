import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
    const { admin, logout } = useContext(AdminContext);

    return (
        <nav className="w-full py-4 px-6 border-b-2 border-black bg-[#fcfffd] flex items-center justify-between">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-800">Taylor Admin</h1>
            </div>
            
            {admin && (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
                        <FaUser className="text-red-600" />
                        <span className="text-sm font-medium text-gray-700">{admin.name}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full transition-all"
                    >
                        <FaSignOutAlt />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar