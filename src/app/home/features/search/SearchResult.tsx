import { SearchResultType } from "./types";



export const SearchResult = ({ result }: { result: SearchResultType }) => {

    return (
        <div>
            <h1>{result.query}</h1> 
            <p>{ result.answer }</p>
        </div>
    )
}