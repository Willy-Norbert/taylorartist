import { useContext } from 'react'
import Display from './components/Display'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import SongPreview from './components/SongPreview'
import MobileBottomNav from './components/MobileBottomNav'
import { PlayerContext } from './context/PlayerContext'

const App = () => {

  const { audioRef, track, isFullscreen } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black overflow-hidden'>
      <div className="h-[85%] lg:h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      <MobileBottomNav />
      {isFullscreen && <SongPreview />}
      <audio ref={audioRef} src={track ? track.file : ""} preload='none'></audio>
    </div>
  )
}

export default App