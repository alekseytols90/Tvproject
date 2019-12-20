import React, {Component, Fragment} from 'react'

import ErrorBoundary from './error-boundary'
import history from './../history'
import {MoviesContextProvider} from '../context/movies-context'
import {MoviesContextConsumer} from './../context/movies-context'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  collapse: {
    backgroundColor: 'lightslategray',
    padding: '10px'
  },
  poster: {
    height: '300px',
  },
  provider: {
    height: '50px',
    borderRadius: '10px',
    margin: '10px'
  }
})


const Movies = ({classes}) =>
  <ErrorBoundary>
    <MoviesContextProvider>
      <MoviesContextConsumer>
        {({movies, actions}) =>
          <List component='nav'>
            {movies.map(movie =>
              <Fragment>
                <ListItem key={movie.title} button onClick={event => actions.openMovie(movie)}>
                  <ListItemText primary={movie.title + ' (' + movie.year + ')'} secondary={
                    <Fragment>
                      <Typography>{movie.channel}</Typography>
                      {new Date(movie.start_time*1000).getHours()}:
                      {new Date(movie.start_time*1000).getMinutes()<10?'0':''}
                      {new Date(movie.start_time*1000).getMinutes()}
                      <span> - </span>
                      {new Date(movie.end_time*1000).getHours()}:
                      {new Date(movie.end_time*1000).getMinutes()<10?'0':''}
                      {new Date(movie.end_time*1000).getMinutes()}
                    </Fragment>

                  }>
                  </ListItemText>

                  <ListItemIcon>
                    <Icon color='primary'>keyboard_arrow_down</Icon>
                  </ListItemIcon>

                </ListItem>
                <Collapse className={classes.collapse}
                          in={movie.isOpened}
                          timeout="auto"
                          unmountOnExit>
                  <img className={classes.poster} src={'http://' + movie.poster} alt=""/>
                  {movie.offers.map(offer =>
                    <a href={offer.url}><img className={classes.provider} src={'http://' + offer.provider_icon} alt=""/></a>
                  )}
                </Collapse>
              </Fragment>
            )}
          </List>
        }
      </MoviesContextConsumer>
    </MoviesContextProvider>
  </ErrorBoundary>

export default withStyles(styles)(Movies)
