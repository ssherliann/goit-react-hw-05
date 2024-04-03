import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Outlet, NavLink, Link, useLocation } from "react-router-dom";
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkRef = useRef(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA5ZTFiOTkwNzgyNWYyODAxYzZjY2VhNjI2OTY2YiIsInN1YiI6IjY1ZmIzZTg5NzcwNzAwMDE3YzA3MTAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZhisAEz8ENxy4QWWhtgfqFY2KAaerZZjXQ_pHK-Gao',
                        accept: 'application/json'
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    useEffect(() => {
        if (backLinkRef.current) {
            backLinkRef.current.focus();
        }
    }, [location]);

    if (!movie || !movie.title) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Link to={location.state?.from || '/movies'} className={styles.backLink} ref={backLinkRef}>Back</Link>
            <div className={styles.fullInfo}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className={styles.image} alt={movie.title}/>
                <div className={styles.info}>
                    <h2 className={styles.title}>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>Average rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                    <p>Release Date: {movie.release_date}</p>
                </div>
            </div>
            <div className={styles.links}>
                <NavLink to={`/movies/${movieId}/cast`} className={styles.castLink}>Cast</NavLink>
                <NavLink to={`/movies/${movieId}/reviews`} className={styles.reviewsLink}>Reviews</NavLink>
            </div>
            <Outlet />
        </div>
    );
}
