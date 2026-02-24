import { useEffect, useState } from "react";
import type Movie from "../interfaces/Movie";
import MovieCard from "../components/layout/MovieCard";
import styles from './styles/Home.module.css'
import getMovies from "../utils/getMovies";
import Loader from "../components/layout/Loader";

const moviesURL = import.meta.env.VITE_API

export default function Home() {
    const [topMovies, setTopMovies] = useState<Movie[]>();

    useEffect(() => {
        let is_mounted = true;

        const fetchMovies = async () => {
            try {
                const top_rated_movies_data = await getMovieLists(`${moviesURL}top_rated`);
                setTopMovies(top_rated_movies_data.results);
            } catch (error) {
                console.error("ERROR FETCHING DATA: ", error)
            }
        }

        is_mounted && fetchMovies();

        return () => {
            is_mounted = false;
        }
    }, [])

    return (
        <>
            {topMovies ? (
                <div className={styles.container}>
                    <div className={styles.welcome_text}>
                        <h1>Welcome to Boxdletters</h1>
                        <p>Find your new favorite movies with us! <br /> Start searching with <span>Boxdletters</span></p>
                        <h2>Top rated movies</h2>
                    </div>
                    <div className={styles.movies_container}>
                        {topMovies && topMovies.map(movie => <MovieCard id={movie.id} key={movie.id} title={movie.title} release_date={movie.release_date} poster_path={movie.poster_path} />)}
                    </div>
                </div>
            ) : (<Loader />)}
        </>
    )
}