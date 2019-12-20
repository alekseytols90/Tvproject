import {initial_state} from './movies-initial-state'

export const reduce = (event, state) => {
  console.log('-----------------------------------------------------------')
  console.log('event data: ', event)
  console.log('previous state: ', state)
  let nextState
  switch (event.type) {
    case 'MOVIES_RECEIVED':
      event.movies.forEach(movie => {
        movie.isOpened = false
      })
      nextState = {
        ...state,
        movies: event.movies
      }
      console.log('next state: ', nextState)
      return nextState

    case 'MOVIE_IS_OPENED':
      let index = state.movies.findIndex(movie => movie.title === event.movie.title)
      console.log(index)
      let updated_movies = state.movies
      updated_movies[index].isOpened = !updated_movies[index].isOpened
      nextState = {
        ...state,
        movies: updated_movies
      }
      console.log('next state: ', nextState)
      return nextState
  }
}
