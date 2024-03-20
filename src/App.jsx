import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage'
import MovieCast from './components/MovieCast'
import MovieReviews from './components/MovieReviews'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/movies'>Movies</NavLink>
        <NavLink to='/movies/:movieId'/>
        <NavLink to='/movies/:movieId/cast'/>
        <NavLink to='/movies/:movieId/reviews'/>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/movies' element={<MoviesPage/>}/>
        <Route path='/movies/:movieId' element={<MovieDetailsPage/>}/>
          <Route path='cast' element={<MovieCast/>}/>
          <Route path='reviews' element={<MovieReviews/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
