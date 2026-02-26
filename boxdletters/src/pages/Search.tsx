import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../components/layout/SearchResult";
import type MovieList from "../interfaces/MovieList";
import searchMovies from "../utils/searchMovies";
import styles from './styles/Search.module.css';

export default function Search() {
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("q")

    const [movies, setMovies] = useState<MovieList[]>();

    useEffect(() => {
        if (!searchText?.trim()) return;

        const fetchSearchedMovie = async (search: string) => {            
            try {
                const search_results = await searchMovies(search);
                setMovies(search_results.results);
            } catch (error) {
                console.error("ERROR FETCHING DATA: ", error)
            }
        }

        fetchSearchedMovie(searchText)
    }, [searchText])

    return (
        <div className={styles.container_search}>
            <h3>{(`Showing matches for "${searchText}"`).toUpperCase()}</h3>
            <hr />
            {movies && movies.length > 0 ? (
                movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <SearchResult
                                id={movie.id}
                                title={movie.title}
                                original_title={movie.original_title}
                                poster_path={movie.poster_path}
                                release_date={movie.release_date}
                                rating={movie.vote_average}
                            />
                            <hr />
                        </div>
                    )
                })
            ) : (
                <h3>Sorry, we couldn't find no results...</h3>
            )}
        </div>
    )
}