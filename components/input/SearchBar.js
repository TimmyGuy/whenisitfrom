import {SearchIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function SearchBar() {
    const [suggestions, setSuggestions] = useState(false);
    const apiKey = 'be748e09f24ba4b067635fa53eed9271';

    useEffect(() => {
        document.addEventListener('keydown', e => {
            if(e.ctrlKey && e.key === '/') {
                document.querySelector('#search').focus();
            }
        })
    })

    function searchSuggestions(event) {
        const query = encodeURI(event.target.value) || false;

        if (query) {

            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

            fetch(url)
                .then(response => response.json())
                .then(data => setSuggestions(data.results.slice(0, 5)))
        } else {
            setSuggestions(false);
        }
    }

    let clearSearchBar = () => {
        document.querySelector('#search').value='';
        setSuggestions(false);
    };

    return (
        <div className="w-96">
            <label htmlFor="search" className="sr-only">
                Search movie title
            </label>
            <div className="mt-1 relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-20 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search a movie title"
                    onChange={searchSuggestions}
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
                        ctrl + /
                    </kbd>
                </div>
                {suggestions &&
                <div
                    className="w-full border-2 border-gray-300 border-t-0 rounded-t-none rounded-md absolute max-h-80 overflow-auto top-full bg-white">
                    {suggestions.map(suggestion => (
                            <Link key={suggestion.id} href={"/" + suggestion.id}>
                                <a className="p-1 flex" onClick={clearSearchBar}>
                                    {suggestion.poster_path && <img
                                        src={"https://image.tmdb.org/t/p/original/" + suggestion.poster_path}
                                        alt={suggestion.title}
                                        className="w-20"/>}
                                    <div className="ml-1 text-left max-h-28 overflow-hidden">
                                        <strong className="block">{suggestion.title}</strong>
                                        {suggestion.overview}
                                    </div>
                                </a>
                            </Link>
                        )
                    )}
                </div>}
            </div>
        </div>
    )
}