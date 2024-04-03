import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './MovieReviews.module.css'

export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null); 
    const { movieId } = useParams(); 

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA5ZTFiOTkwNzgyNWYyODAxYzZjY2VhNjI2OTY2YiIsInN1YiI6IjY1ZmIzZTg5NzcwNzAwMDE3YzA3MTAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZhisAEz8ENxy4QWWhtgfqFY2KAaerZZjXQ_pHK-Gao'
                    }
                });
                setReviews(response.data.results); 
            } catch (error) {
                console.error('Error:', error);
                setError('Error fetching movie reviews. Please try again later.'); 
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    if (error) {
        return <div>{error}</div>;
    }

    return(
        <div>
            <h2>Movie Reviews</h2>
            {reviews.length > 0 ? (
            <ul className={styles.reviewsList}>
                {reviews.map((review, index) => (
                    <li key={index} className={styles.rewiew}>
                        <p className={styles.rewiewAuthor}>{review.author}</p>
                        <p className={styles.rewiewContent}>{review.content}</p>
                    </li>
                ))}
            </ul>
            ) : (
                <p>No reviews</p>
            )}
        </div>
    )
}
