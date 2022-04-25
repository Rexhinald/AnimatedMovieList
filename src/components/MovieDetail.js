import React, {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

const MovieDetail = ({movie}) => {
  const {backdrop_path, title, release_date, overview, id} = movie;

  const containerControls = useAnimation();

  const containerVariant = {
    hidden: {
      x: '-100%'
    },
    visible: {
      x: '0%'
    }
  };

  const animate = async () => {
    await containerControls.start('hidden')
    await containerControls.start('visible')
  }

  useEffect(() => {
    animate();
  }, [movie])

  return (
    <motion.div
      className="movie-details"
      variants={containerVariant}
      initial="hidden"
      animate={containerControls}
      data-testid={`movie-detail-${id}`}
    >
      <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} width="100%" />
      <h2>{title}</h2>
      <div className="movie-details-date">{release_date}</div>
      <p>{overview}</p>
    </motion.div>
  );
};

export default MovieDetail;
