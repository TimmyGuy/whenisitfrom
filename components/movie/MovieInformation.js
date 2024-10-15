import {StarIcon as StarIconFilled} from "@heroicons/react/24/solid";
import {StarIcon as StarIconEmpty} from "@heroicons/react/24/outline";

export default function MovieInformation({title}) {
    function starRating(stars) {
        stars = Math.round(stars);
        return (
            <>
                {[...Array(stars)].map((e, i) => <StarIconFilled className="h-6 text-yellow-500" key={i}/>)}
                {[...Array(5 - stars)].map((e, i) => <StarIconEmpty className="h-6 text-yellow-500" key={i}/>)}
            </>
        )
    }

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold">{title.title}</h1>
            {title.tagline && <span>{title.tagline}</span>}
            <div className="flex py-1 pt-2">
                {starRating(title.vote_average / 2)}{' '} <small
                className="pl-1">({title.vote_count} votes)</small>
            </div>
            {title.homepage &&
            <a href={title.homepage} className="text-blue-500" target="_blank">Visit homepage &rarr;</a>}
        </div>
    )
}