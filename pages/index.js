import Head from 'next/head'
import Footer from "../components/ui/Footer";
import SearchBar from "../components/input/SearchBar";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>When is it from?</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="description" content="When is it from? Discover the release dates of movies. Compare passed time to feel older. A lot of time has passed since some of our favorite movies came out." />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    When is it from?
                </h1>

                <p className="mt-3 mb-3 text-2xl">
                    Start searching a{' '}
                    <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
                        movie
                    </code>
                    {' '}title
                </p>

                <div className="px-2">
                    <SearchBar/>
                </div>

            </main>

            <Footer/>
        </div>
    )
}
