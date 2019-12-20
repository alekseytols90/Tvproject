export let events = {
  moviesReceived: (movies) => ({
    type: 'MOVIES_RECEIVED',
    movies: movies
  }),

  movieIsOpened: (movie) => ({
    type: 'MOVIE_IS_OPENED',
    movie: movie
  }),
}
