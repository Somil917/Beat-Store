import { FaPlay } from "react-icons/fa";

const PlayBtn = () => {
    return ( 
        <button className="transition flex transform p-4 -translate-x-1/2 -translate-y-1/2 bg-[#0e0e0d] rounded-full opacity-0 inset-0 items-center justify-center group-hover:opacity-100">
            <FaPlay size={20}/>
        </button>
     );
}
 
export default PlayBtn;