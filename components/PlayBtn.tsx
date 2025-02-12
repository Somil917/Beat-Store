import usePlayer from "@/hooks/usePlayer";
import { Beat } from "@/types";
import { FaPause, FaPlay } from "react-icons/fa";

interface PlayBtnProps {
    beat: Beat;
}

const PlayBtn: React.FC<PlayBtnProps> = ({ beat }) => {

    const { isPlaying, togglePlay, activeId, setPlayingState } = usePlayer();

    

    return ( 
        <button
        onClick={(e) => {
            e.preventDefault();
            if(beat.id !== activeId){
                setPlayingState(true)
            }else{
                setPlayingState(!isPlaying)
            }
        }}
        className={`transition flex transform p-4 bg-opacity-50 bg-[#0e0e0d] hover:bg-opacity-75 rounded-full inset-0 ${ beat.id === activeId ? "opacity-100 bg-opacity-75" : "opacity-0"} items-center justify-center group-hover:opacity-100`}>
            {isPlaying && beat.id === activeId ? <FaPause size={20}/> : <FaPlay size={20}/>}
        </button>
     );
}
 
export default PlayBtn;