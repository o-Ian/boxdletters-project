import React, { useState } from 'react';
import styles from './styles/Navbar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigator = useNavigate();
    const [searchText, setSearchText] = useState("")

    const Search = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchText.trim()) return;
        navigator(`/search?q=${searchText}`);
    }

    return (
        <nav className={styles.navbar} id="navbar">
            <Link to="/">
                <img className={styles.logo} src='/img/letterboxd-decal-dots-neg-rgb.svg' />
                <h2>Boxdletters</h2>
            </Link>

            <form onSubmit={Search}>
                <div className={styles.search}>
                    <input type="text" placeholder="Search a movie" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} />
                    <button type="submit"><FaMagnifyingGlass /></button>
                </div>
            </form>
        </nav>
    )
}