import { Route, Routes, useLocation } from "react-router-dom"
import DisplayHome from "./DisplayHome"
import DisplayAlbum from "./DisplayAlbum"
import Discography from "./Discography"
import AllSongs from "./AllSongs"
import Popular from "./Popular"
import About from "./About"
import { useContext, useEffect, useRef } from "react"
import { PlayerContext } from "../context/PlayerContext";

function Display() {
    const { albumsData } = useContext(PlayerContext);

    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";
    const album = isAlbum ? albumsData.find((a) => (a._id == albumId)) : null;
    const bgColor = isAlbum && album ? album.bgColour : "#121212";

    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
        } else {
            displayRef.current.style.background = `#121212`;
        }
    }, [isAlbum, bgColor]);

    return (
        <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white lg:w-[75%] lg:ml-0 overflow-auto">
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album/:id" element={<DisplayAlbum album={album} />} />
                <Route path="/discography" element={<Discography />} />
                <Route path="/songs" element={<AllSongs />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

export default Display