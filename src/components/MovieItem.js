import React, {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

const MovieItem = ({movie, finished, flashed, onClick}) => {
  const dateControls = useAnimation();

  const {poster_path, title, release_date, id} = movie;

  const containerVariants = {
    hidden: {
      x: '-100%',
    },
    visible: {
      x: '0%',
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
      }
    }
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.25,
      }
    }
  };

  const dateVariants = {
    hidden: {
      scale: 1,
    },
    visible: {
      scale: [1.1, 1],
      transition: {
        duration: 1,
      }
    }
  };

  const flashDate = async () => {
    dateControls.start('visible')
  }

  useEffect(() => {
    if(finished) {
      flashDate().then(() => flashed)
    }
  }, [finished])

  return (
    <motion.div
      onClick={onClick}
      variants={containerVariants}
      className="movie-item"
      data-testid={`movie-item-${id}`}
    >
      <motion.img variants={imageVariants} style={{width: 60}} src={`https://image.tmdb.org/t/p/original/${poster_path}`} />
      <div className="movie-item-text">
        <div className="movie-item-title">{title}</div>
        <motion.div variants={dateVariants} initial="hidden" animate={dateControls}>{release_date}</motion.div>
      </div>
    </motion.div>
  );
};

export default MovieItem
