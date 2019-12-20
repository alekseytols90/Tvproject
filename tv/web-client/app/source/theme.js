import { createMuiTheme } from '@material-ui/core/styles'
import { blue, blueGrey, red, lightGreen, pink } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    error: red,
    neutral: blueGrey,
    positive: lightGreen,
  }
})
