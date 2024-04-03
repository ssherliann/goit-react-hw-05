import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './MovieCast.module.css';

export default function MovieCast() {
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const { movieId } = useParams(); 

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA5ZTFiOTkwNzgyNWYyODAxYzZjY2VhNjI2OTY2YiIsInN1YiI6IjY1ZmIzZTg5NzcwNzAwMDE3YzA3MTAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZhisAEz8ENxy4QWWhtgfqFY2KAaerZZjXQ_pHK-Gao'
                    }
                });
                setCast(response.data.cast);
            } catch (error) {
                console.error('Error:', error);
                setError('Error fetching movie cast. Please try again later.');
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Movie Cast</h2>
            <ul className={styles.actorsList}>
                {cast.map((actor, index) => (
                    <li key={index} className={styles.actor}>
                        <div className={styles.actorInfo}>
                            {actor.profile_path ? (
                                <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} className={styles.image} alt={actor.name} />
                            ) : (
                                <span className={styles.span}>No photo</span>
                            )}
                            {actor.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


