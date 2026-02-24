export default interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    rating: number
}

adult boolean Defaults to true
backdrop_path string
belongs_to_collection string
budget integer Defaults to 0
genres array of objects object id integer Defaults to 0
name string
homepage string
id integer Defaults to 0
imdb_id string
original_language string
original_title string
overview string
popularity number Defaults to 0
poster_path string
production_companies array of objects object id integer Defaults to 0
logo_path string
name string
origin_country string
production_countries array of objects object iso_3166_1 string name string
release_date string
revenue integer Defaults to 0
runtime integer Defaults to 0
spoken_languages array of objects object
english_name string 
iso_639_1 string
name string
status string
tagline string
title string
video boolean Defaults to true
vote_average number Defaults to 0
vote_count integer Defaults to 0