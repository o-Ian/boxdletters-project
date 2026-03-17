import { useEffect, useState } from "react";
import Loader from "../components/layout/Loader";
import MovieCard from "../components/layout/MovieCard";
import styles from './styles/Home.module.css';
import getMovies from "../utils/getMovies";
import type MovieList from "../interfaces/MovieList";

const moviesURL = import.meta.env.VITE_API

export default function Home() {
    const [topMovies, setTopMovies] = useState<MovieList[]>([]);
    const [popularMovies, setPopularMovies] = useState<MovieList[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [top_rated_movies_data, popular_movies_data] = await Promise.all([
                    getMovies(`${moviesURL}top_rated`),
                    getMovies(`${moviesURL}popular`)
                ]);

                setTopMovies(top_rated_movies_data.results);
                setPopularMovies(popular_movies_data.results)
            } catch (error) {
                console.error("ERROR FETCHING DATA: ", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies();
    }, [])

    if (isLoading) return <Loader />;

    return (
        <>
            <div className={styles.container}>
                <h1>Welcome to Boxdletters</h1>
                <p>Find your new favorite movies with us! <br /> Start searching with <span>Boxdletters</span></p>
                {topMovies.length > 0 && (
                    <>
                        <h2>Top rated movies</h2>
                        <div className={styles.movies_container}>
                            {topMovies.map(movie => <MovieCard id={movie.id} key={movie.id} title={movie.title} release_date={movie.release_date} poster_path={movie.poster_path} />)}
                        </div>
                    </>
                )}
                {popularMovies .length > 0 && (
                    <>
                        <h2>Popular movies</h2>
                        <div className={styles.movies_container}>
                            {popularMovies.map(movie => <MovieCard id={movie.id} key={movie.id} title={movie.title} release_date={movie.release_date} poster_path={movie.poster_path} />)}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}