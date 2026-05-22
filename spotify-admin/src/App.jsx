import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export const url = "http://localhost:4000";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AdminContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfffd]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Admin Layout Component
const AdminLayout = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#fcfffd]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path='/add-song' element={<AddSong />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-song' element={<ListSong />} />
            <Route path='/list-album' element={<ListAlbum />} />
            <Route path='/' element={<Navigate to='/add-song' replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { isAuthenticated, loading } = useContext(AdminContext);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Route */}
        <Route 
          path='/login' 
          element={isAuthenticated ? <Navigate to='/' replace /> : <Login />} 
        />
        
        {/* Protected Routes */}
        <Route 
          path='/*' 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App