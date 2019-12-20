import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiThemeProvider} from '@material-ui/core/styles'

import ErrorBoundary from './component/error-boundary'
import Movies from './component/movies'
import {theme} from './theme'


class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <CssBaseline>
          <MuiThemeProvider theme={theme}>
            <Movies />
          </MuiThemeProvider>
        </CssBaseline>
      </ErrorBoundary>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
