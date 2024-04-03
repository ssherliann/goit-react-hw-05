import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA5ZTFiOTkwNzgyNWYyODAxYzZjY2VhNjI2OTY2YiIsInN1YiI6IjY1ZmIzZTg5NzcwNzAwMDE3YzA3MTAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZhisAEz8ENxy4QWWhtgfqFY2KAaerZZjXQ_pHK-Gao',
                        accept: 'application/json'
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trending Movies</h1>
            <MovieList movies={movies} />
        </div>
    );
}

