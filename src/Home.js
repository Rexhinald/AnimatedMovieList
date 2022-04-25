import React, {useEffect, useRef, useState} from "react";
import api from "./api";
import _ from "lodash-core"
import MovieItem from "./components/MovieItem";
import Search from "./svg/search_white.svg"
import Cancel from "./svg/cancel_white.svg"
import MovieDetail from "./components/MovieDetail";
import {motion, useAnimation} from "framer-motion";

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [finished, setFinished] = useState(false);
  const searchRef = useRef();

  const listControls = useAnimation();

  const listVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.5,
      }
    }
  };

  const getMovies = () => {
    api.get('/search/movie', {params: {api_key: '6de482bc8c5768aa3648618b9c3cc98a', query}})
      .then(res => {
        setMovies(res.data.results);
      })
      .catch(err => console.log('Error', err.response));
  };

  const flashed = setTimeout(() => setFinished(false), 1000)

  const moviesList = () => (
    movies.map(movie => (
      <MovieItem
        finished={finished}
        movie={movie}
        key={movie.id}
        flashed={flashed}
        onClick={() => setSelectedMovie(movie)}
      />
    ))
  );

  const searchMovies = _.debounce((e) => {
    setQuery(e.target.value);
  }, 500);

  const clearSearch = () => {
    setQuery('');
    searchRef.current.value = '';
    searchRef.current.focus();
    setSelectedMovie();
  };

  useEffect(() => {
    if (query) {
      getMovies();
    } else {
      setMovies();
    }
  }, [query]);

  const animateList = async () => {
    await listControls.start('visible')
  }

  useEffect(() => {
    if (movies) {
      animateList().then(() => setFinished(true))
    }
  }, [movies])

  return (
    <div className="root">
      <div className="list-container">
        <div className="search">
          <img src={Search} />
          <input
            ref={searchRef}
            className="search-input"
            placeholder="Search..."
            onChange={searchMovies}
          />
          <img src={Cancel} onClick={clearSearch} />
        </div>
        {movies && (
          <motion.div variants={listVariants} initial="hidden" animate={listControls}>
            {moviesList()}
          </motion.div>
        )}
      </div>
      <div className="movie-details-container">
        {selectedMovie && <MovieDetail movie={selectedMovie} />}
      </div>
    </div>
  );
};

export default Home;
