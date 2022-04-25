import React from "react";
import {cleanup} from "@testing-library/react";
import ReactDOM from "react-dom";
import MovieItem from "../MovieItem";
import renderer from "react-test-renderer";

afterEach(cleanup);

const movie = {
  "adult": false,
  "backdrop_path": "/wETWXzbvn0LhrPGLeRqyIeIl0E8.jpg",
  "genre_ids": [
    18
  ],
  "id": 644089,
  "original_language": "en",
  "original_title": "Blue Bayou",
  "overview": "As a Korean-American man raised in the Louisiana bayou works hard to make a life for his family, he must confront the ghosts of his past as he discovers that he could be deported from the only country he has ever called home.",
  "popularity": 41.969,
  "poster_path": "/a4xykTie8BOSW0y6K5u1AcmW4HW.jpg",
  "release_date": "2021-09-10",
  "title": "Blue Bayou",
  "video": false,
  "vote_average": 7.6,
  "vote_count": 130
}

it('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<MovieItem movie={movie} />, div);
});

it('matches snapshot', () => {
  const tree = renderer.create(<MovieItem movie={movie} />).toJSON();
  expect(tree).toMatchSnapshot();
});
