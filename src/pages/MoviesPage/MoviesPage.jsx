import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('search');
        if (query) {
            setSearchQuery(query);
            fetchMovies(query);
        }
    }, [location.search]);

    const fetchMovies = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA5ZTFiOTkwNzgyNWYyODAxYzZjY2VhNjI2OTY2YiIsInN1YiI6IjY1ZmIzZTg5NzcwNzAwMDE3YzA3MTAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZhisAEz8ENxy4QWWhtgfqFY2KAaerZZjXQ_pHK-Gao',
                    accept: 'application/json'
                }
            });
            setMovies(response.data.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate(`/movies?search=${searchQuery}`);
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search movies by title"
                    className={styles.input}
                />
                <button type="submit" className={styles.buttonSubmit}>Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && <MovieList movies={movies}/>}
        </div>
    );
}