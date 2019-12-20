import React, { Component } from 'react'
// import * as Sentry from '@sentry/browser'
import Typography from '@material-ui/core/Typography'

// Sentry.init({dsn: process.env.SENTRY})

class ErrorBoundary extends Component {
  state = { hasError: false }

  componentDidCatch = (error, info) => {
    // this.setState({ hasError: true })
    //
    // Sentry.configureScope(scope => {
    //   Object.keys(info).forEach(key => {
    //     scope.setExtra(key, info[key])
    //   })
    // })
    //
    // Sentry.captureException(error)
  }

  render =  () => {
    if (this.state.hasError) {
      return <Typography>Error Boundary</Typography>
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
