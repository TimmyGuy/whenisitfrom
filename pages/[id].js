import Footer from "../components/ui/Footer";
import SearchBar from "../components/input/SearchBar";
import Image from "next/image";
import MovieInformation from "../components/movie/MovieInformation";
import Head from "next/head";

export default function FeelOld({title}) {

    function prettyDate(date) {
        const fullDate = new Date(Date.parse(date));
        return <>{fullDate.toLocaleString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</>
    }

    return (
        <div>
            <Head>
                <title>{title && title.title} - When is it from?</title>
                <meta name="description" content={title && ("Movie: " + title.title + ", Release date: " + title.release_date + ", Tagline: " + title.tagline)} />
            </Head>
            <div className="flex justify-center p-4 items-center border-b">
                <h4 className="text-xl font-bold text-gray-800 h-full pr-4">When is it from?</h4>
                <SearchBar/>
            </div>
            {title &&
            <main className="flex flex-col items-center justify-center p-1 md:p-8 ">
                <div className="grid grid-cols-3 grid-rows-3 max-w-7xl">
                    <div className="col-span-1 row-span-1 md:row-span-2 p-1 md:p-4">
                        <Image src={"https://image.tmdb.org/t/p/original/" + title.poster_path} alt={title.title}
                               className="max-w-full rounded-xl" width={400} height={600}/>
                    </div>
                    <div className="col-span-2 md:hidden">
                        <MovieInformation title={title} />
                    </div>
                    <div className="col-span-3 md:col-span-2 row-span-3 pt-2 md:pt-8">
                        <h2 className="text-3xl font-medium">Release date</h2>
                        <h2 className="text-5xl font-bold pb-2">{prettyDate(title.release_date)}</h2>
                        <div>

                        </div>
                    </div>
                    <div className="hidden md:block">
                        <MovieInformation title={title} />
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
            {params: {id: '11'}},
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