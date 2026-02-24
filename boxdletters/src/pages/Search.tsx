import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import searchMovies from "../utils/searchMovies";
import type Movie from "../interfaces/Movie";
import SearchResult from "../components/layout/SearchResult";
import styles from './styles/Search.module.css'

export default function Search() {
    const location = useLocation();
    const { search: searchText } = location.state;

    const [movies, setMovies] = useState<Movie[]>();

    useEffect(() => {
        let is_mounted = true;

        const fetchSearchedMovie = async (search: string) => {
            try {
                const search_results = await searchMovies(search);
                setMovies(search_results.results);
            } catch (error) {
                console.error("ERROR FETCHING DATA: ", error)
            }
        }

        is_mounted && fetchSearchedMovie(searchText)

        return () => {
            is_mounted = false
        }
    }, [searchText])

    return (
        <div className={styles.container_search}>
            <h3>{(`Showing matches for "${searchText}"`).toUpperCase()}</h3>
            <hr />
            {movies && (
                movies.map(movie => {
                    return (
                        <>
                            <SearchResult
                                id={movie.id}
                                key={movie.id}
                                title={movie.title}
                                original_title={movie.original_title}
                                poster_path={movie.poster_path}
                                release_date={movie.release_date}
                                rating={movie.vote_average}
                            />
                            <hr />
                        </>
                    )
                })
            )}
        </div>
    )
}