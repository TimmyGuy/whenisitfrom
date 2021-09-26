import Footer from "../components/ui/Footer";
import SearchBar from "../components/input/SearchBar";
import Image from "next/image";
import {StarIcon as StarIconFilled} from "@heroicons/react/solid";
import {StarIcon as StarIconEmpty} from "@heroicons/react/outline";

export default function FeelOld({title}) {

    function starRating(stars) {
        stars = Math.round(stars);
        return (
            <>
                {[...Array(stars)].map((e, i) => <StarIconFilled className="h-6 text-yellow-500" key={i}/>)}
                {[...Array(5 - stars)].map((e, i) => <StarIconEmpty className="h-6 text-yellow-500" key={i}/>)}
            </>
        )
    }

    function prettyDate(date) {
        const fullDate = new Date(Date.parse(date));
        return <>{fullDate.toLocaleString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</>
    }

    return (
        <div>
            <div className="flex justify-center p-4 items-center border-b">
                <h4 className="text-xl font-bold text-gray-800 h-full pr-4">When is it from?</h4>
                <SearchBar/>
            </div>
            {title &&
            <main className="flex flex-col items-center justify-center p-8 ">
                <div className="grid grid-cols-3 grid-rows-3 max-w-7xl">
                    <div className="col-span-1 row-span-2 p-4">
                        <Image src={"https://image.tmdb.org/t/p/original/" + title.poster_path} alt={title.title}
                               className="max-w-full rounded-xl" width={400} height={600}/>
                    </div>
                    <div className="col-span-2 row-span-3 pt-8">
                        <h2 className="text-3xl font-medium">Release date</h2>
                        <h2 className="text-5xl font-bold pb-2">{prettyDate(title.release_date)}</h2>
                        <div>

                        </div>
                    </div>
                    <div className="p-4 ">
                        <h1 className="text-4xl font-bold">{title.title}</h1>
                        {title.tagline && <span>{title.tagline}</span>}
                        <div className="flex py-1 pt-2">
                            {starRating(title.vote_average / 2)}{' '} <small
                            className="pl-1">({title.vote_count} votes)</small>
                        </div>
                        {title.homepage &&
                        <a href={title.homepage} className="text-blue-500" target="_blank">Visit homepage &rarr;</a>}
                    </div>
                </div>
            </main>
            }
            <Footer/>
        </div>
    )

}

export async function getStaticPaths({params}) {
    console.log(params);

    return {
        paths: [
            {params: {id: '1'}},
            {params: {id: '2'}}
        ],
        fallback: true
    }
}

export async function getStaticProps({params}) {
    const apiKey = 'be748e09f24ba4b067635fa53eed9271';
    const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
    const title = await res.json();

    return {props: {title}}
}