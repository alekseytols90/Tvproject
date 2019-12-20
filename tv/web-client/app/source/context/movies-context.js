import React, {Component, createContext} from 'react'
import AppAPI from './../api/appAPI'
import history from './../history'
import {initial_state} from './movies-initial-state'
import {events} from './movies-events'
import {reduce} from './movies-reduce'

const MoviesContext = createContext()
let appAPI = new AppAPI

export class MoviesContextProvider extends Component {
  state = {
    ...initial_state,
    dispatch: event => {this.setState((state) => reduce(event, state))},
    actions: {
      getAllMovies: () => {
        appAPI.getAllMovies()
          .then(response => {
            this.state.dispatch(events.moviesReceived(response.data.movies))
          })
          .catch(error => {console.log(error)})
      },
      openMovie: (movie) => {
        this.state.dispatch(events.movieIsOpened(movie))
      },
    }
  }

  componentDidMount = () => {
    this.state.actions.getAllMovies()
  }

  render = () => {
    const {state, props: {children}} = this
    return <MoviesContext.Provider value={state}>{children}</MoviesContext.Provider>
  }
}

export const MoviesContextConsumer = MoviesContext.Consumer
