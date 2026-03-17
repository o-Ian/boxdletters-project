import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type Movie from "../interfaces/Movie";
import getMovies from "../utils/getMovies";
import styles from './styles/Movie.module.css'
import type MovieCredits from "../interfaces/MovieCredits";
import CreditCard from "../components/layout/CreditCard";

const moviesURL = import.meta.env.VITE_API
const moviesIMG = import.meta.env.VITE_IMG

export default function Movie() {
    const { id } = useParams()

    const [movie, setMovie] = useState<Movie>();
    const [credits, setCredits] = useState<MovieCredits>()
    const [creditsTab, setCreditsTab] = useState<"cast" | "crew">("cast")

    const tabs = [
        { id: "cast", label: "Cast" },
        { id: "crew", label: "Crew" }
    ] as const;

    const tabsContent = {
        cast: credits?.cast.map(c =>
            <CreditCard
                key={c.id}
                name={c.name}
                character={c.character}
            />
        ),

        crew: credits?.crew.map(c =>
            <CreditCard
                key={c.id}
                name={c.name}
                department={c.department}
            />
        )
    }


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const [movie_data, movie_credits_data] = await Promise.all([
                    getMovies(`${moviesURL}${id}`),
                    getMovies(`${moviesURL}${id}/credits`)
                ])

                setMovie(movie_data);
                setCredits(movie_credits_data);

            } catch (error) {
                console.error("ERROR FETCHING DATA: ", error)
            }
        }

        fetchMovie();
    }, [])

    return (
        <>
            {movie && (
                <>
                    <main>
                        <section className={styles.backdrop}>
                            <img src={`${moviesIMG}${movie.backdrop_path}`} alt={movie.title} />
                        </section>
                        <section className={styles.container}>
                            <div>
                                <img className={styles.poster} src={`${moviesIMG}${movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.info}>
                                    <h1>{movie.title}</h1>
                                    <p>{new Date(movie.release_date).getFullYear()}</p>
                                    <p><i>{movie.original_title !== movie.title ? `'${movie.original_title}'` : ""}</i></p>
                                </div>
                                <article className={styles.overview}>
                                    <p>{movie.overview}</p>
                                </article>
                                <article className={styles.credits_container}>
                                    <ul>
                                        {tabs.map(tab => (
                                            <li
                                                key={tab.id}
                                                className={creditsTab === tab.id ? styles.credits_active : ""}
                                                onClick={() => setCreditsTab(tab.id)}
                                            >
                                                {tab.label}
                                            </li>
                                        ))}
                                    </ul>
                                    <hr />
                                    <div className={styles.credits}>
                                        {credits && tabsContent[creditsTab]}
                                    </div>
                                </article>
                            </div>

                        </section>
                    </main>
                </>
            )}
        </>
    )
}