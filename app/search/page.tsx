import getBeatsByTitle from "@/actions/getBeatsByTitle"
import Navbar from "@/components/Navbar";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
    searchParams: {
        title: string;
    }
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    const beats = await getBeatsByTitle(searchParams.title);

    return(
        <>
            {/* <SearchInput/> */}
            <SearchContent beats={beats}/>
        </>
    )
}

export default Search