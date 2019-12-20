import axios from 'axios'

export default class AppAPI {
  headers = (token) => (token ?
    {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }}
    :
    {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }}
  )

  getAllMovies = () => {
    return axios.get(
      process.env.HOST_URL + '/api/movies',
      {},
      this.headers()
    )
  }
}
